package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining;

import lombok.Data;

import java.io.Serializable;

@Data
public class OrderingItem implements Serializable {
    private String id;
    private String shortName;
    private String category;
}
