package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class Preparation implements Serializable {
    private UUID id;
    private Long tableId;
    private LocalDateTime shouldBeReadyAt;
    private LocalDateTime completedAt;
    private LocalDateTime takenForServiceAt;
    private List<PreparedItem> preparedItems;
}
