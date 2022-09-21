package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions;

public class InternalServerException extends CustomException {

    public InternalServerException(String message) {
        super(message);
    }

    public InternalServerException(String message, Throwable e) {
        super(message, e);
    }

}
