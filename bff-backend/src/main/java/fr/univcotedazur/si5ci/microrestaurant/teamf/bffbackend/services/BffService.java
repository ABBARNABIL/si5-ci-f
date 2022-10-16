package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.services;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.*;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.*;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions.InternalServerException;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.Item;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.StartOrdering;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.TableWithOrder;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.Post;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.Preparation;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.PreparationStateName;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.menu.Category;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.menu.MenuItem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class BffService {
    private final CookingMS cookingMS;
    private final TableMS tableMS;
    private final DiningMS diningMS;
    private final KitchenMS kitchenMS;
    private final MenuMS menuMS;

    private List<FullOrder> orders = new ArrayList<>();
    public static HashMap<String, String> shouldBeReadyAtArray = new HashMap<>();
    public static HashMap<String, List<String>> preparationIdByOrderId = new HashMap<>();

    public List<MenuCategory> getMenuCategories() {
        log.info("Getting all menu categories");
        List<MenuCategory> menuCategories = new ArrayList<>();
        Arrays.stream(Category.values()).forEach(category -> {
            if (category == Category.STARTER) {
                menuCategories.add(new MenuCategory(category.name(), "http://localhost:8080/starter.jpg"));
            }else if(category == Category.MAIN){
                menuCategories.add(new MenuCategory(category.name(), "http://localhost:8080/main.jpg"));
            }else if(category == Category.BEVERAGE){
                menuCategories.add(new MenuCategory(category.name(), "http://localhost:8080/beverage.jpg"));
            }else if(category == Category.DESSERT) {
                menuCategories.add(new MenuCategory(category.name(), "http://localhost:8080/dessert.jpg"));
            }
        });
        return menuCategories;
    }

    public List<Menu> getMenusByCategory(String category) {
        log.info("Getting all menus by category "+category);
        var menus = menuMS.getTheFullMenu();
        List<Menu> menusByCategory = new ArrayList<>();
        menus.forEach(menu -> {
            if (menu.getCategory().name().equals(category)) {
                menusByCategory.add(new Menu(menu.getFullName(), menu.getShortName() ,menu.getPrice(), menu.getImage()));
            }
        });
        return menusByCategory;
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

    public FullOrder order(Order order) {
        log.info("####### Request for New Order #######");
        var tableId = orders.size()+1;

        log.info("Start opening Table "+tableId);
        var tableOrder = diningMS.openTable(new StartOrdering((long) tableId, 1));
        log.info("Table "+tableId+" opened with orderId "+tableOrder.getId());
        var shortOrderId = tableOrder.getId().toString().substring(0, 4);
        order.getItems().forEach(item ->{
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
            log.info("Preparation "+preparedUtem.getId()+" started");
            var prep = cookingMS.startToPrepareItemOnPost(preparedUtem.getId());
            preparationsIds.add(prep.getId().toString());
        });
        var shouldBeReadyAt = prepare.getShouldBeReadyAt().plusHours(2).plusMinutes(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        shouldBeReadyAtArray.put(tableOrder.getId().toString(), shouldBeReadyAt);
        preparationIdByOrderId.put(tableOrder.getId().toString(), preparationsIds);

        var fullOrder =  new FullOrder(tableOrder.getId().toString(), shortOrderId, tableOrder.getTableNumber(), false, order.getItems());
        orders.add(fullOrder);
        return fullOrder;
    }

    public  List<FullOrder> getOrders(){
        //log.info("####### Getting orders #######");
        return orders;
    }

    public List<TableWithOrder> listALlTablesAndAvailability() {
        log.info("Listing all tables and their availability");
        var tables = tableMS.listAllTables();
        return tables;
    }

    //private List<kitchenPreparation>

    public OrderPrepartion getAllPreparationsByTableId(int tableId) {
        log.info("Getting all available preparation items for all posts for table "+tableId);
        var tablePreparations = kitchenMS.getAllPreparationsByPreparationStateAndTableId(PreparationStateName.PREPARATION_STARTED, Long.valueOf(tableId)).get(0);
        log.error("Table preparations: "+tablePreparations);
        var preparationItems = tablePreparations.getPreparedItems();
        List<kitchenPreparation> kitchenPreparations = new ArrayList<>();
        preparationItems.forEach(preparationItem -> {
            kitchenPreparations.add(new kitchenPreparation(preparationItem.getId(), preparationItem.getShortName()));
        });

        var res = new OrderPrepartion();
        res.setTableId(tablePreparations.getTableId().toString());
        res.setPreparations(kitchenPreparations);
        return res;
    }


    @Scheduled(fixedDelay = 1000)
    public void finishOrdersPreparation() {
        if(BffService.shouldBeReadyAtArray.size() > 0){
            BffService.shouldBeReadyAtArray.forEach((key, value) -> {
                if(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")).equals(value)){
                    //BffService.shouldBeReadyAtArray.remove(key);
                    log.info("Order " + key + " is ready");
                    BffService.preparationIdByOrderId.get(key).forEach(preparationId -> {
                        cookingMS.finishToPrepareItemOnPost(UUID.fromString(preparationId));
                        log.info("Preparation " + preparationId + " is finished");
                    });
                    //get key index in should be ready at array
                    orders.forEach(order -> {
                        if(order.getOrderId().equals(key)){
                            order.setStatus(true);
                        }
                    });
                }
            });

        }
    }

    public boolean isOrderFinished(Integer tableId) {
       var res =  kitchenMS.getAllPreparationsByPreparationStateAndTableId(PreparationStateName.READY_TO_BE_SERVED, Long.valueOf(tableId));
         return res.size() > 0;
    }

}
