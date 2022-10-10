package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class FullOrder {
    private String orderId;
    private String shortOrderId;
    private Long tableId;
    private boolean started;
    private boolean finished;
    private List<OrderItem> items;
}
