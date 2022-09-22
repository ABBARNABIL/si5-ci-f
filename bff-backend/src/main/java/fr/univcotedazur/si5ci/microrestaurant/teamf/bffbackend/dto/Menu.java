package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.menu.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.net.URL;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Menu implements Serializable {
    private String fullName;
    private double price;
    private URL image;
}
