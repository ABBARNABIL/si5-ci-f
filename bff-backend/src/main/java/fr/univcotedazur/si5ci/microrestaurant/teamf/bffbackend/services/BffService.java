package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.services;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.*;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.*;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.Item;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.StartOrdering;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.TableOrder;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.menu.Category;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.menu.MenuItem;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class BffService {
    private final CookingMS cookingMS;
    private final TableMS tableMS;
    private final DiningMS diningMS;
    private final KitchenMS kitchenMS;
    private final MenuMS menuMS;

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
                menusByCategory.add(new Menu(menu.getFullName(), menu.getPrice(), menu.getImage()));
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

    public LunchedOrder order(Order order) {
        log.info("####### Request for New Order #######");
        log.info("Start opening Table "+order.getTableId());
        var tableOrder = diningMS.openTable(new StartOrdering(order.getTableId().longValue(), 1));
        log.info("Table "+order.getTableId()+" opened with orderId "+tableOrder.getId());
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
        //diningMS.prepare(tableOrder.getId());
        log.info("Order "+tableOrder.getId()+" is being prepared");
        return new LunchedOrder(tableOrder.getId().toString());
    }

    public List<Table> listALlTablesAndAvailability() {
        log.info("Listing all tables and their availability");
        var tables = tableMS.listAllTables();
        List<Table> tablesList = new ArrayList<>();
        tables.forEach(table -> {
            tablesList.add(new Table(table.getNumber(), table.isTaken()));
        });
        return tablesList;
    }


}
