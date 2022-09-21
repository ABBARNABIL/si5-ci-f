package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class TableOrder implements Serializable {
    private UUID id;
    private Long tableNumber;
    private int customersCount;
    private LocalDateTime opened;
    private List<OrderingLine> lines;
    private List<Preparation> preparations;
    private LocalDateTime billed;
}
