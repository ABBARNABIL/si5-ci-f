package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NotFoundException extends CustomException {

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, Throwable e) {
        super(message, e);
    }

    public NotFoundException(ExceptionCode code, String message) {
        super(message, code, HttpStatus.NOT_FOUND);
    }

}
