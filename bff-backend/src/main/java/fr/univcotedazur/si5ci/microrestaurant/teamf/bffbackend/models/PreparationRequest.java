package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
public class PreparationRequest implements Serializable {
    @NotNull
    private Long tableId;
    @NotNull
    private List<ItemsToBeCooked> itemsToBeCookedList;
}
