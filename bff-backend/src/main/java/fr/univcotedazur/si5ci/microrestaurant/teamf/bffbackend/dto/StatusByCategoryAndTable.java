package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class StatusByCategoryAndTable {

    private String tableId;
    private boolean STARTER;
    private boolean MAIN;
    private boolean DESSERT;
    private boolean BEVERAGE;

}
