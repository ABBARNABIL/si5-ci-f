package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.api.CookingMS;
import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.services.BffService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@SpringBootApplication
@Slf4j
@Configuration
@EnableScheduling
public class BffBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BffBackendApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder
				.setConnectTimeout(Duration.ofMillis(3000))
				.setReadTimeout(Duration.ofMillis(3000))
				.build();
	}
}
