package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto;

import lombok.Data;
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Data
@Getter
public class Order implements Serializable {
    private List<OrderItem> items;
}
