package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.services;


import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.CookingMS;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.DiningMS;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.MenuMS;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.FullOrder;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.OrderItem;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.TableOrderStatusByCategory;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.TabletOrder;
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

@Service
@Slf4j
@RequiredArgsConstructor
public class BffExtensionService {

    public static HashMap<Integer, List<Integer>> tableIdWithTabletId = new HashMap<>(); // relation table et tablet <tableId, List<tabletId>>; Voir useCaseLogic.java à la racine du projet
    public HashMap<Integer, HashMap<Integer, List<OrderItem>>> ordersByTabletIdAndTableId = new HashMap<>(); // <tableId, <tabletId, List<OrderItem>>> ; commandes par tablette et par table
    public HashMap<Integer, List<TabletOrder>> ordersByTableId = new HashMap<>(); // <tableId, List<TabletOrder>>; commandes par table
    public List<FullOrder> orders = new ArrayList<>(); //toutes les commandes
    private final DiningMS diningMS;
    private final MenuMS menuMS;
    private final CookingMS cookingMS;


    public TabletOrder tabletOrder(TabletOrder order){
        log.info("Tablet order for table id : " + order.getTableId() + " and tablet id : " + order.getTabletNumber());
        var menu = menuMS.getTheFullMenu();
        //get price of each item
        double totalPrice = 0;
        for (OrderItem item : order.getItems()) {
            MenuItem menuItem = menu.stream().filter(m -> m.getShortName().equals(item.getShortName())).findFirst().orElse(null);
            if (menuItem != null) {
                totalPrice += menuItem.getPrice()*item.getQuantity();
            }
        }
        order.setPrice(totalPrice);

        ordersByTabletIdAndTableId.putIfAbsent(order.getTableId(), new HashMap<>());
        ordersByTabletIdAndTableId.get(order.getTableId()).put(order.getTabletNumber(), order.getItems());

        ordersByTableId.putIfAbsent(order.getTableId(), new ArrayList<>());
        ordersByTableId.get(order.getTableId()).add(order);
        return order;
    }
    
    public String getMenuIdByShortName(String shortName) {
        var menus = menuMS.getTheFullMenu();
        for (MenuItem menu : menus) {
            if (menu.getShortName().equals(shortName)) {
                return menu.getId().toString();
            }
        }
        return null;
    }

    public FullOrder order(Integer tableId){
        log.info("Order for table id : " + tableId);
        FullOrder fullOrder = new FullOrder();
        fullOrder.setTableId(tableId.longValue());
        fullOrder.setItems(ordersByTabletIdAndTableId.get(tableId).values().stream().flatMap(List::stream).toList());
        //TODO : Appliquer la meme logique que dans BffService pour les orders
        var tableOrder = diningMS.openTable(new StartOrdering((long) tableId, 1));
        fullOrder.setOrderId(tableOrder.getId().toString());
        log.info("Table "+tableId+" opened with orderId "+tableOrder.getId());
        var shortOrderId = tableOrder.getId().toString().substring(0, 4);
        fullOrder.setShortOrderId(shortOrderId);
        fullOrder.getItems().forEach(item ->{
            diningMS.addToTableOrder(tableOrder.getId(), new Item(getMenuIdByShortName(item.getShortName()), item.getShortName(), item.getQuantity()));
            log.info("Added item "+item.getShortName()+" ; Quantity: "+item.getQuantity()+" to order "+tableOrder.getId());
        });
        log.info("Order "+tableOrder.getId()+" is ready to be sent to the kitchen");
        diningMS.tableOrder(tableOrder.getId());
        log.info("Billing for order "+tableOrder.getId());
        var bill = diningMS.bill(tableOrder.getId());
        log.info("Order "+tableOrder.getId()+" paid successfully");
        log.info("Order "+tableOrder.getId()+" is ready to be sent to the kitchen");
        log.info("Order "+tableOrder.getId()+" is sent to the kitchen for preparation");
        log.info("Starting all preparations for order "+tableOrder.getId());
        var prepare =  diningMS.prepare(tableOrder.getId()).get(0);
        log.info("Preparation "+prepare);
        var preparedItems = prepare.getPreparedItems();
        var preparationsIds = new ArrayList<String>();
        preparedItems.forEach(preparedUtem ->{
            var prep = cookingMS.startToPrepareItemOnPost(preparedUtem.getId());
            preparationsIds.add(prep.getId().toString());
        });

        return fullOrder;
    }

    public TableOrderStatusByCategory getOrderStatusByCategory(Integer tableId, Integer orderId){





        return  null;
    }

    public List<TabletOrder> getTabletOrders(Integer tableId){
        log.info("Get all tablet orders for table id : " + tableId);
        return ordersByTableId.get(tableId);
    }




}
