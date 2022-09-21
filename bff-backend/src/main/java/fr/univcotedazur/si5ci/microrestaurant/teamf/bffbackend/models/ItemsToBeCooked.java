package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemsToBeCooked implements Serializable {
    private String shortName;
    private int howMany;
}
