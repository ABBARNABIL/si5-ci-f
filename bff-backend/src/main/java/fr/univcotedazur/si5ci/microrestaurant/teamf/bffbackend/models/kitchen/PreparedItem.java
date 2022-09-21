package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
public class PreparedItem implements Serializable {
    private UUID id;
    private String shortName;
    private Recipe recipe;
    private LocalDateTime shouldStartAt;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;
}
