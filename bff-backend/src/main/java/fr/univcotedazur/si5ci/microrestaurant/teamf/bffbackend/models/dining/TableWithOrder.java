package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining;

import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
public class TableWithOrder implements Serializable {
    private Long number;
    private boolean taken;
    private UUID tableOrderId;
}
