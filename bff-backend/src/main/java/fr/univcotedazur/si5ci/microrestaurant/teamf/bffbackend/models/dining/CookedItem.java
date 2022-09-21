package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining;

import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
public class CookedItem implements Serializable {
    private UUID id;
    private String shortName;
}
