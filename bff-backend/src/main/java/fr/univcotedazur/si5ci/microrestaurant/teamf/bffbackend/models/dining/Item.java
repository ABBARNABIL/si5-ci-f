package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining;

import lombok.Data;

import java.io.Serializable;

@Data
public class Item implements Serializable {
    private String id;
    private String shortName;
    private int howMany;
}
