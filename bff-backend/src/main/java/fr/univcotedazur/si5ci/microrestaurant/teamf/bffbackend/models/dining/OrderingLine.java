package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining;

import lombok.Data;

import java.io.Serializable;

@Data
public class OrderingLine implements Serializable {
    private OrderingItem item;
    private int howMany;
    private boolean sentForPreparation;
}
