package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class TabletOrder implements Serializable {
    private Integer tableId;
    private Integer tabletNumber;
    private List<OrderItem> items;
}
