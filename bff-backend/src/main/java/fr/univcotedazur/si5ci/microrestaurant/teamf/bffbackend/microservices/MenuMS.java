package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.microservices;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions.ConflictException;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions.ExceptionCode;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions.NotFoundException;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.models.menu.MenuItem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Slf4j
public class MenuMS {
    private final RestTemplate restTemplate;
    @Value("${microservices.menu.url}")
    private String URL;
    private final String BASE_URI = "/menus";

    public MenuItem addMenuItem(MenuItem menuItem){
        try {
            return restTemplate.postForObject(URL + BASE_URI, menuItem, MenuItem.class);
        } catch (HttpClientErrorException.Conflict e) {
            throw new ConflictException(ExceptionCode.MENU_SHORT_NAME_ALREADY_EXISTS, e.getMessage());
        }
    }

    public List<MenuItem> getTheFullMenu(){
        var menuItems = restTemplate.getForObject(URL + BASE_URI, MenuItem[].class);
        assert menuItems != null;
        return Arrays.asList(menuItems);
    }

    public MenuItem tableOrder(UUID menuItemId){
        try {
            return restTemplate.getForObject(URL + BASE_URI + "/" + menuItemId, MenuItem.class);
        } catch (HttpClientErrorException.NotFound e) {
            throw new NotFoundException(ExceptionCode.NOT_FOUND, e.getMessage());
        }
    }

}
