package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models;

import lombok.Data;
import java.io.Serializable;

@Data
public class ItemsToBeCooked implements Serializable {
    private String shortName;
    private int howMany;
}
