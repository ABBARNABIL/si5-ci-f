package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.controllers;


import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.*;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.services.BffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bff")
public class BffController {
    private final BffService bffService;

    @GetMapping("/menu/categories")
    @ResponseStatus(HttpStatus.OK)
    public List<MenuCategory> getMenuCategories() {
        return bffService.getMenuCategories();
    }

    @GetMapping("/menu/{category}")
    @ResponseStatus(HttpStatus.OK)
    public List<Menu> getMenusByCategory(@PathVariable("category") String category) {
        return bffService.getMenusByCategory(category);
    }

    @PostMapping("/order")
    @ResponseStatus(HttpStatus.CREATED)
    public LunchedOrder order(@RequestBody Order order) {
        return bffService.order(order);
    }

    @GetMapping("/tables")
    public List<Table> getTables() {
        return bffService.listALlTablesAndAvailability();
    }

}