package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ConflictException extends CustomException {

    public ConflictException(String message) {
        super(message);
    }

    public ConflictException(String message, Throwable e) {
        super(message, e);
    }

    public ConflictException(ExceptionCode code, String message) {
        super(message, code, HttpStatus.CONFLICT);
    }

}
