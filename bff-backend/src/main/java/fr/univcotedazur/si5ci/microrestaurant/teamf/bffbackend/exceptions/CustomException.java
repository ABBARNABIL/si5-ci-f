package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CustomException extends RuntimeException {

    protected final ExceptionCode code;
    protected final HttpStatus status;

    public CustomException(String message) {
        super(message);
        this.code = ExceptionCode.UNKNOWN;
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public CustomException(String message, Throwable cause) {
        super(message, cause);
        this.code = ExceptionCode.UNKNOWN;
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public CustomException(String message, ExceptionCode code, HttpStatus status) {
        super(message);
        this.code = code;
        this.status = status;
    }

}
