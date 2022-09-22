package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LunchedOrder {
    private String orderId;
}
