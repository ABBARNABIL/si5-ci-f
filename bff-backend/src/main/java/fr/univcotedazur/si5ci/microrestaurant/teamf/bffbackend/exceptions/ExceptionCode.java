package fr.univcotedazur.si5ci.microrestaurant.teamf.bffbackend.exceptions;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    // Global Exception with no details
    BAD_REQUEST("bad_request"), FORBIDDEN("forbidden"), NOT_FOUND("not_found"), INTERNAL_SERVER_ERROR("internal_server_error"), UNKNOWN("unknown"),
    MENU_SHORT_NAME_ALREADY_EXISTS("menu_short_name_already_exists");


    public final String code;

    ExceptionCode(String code) {
        this.code = code;
    }
}
