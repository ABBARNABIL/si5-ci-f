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
import org.springframework.stereotype.Service;

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

    private Map<String, List<String>> preparationsIdByOrderId = new HashMap<>();
    private List<FullOrder> orders = new ArrayList<>();

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

    private void addPreparationsToMap(String orderId, List<Preparation> preparations){
        List<String> preparationsId = new ArrayList<>();
        preparations.forEach(preparation -> preparationsId.add(preparation.getId().toString()));
        preparationsIdByOrderId.put(orderId, preparationsId);
    }

    public FullOrder order(Order order) {
        log.info("####### Request for New Order #######");
        // generation aléatoire d'une table
        //var tableId = getAvailableTableId();
        var tableId = orders.size()+1;

        log.info("Start opening Table "+tableId);
        var tableOrder = diningMS.openTable(new StartOrdering((long) tableId, 1));
        log.info("Table "+tableId+" opened with orderId "+tableOrder.getId());
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
        diningMS.prepare(tableOrder.getId());
        log.info("Order "+tableOrder.getId()+" is sent to the kitchen for preparation");
        var fullOrder =  new FullOrder(tableOrder.getId().toString(), tableOrder.getTableNumber(), false, order.getItems());
        orders.add(fullOrder);
        return fullOrder;
    }

    public  List<FullOrder> getOrders(){
        log.info("####### Getting orders #######");
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


       /* var barAvailableItems = cookingMS.getPreparatedItemsToStartByPost(Post.BAR);
        var coldDishAvailableItems = cookingMS.getPreparatedItemsToStartByPost(Post.COLD_DISH);
        var hotDishAvailableItems = cookingMS.getPreparatedItemsToStartByPost(Post.HOT_DISH);

        Map<String, List<kitchenPreparation>> availableItems = new HashMap<>();
        availableItems.put(Post.BAR.name(), barAvailableItems);
        availableItems.put(Post.COLD_DISH.name(), coldDishAvailableItems);
        availableItems.put(Post.HOT_DISH.name(), hotDishAvailableItems);*/

        var res = new OrderPrepartion();
        res.setTableId(tablePreparations.getTableId().toString());
        res.setPreparations(kitchenPreparations);
        return res;
    }

    public void startTablePreparationsInKitchen(String tableId) {
        log.info("Starting preparations for table "+tableId);
        //cookingMS.startToPrepareItemOnPost("");
    }


}
