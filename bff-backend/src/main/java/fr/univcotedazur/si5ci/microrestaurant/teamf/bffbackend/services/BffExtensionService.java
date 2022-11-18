package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.services;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.CookingMS;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.DiningMS;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.MenuMS;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.*;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.Item;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.StartOrdering;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.menu.MenuItem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class BffExtensionService {

    public static HashMap<Integer, List<Integer>> tableIdWithTabletId = new HashMap<>(); // relation table et tablet
                                                                                         // <tableId, List<tabletId>>;
                                                                                         // Voir useCaseLogic.java à la
                                                                                         // racine du projet
    public HashMap<Integer, HashMap<Integer, List<OrderItem>>> ordersByTabletIdAndTableId = new HashMap<>(); // <tableId,
    public HashMap<Integer, List<TabletOrder>> ordersByTableId = new HashMap<>(); // <tableId, List<TabletOrder>>;
    public List<FullOrder> orders = new ArrayList<>(); // toutes les commandes
    private final DiningMS diningMS;
    private final MenuMS menuMS;
    private final CookingMS cookingMS;
    private HashMap<String, HashMap<String, List<String>>> preperationByTableIdAndCategory = new HashMap<>(); // <tableId,

    private List<StatusByCategoryAndTable> tableOrderStatusByCategories = new ArrayList<>();

    public TabletOrder tabletOrder(TabletOrder order) {
        log.info("Tablet order for table id : " + order.getTableId() + " and tablet id : " + order.getTabletNumber());
        var menu = menuMS.getTheFullMenu();
        // get price of each item
        double totalPrice = 0;
        for (OrderItem item : order.getItems()) {
            MenuItem menuItem = menu.stream().filter(m -> m.getShortName().equals(item.getShortName())).findFirst()
                    .orElse(null);
            if (menuItem != null) {
                totalPrice += menuItem.getPrice() * item.getQuantity();
            }
        }
        order.setPrice(totalPrice);

        ordersByTabletIdAndTableId.putIfAbsent(order.getTableId(), new HashMap<>());
        ordersByTabletIdAndTableId.get(order.getTableId()).put(order.getTabletNumber(), order.getItems());

        ordersByTableId.putIfAbsent(order.getTableId(), new ArrayList<>());
        ordersByTableId.get(order.getTableId()).add(order);
        return order;
    }

    private String getMenuIdByShortName(String shortName) {
        var menus = menuMS.getTheFullMenu();
        for (MenuItem menu : menus) {
            if (menu.getShortName().equals(shortName)) {
                return menu.getId().toString();
            }
        }
        return null;
    }

    public String getCategoryByShortName(String shortName) {
        var menus = menuMS.getTheFullMenu();
        for (MenuItem menu : menus) {
            if (menu.getShortName().equals(shortName)) {
                return menu.getCategory().toString();
            }
        }
        return null;
    }

    public FullOrder order(Integer tableId) {
        log.info("Order for table id : " + tableId);
        FullOrder fullOrder = new FullOrder();
        fullOrder.setTableId(tableId.longValue());
        fullOrder.setItems(ordersByTabletIdAndTableId.get(tableId).values().stream().flatMap(List::stream).toList());
        // TODO : Appliquer la meme logique que dans BffService pour les orders
        var tableOrder = diningMS.openTable(new StartOrdering((long) tableId, 1));
        fullOrder.setOrderId(tableOrder.getId().toString());
        log.info("Table " + tableId + " opened with orderId " + tableOrder.getId());
        var shortOrderId = tableOrder.getId().toString().substring(0, 4);
        fullOrder.setShortOrderId(shortOrderId);
        fullOrder.getItems().forEach(item -> {
            diningMS.addToTableOrder(tableOrder.getId(),
                    new Item(getMenuIdByShortName(item.getShortName()), item.getShortName(), item.getQuantity()));
            log.info("Added item " + item.getShortName() + " ; Quantity: " + item.getQuantity() + " to order "
                    + tableOrder.getId());
        });
        log.info("Order " + tableOrder.getId() + " is ready to be sent to the kitchen");
        diningMS.tableOrder(tableOrder.getId());
        log.info("Billing for order "+tableOrder.getId());
        var bill = diningMS.bill(tableOrder.getId());
        log.info("Order "+tableOrder.getId()+" paid successfully");
        log.info("Order "+tableOrder.getId()+" is ready to be sent to the kitchen");
        log.info("Order " + tableOrder.getId() + " is sent to the kitchen for preparation");
        log.info("Starting all preparations for order " + tableOrder.getId());
        var prepare = diningMS.prepare(tableOrder.getId());
        log.info("Preparation " + prepare);
        // var preparedItems = prepare.getPreparedItems();
        var preparationsIds = new ArrayList<String>();
        prepare.stream().forEach(preparation -> {
            preparation.getPreparedItems().stream().forEach(preparedUtem -> {
                // preparationsIds.add(prep.getId().toString());
                var prep = cookingMS.startToPrepareItemOnPost(preparedUtem.getId());
                preperationByTableIdAndCategory.putIfAbsent(tableId.toString(), new HashMap<>());
                preperationByTableIdAndCategory.get(tableId.toString())
                        .putIfAbsent(getCategoryByShortName(preparedUtem.getShortName()), new ArrayList<>());
                preperationByTableIdAndCategory.get(tableId.toString())
                        .get(getCategoryByShortName(preparedUtem.getShortName().toString()))
                        .add(preparedUtem.getId().toString());
            });
        });
        tableOrderStatusByCategories.add(new StatusByCategoryAndTable(tableId.toString(), false, false, false, false));
        //log.info(preperationByTableIdAndCategory.toString());
        return fullOrder;
    }

    public List<StatusByCategoryAndTable> getStatusByCategoryAndTable() {
        return tableOrderStatusByCategories;
    }

    public List<TabletOrder> getTabletOrders(Integer tableId) {
        log.info("Get all tablet orders for table id : " + tableId);
        return ordersByTableId.get(tableId);
    }

    public void finishPreparation(String tableId, String category) {
        log.info("Finish all preparations for table id : " + tableId + " for category : " + category);
        try {
            for(String preparationId : preperationByTableIdAndCategory.get(tableId).get(category)) {
                cookingMS.finishToPrepareItemOnPost(UUID.fromString(preparationId));
            }
        } catch (Exception e) {

        }
        switch (category) {
            case "STARTER":
                tableOrderStatusByCategories.stream().filter(t -> t.getTableId().equals(tableId)).findFirst().get().setSTARTER(true);
                break;
            case "MAIN":
                tableOrderStatusByCategories.stream().filter(t -> t.getTableId().equals(tableId)).findFirst().get().setMAIN(true);
                break;
            case "DESSERT":
                tableOrderStatusByCategories.stream().filter(t -> t.getTableId().equals(tableId)).findFirst().get().setDESSERT(true);
                break;
            case "BEVERAGE":
                tableOrderStatusByCategories.stream().filter(t -> t.getTableId().equals(tableId)).findFirst().get().setBEVERAGE(true);
                break;
        }
    }

}
