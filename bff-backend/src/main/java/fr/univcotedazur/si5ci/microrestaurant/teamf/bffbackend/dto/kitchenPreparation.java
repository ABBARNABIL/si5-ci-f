package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class kitchenPreparation {
    private UUID id;
    private String shortName;
}
