package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StartOrdering implements Serializable {
    private Long tableId;
    private int customersCount;
}
