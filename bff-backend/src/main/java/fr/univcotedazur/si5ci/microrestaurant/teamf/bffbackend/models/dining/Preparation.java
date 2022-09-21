package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class Preparation implements Serializable {
    private UUID id;
    private LocalDateTime shouldBeReadyAt;
    private List<CookedItem> preparedItems;
}
