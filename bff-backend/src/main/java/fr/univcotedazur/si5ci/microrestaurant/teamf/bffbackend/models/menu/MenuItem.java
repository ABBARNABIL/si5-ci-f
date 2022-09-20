package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.menu;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.net.URL;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem implements Serializable {
    private UUID id;
    private String fullName;
    private String shortName;
    private double price;
    private Category category;
    private URL image;
}
