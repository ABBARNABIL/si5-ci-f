package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class Recipe implements Serializable {
    private String shortName;
    private Post post;
    private List<String> cookingSteps;
    private int meanCookingTimeInSec;
}
