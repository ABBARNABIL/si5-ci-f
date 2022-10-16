package fr.univcotedazur.menus;

import fr.univcotedazur.menus.models.Category;
import fr.univcotedazur.menus.models.MenuItem;
import fr.univcotedazur.menus.repositories.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.net.URL;
import java.util.UUID;

import static fr.univcotedazur.menus.models.Category.*;

@Component
public class MenuStartUpLogic implements ApplicationRunner {

    @Autowired
    MenuItemRepository menuItemRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        menuItemRepository.save(createMenuItem("Salade verte italienne","salade italienne",5,STARTER,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/salade.jpg")));
        menuItemRepository.save(createMenuItem("Salade verte de nice","salade de nice",5.3,STARTER,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/salade_nicoise.jpg")));
        menuItemRepository.save(createMenuItem("Salade verte césar","salade cesar",4.8,STARTER,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/salade_cesar.jpg")));
        menuItemRepository.save(createMenuItem("Pancakes","pancakes",3.5,STARTER,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/pancakes-2291908_960_720.jpg")));
        menuItemRepository.save(createMenuItem("Omelette","omelette",3,STARTER,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/kagyana-2955104_960_720.jpg")));
        menuItemRepository.save(createMenuItem("Delicious Pizza Regina","pizza",12,MAIN,
                new URL("https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg")));
        menuItemRepository.save(createMenuItem("Lasagna al forno","lasagna",16,MAIN,
                new URL("https://cdn.pixabay.com/photo/2017/02/15/15/17/meal-2069021_1280.jpg")));
        menuItemRepository.save(createMenuItem("Hamburger fromage doux","burger",8,MAIN,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/burger.jpg")));
        menuItemRepository.save(createMenuItem("Pasta del fuezo","pasta",9,MAIN,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/pasta.jpg")));
        menuItemRepository.save(createMenuItem("Nouilles","nouilles",8,MAIN,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/food-1216048_960_720.jpg")));
        menuItemRepository.save(createMenuItem("Soupe","soupe",8,MAIN,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/pumpkin-soup-3645375_960_720.jpg")));
        menuItemRepository.save(createMenuItem("Bottled coke (33cl)","coke",3.5,BEVERAGE,
                new URL("https://cdn.pixabay.com/photo/2019/11/14/15/47/coke-4626458_1280.jpg")));
        menuItemRepository.save(createMenuItem("Vin rouge de france","vin rouge",25,BEVERAGE,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/vin%20rouge.jpg")));
        menuItemRepository.save(createMenuItem("Vin blanc de france","vin blanc",20,BEVERAGE,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/vin%20blanc.jpg")));
        menuItemRepository.save(createMenuItem("Fanta","fanta",2,BEVERAGE,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/aluminum-87987_960_720.jpg")));
        menuItemRepository.save(createMenuItem("Pepsi","pepsi",2,BEVERAGE,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/pepsi-5152332_960_720.jpg")));
        menuItemRepository.save(createMenuItem("Brownie (home made)","brownie",6.5,DESSERT,
                new URL("https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg")));
        menuItemRepository.save(createMenuItem("Tiramissu fait maison","tiramissu",5.5,DESSERT,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/tiramissu.jpg")));
        menuItemRepository.save(createMenuItem("Glace vanille 3 couches","glace 3",7.5,DESSERT,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/glace.jpg")));
        menuItemRepository.save(createMenuItem("Tarte citron meringue","tarte citron",8.5,DESSERT,
                new URL("https://raw.githubusercontent.com/ABBARNABIL/images-ci/main/images/tarte%20citron.jpg")));

    }

    private static MenuItem createMenuItem(String fullName, String shortName, double price, Category category, URL image) {
        MenuItem menuItem = new MenuItem();
        menuItem.setId(UUID.randomUUID());
        menuItem.setFullName(fullName);
        menuItem.setShortName(shortName);
        menuItem.setPrice(price);
        menuItem.setCategory(category);
        menuItem.setImage(image);
        return menuItem;
    }

}
