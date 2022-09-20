package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend;

import fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.microservices.MenuMS;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.UUID;

@SpringBootApplication
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

	// TEST microservice Menu call
	@Bean
	CommandLineRunner start(MenuMS menuMS) {
		return args -> {
			menuMS.getTheFullMenu().forEach(System.out::println);
			System.out.println(menuMS.tableOrder(UUID.fromString("b075b614-d781-401a-8731-09114291699a")));
		};
	}

}
