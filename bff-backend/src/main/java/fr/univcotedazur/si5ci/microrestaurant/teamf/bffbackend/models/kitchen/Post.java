package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.io.Serializable;

@Getter
public enum Post {
    BAR, COLD_DISH, HOT_DISH;
}
