package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.microservices;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class DiningMS {
    private final RestTemplate restTemplate;
    @Value("${microservices.dining.url}")
    private String url;


}
