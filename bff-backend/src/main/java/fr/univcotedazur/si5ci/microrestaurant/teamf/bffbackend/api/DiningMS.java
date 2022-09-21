package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions.InternalServerException;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.Item;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.Preparation;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.StartOrdering;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.TableOrder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class DiningMS {
    private final RestTemplate restTemplate;
    @Value("${microservices.dining.url}")
    private String url;
    public final String BASE_URI = "/tableOrders";

    public TableOrder openTable(StartOrdering startOrdering) {
        try {
            return restTemplate.postForObject(url + BASE_URI, startOrdering, TableOrder.class);
        }catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public List<TableOrder> findAllTableOrders() {
        try {
            var res = restTemplate.getForObject(url + BASE_URI, TableOrder[].class);
            return List.of(res);
        }catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public TableOrder addToTableOrder(UUID tableOrderId, Item item) {
        try {
            return restTemplate.postForObject(url + BASE_URI + "/" + tableOrderId, item, TableOrder.class);
        }catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }



    }

    public TableOrder tableOrder(UUID tableOrderId) {
        try {
            return restTemplate.getForObject(url + BASE_URI + "/" + tableOrderId, TableOrder.class);
        }catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public List<Preparation> prepare(UUID tableOrderId) {
        try {
            var res = restTemplate.postForObject(url + BASE_URI + "/" + tableOrderId+"/prepare", null, Preparation[].class);
            return List.of(res);
        }catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public TableOrder bill(UUID tableOrderId) {
        try {
            return restTemplate.postForObject(url + BASE_URI + "/" + tableOrderId+"/bill", null, TableOrder.class);
        }catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }


}
