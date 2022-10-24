package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.*;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.services.BffExtensionService;
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
    // RELATION BETWEEN TABLE AND TABLET
        BffExtensionService.tableIdWithTabletId.put(1, List.of(1, 2, 3, 4));
        BffExtensionService.tableIdWithTabletId.put(2, List.of(1, 2, 3, 4));
        BffExtensionService.tableIdWithTabletId.put(3, List.of(1, 2, 3, 4));
        BffExtensionService.tableIdWithTabletId.put(4, List.of(1, 2, 3, 4));
        BffExtensionService.tableIdWithTabletId.put(5, List.of(1, 2, 3, 4));
        BffExtensionService.tableIdWithTabletId.put(6, List.of(1, 2, 3, 4));
        BffExtensionService.tableIdWithTabletId.put(7, List.of(1, 2, 3, 4));
        BffExtensionService.tableIdWithTabletId.put(8, List.of(1, 2, 3, 4));

    }
}
