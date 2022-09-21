package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.*;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.ItemsToBeCooked;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.PreparationRequest;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.Item;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.StartOrdering;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.TableOrder;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.PreparationStateName;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UseCaseLogic implements CommandLineRunner {
    private final MenuMS menuMS;
    private final KitchenMS kitchenMS;
    private final CookingMS cookingMS;
    private final TableMS tableMS;
    private final DiningMS diningMS;

    @Override
    public void run(String... args) throws Exception {
        menuMS.getTheFullMenu().forEach(System.out::println);
        //System.out.println(menuMS.tableOrder(UUID.fromString("b075b614-d781-401a-8731-09114291699a")));
        PreparationRequest preparationRequest = new PreparationRequest();
        preparationRequest.setTableId(1L);
        List<ItemsToBeCooked> itemsToBeCooked = List.of(
                new ItemsToBeCooked("pizza", 2),
                new ItemsToBeCooked("lasagna", 5)
        );
        preparationRequest.setItemsToBeCookedList(itemsToBeCooked);
        //set the order to the kitchen
        var prep = kitchenMS.takeOrder(preparationRequest);

        kitchenMS.findPreparationById(prep.get(0).getId());
        prep.get(0).getPreparedItems().forEach(x -> {
            cookingMS.startToPrepareItemOnPost(x.getId());
        });
        kitchenMS.getAllPreparationsByPreparationStateAndTableId(PreparationStateName.READY_TO_BE_SERVED, 1L);
        kitchenMS.getAllPreparationsByPreparationStateAndTableId(PreparationStateName.PREPARATION_STARTED, 1L);
        //Thread.sleep(5000);
        prep.get(0).getPreparedItems().forEach(x -> {
            cookingMS.finishToPrepareItemOnPost(x.getId());
        });
        kitchenMS.getAllPreparationsByPreparationStateAndTableId(PreparationStateName.READY_TO_BE_SERVED, 1L);


        kitchenMS.findPreparationById(prep.get(0).getId());
        //cookingMS.getPreparatedItemsToStartByPost(Post.HOT_DISH);

        kitchenMS.preparationIsServed(prep.get(0).getId());

        tableMS.listAllTables();
        var order = diningMS.openTable(new StartOrdering(3L, 4));
        diningMS.addToTableOrder(order.getId(), new Item(null, "pizza", 2));
        diningMS.findAllTableOrders();
        diningMS.tableOrder(order.getId());

    }
}
