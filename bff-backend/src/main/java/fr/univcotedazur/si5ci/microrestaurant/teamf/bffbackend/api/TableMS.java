package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions.InternalServerException;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.TableCreation;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.dining.TableWithOrder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TableMS {
    private final RestTemplate restTemplate;
    @Value("${microservices.dining.url}")
    private String url;
    private final String BASE_URI = "/tables";


    public TableWithOrder createTable(TableCreation tableCreation){
        try {
            return restTemplate.postForObject(url + BASE_URI, tableCreation, TableWithOrder.class);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public List<TableWithOrder> listAllTables() {
        try {
            var res = restTemplate.getForObject(url + BASE_URI, TableWithOrder[].class);
            return List.of(res);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public TableWithOrder findTableByNumber(Long tableId){
        try {
            return restTemplate.getForObject(url + BASE_URI + "/" + tableId, TableWithOrder.class);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

}
