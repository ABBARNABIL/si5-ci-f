package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions.InternalServerException;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.PreparationRequest;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.Preparation;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.PreparationStateName;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class KitchenMS {
    private final RestTemplate restTemplate;
    @Value("${microservices.kitchen.url}")
    private String url;
    private final String BASE_URI = "/preparations";

    public List<Preparation> takeOrder(PreparationRequest preparationRequest) {
        try {
            var res = restTemplate.postForObject(url + BASE_URI, preparationRequest, Preparation[].class);
            return List.of(res);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public List<Preparation> getAllPreparationsByPreparationStateAndTableId(PreparationStateName preparationStateName, Long tableId){
        try {
            var res = restTemplate.getForObject(url + BASE_URI + "/?state=" + preparationStateName.getName() + "&tableId=" + tableId, Preparation[].class);
            return List.of(res);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }
    public List<Preparation> getAllPreparationsByPreparationState(PreparationStateName preparationStateName) {
        try {
            var res = restTemplate.getForObject(url + BASE_URI + "/?state=" + preparationStateName.getName(), Preparation[].class);
            return List.of(res);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public Preparation findPreparationById(UUID preparationId) {
        try {
            return restTemplate.getForObject(url + BASE_URI + "/" + preparationId, Preparation.class);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public Preparation preparationIsServed(UUID preparationId) {
        try {
            return restTemplate.postForObject(url + BASE_URI + "/" + preparationId + "/takenToTable", null, Preparation.class);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }
}
