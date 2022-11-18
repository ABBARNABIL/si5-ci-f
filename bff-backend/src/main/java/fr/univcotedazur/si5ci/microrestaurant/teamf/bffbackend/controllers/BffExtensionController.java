package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.controllers;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.*;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.services.BffExtensionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/bff", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*", maxAge = 3600)
public class BffExtensionController {
    private final BffExtensionService bffExtensionService;

    @PostMapping("/tablet-orders")
    @ResponseStatus(HttpStatus.OK)
    public TabletOrder tabletOrder(@RequestBody TabletOrder tabletOrder) {
        return bffExtensionService.tabletOrder(tabletOrder);
    }

    @PostMapping("/orders/{tableId}")
    @ResponseStatus(HttpStatus.OK)
    public FullOrder order(@PathVariable("tableId") Integer tableId) {
        return bffExtensionService.order(tableId);
    }


    @GetMapping("/orders/{tableId}")
    @ResponseStatus(HttpStatus.OK)
    public List<TabletOrder> getTabletOrders(@PathVariable("tableId") Integer tableId) {
        return bffExtensionService.getTabletOrders(tableId);
    }

    @GetMapping("/orders/status-by-category")
    @ResponseStatus(HttpStatus.OK)
    public List<StatusByCategoryAndTable> getStatusByCategoryAndTable() {
        return bffExtensionService.getStatusByCategoryAndTable();
    }

    @PutMapping("/preparation/{tableId}/{category}")
    @ResponseStatus(HttpStatus.OK)
    public void finishPreparation(@PathVariable("tableId") String tableId, @PathVariable("category") String category) {
        bffExtensionService.finishPreparation(tableId, category);
    }

}
