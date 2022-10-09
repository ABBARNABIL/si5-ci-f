package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class OrderPrepartion {
    private String tableId;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;
    private List<kitchenPreparation> preparations;
}
