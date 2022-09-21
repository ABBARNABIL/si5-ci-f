package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions.InternalServerException;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.Post;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.PreparedItem;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.kitchen.Recipe;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CookingMS {
    private final RestTemplate restTemplate;
    @Value("${microservices.kitchen.url}")
    private String url;
    private final String BASE_URI = "/preparedItems";

    public PreparedItem findPreparedItemById(UUID preparedItemId){
        try {
            return restTemplate.getForObject(url + BASE_URI + "/" + preparedItemId, PreparedItem.class);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public Recipe findRecipeByPreparedItemId(UUID preparedItemId) {
        try {
            return restTemplate.getForObject(url + BASE_URI + "/" + preparedItemId + "/recipe", Recipe.class);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public List<PreparedItem> getPreparatedItemsToStartByPost(Post postName) {
        try {
            var res = restTemplate.getForObject(url + BASE_URI + "/?post=" + postName.name(), PreparedItem[].class);
            return List.of(res);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public PreparedItem startToPrepareItemOnPost(UUID preparedItemId) {
        try {
            return restTemplate.postForObject(url + BASE_URI + "/" + preparedItemId + "/start", null, PreparedItem.class);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    public PreparedItem finishToPrepareItemOnPost(UUID preparedItemId) {
        try {
            return restTemplate.postForObject(url + BASE_URI + "/" + preparedItemId + "/finish", null, PreparedItem.class);
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

}
