package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.controllers;


import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.*;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.TableWithOrder;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.PreparedItem;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.services.BffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/bff", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*", maxAge = 3600)
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

    @PostMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    public FullOrder order(@RequestBody Order order) {
        return bffService.order(order);
    }

    @GetMapping("/tables")
    public List<TableWithOrder> getTables() {
        return bffService.listALlTablesAndAvailability();
    }

    @GetMapping("/orders")
    @ResponseStatus(HttpStatus.OK)
    public List<FullOrder> getOrders() {
        return bffService.getOrders();
    }

    /*@GetMapping("/kitchen/available-preparations")
    @ResponseStatus(HttpStatus.OK)
    public OrderPrepartion getAllPreparation() {
        return bffService.getAllPreparationsByTableId(2);
    }*/

}
