package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.Preparation;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.PreparedItem;

import java.util.List;

public class Line {
    private List<Preparation> preparations;
    private boolean status;
}
