package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.services;


import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.FullOrder;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.OrderItem;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto.TabletOrder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BffExtensionService {

    public static HashMap<Integer, List<Integer>> tableIdWithTabletId = new HashMap<>(); // relation table et tablet <tableId, List<tabletId>>; Voir useCaseLogic.java à la racine du projet
    public List<FullOrder> orders; //toutes les commandes
    public HashMap<Integer, HashMap<Integer, List<OrderItem>>> ordersByTabletIdAndTableId = new HashMap<>(); // <tableId, <tabletId, List<OrderItem>>> ; commandes par tablette et par table



    public TabletOrder tabletOrder(TabletOrder order){
        log.info("Tablet order for table id : " + order.getTableId() + " and tablet id : " + order.getTabletNumber());
        ordersByTabletIdAndTableId.putIfAbsent(order.getTableId(), new HashMap<>());
        ordersByTabletIdAndTableId.get(order.getTableId()).put(order.getTabletNumber(), order.getItems());
        return order;
    }

    public FullOrder order(Integer tableId){
        log.info("Order for table id : " + tableId);
        FullOrder fullOrder = new FullOrder();
        fullOrder.setTableId(tableId.longValue());
        fullOrder.setItems(ordersByTabletIdAndTableId.get(tableId).values().stream().flatMap(List::stream).toList());
        //TODO : Appliquer la meme logique que dans BffService pour les orders
        return fullOrder;
    }




}
