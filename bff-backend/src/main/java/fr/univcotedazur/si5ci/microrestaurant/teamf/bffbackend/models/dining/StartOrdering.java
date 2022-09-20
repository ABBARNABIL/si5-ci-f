package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining;

import lombok.Data;

import java.io.Serializable;

@Data
public class StartOrdering implements Serializable {
    private Long tableId;
    private int customersCount;
}
