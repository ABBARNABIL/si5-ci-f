package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PreparationStateName {

    READY_TO_BE_SERVED("readyToBeServed"), PREPARATION_STARTED("preparationStarted");
    private String name;

}
