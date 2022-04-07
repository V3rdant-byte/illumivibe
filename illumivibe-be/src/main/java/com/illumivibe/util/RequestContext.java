package com.illumivibe.util;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.management.AttributeNotFoundException;
import javax.validation.constraints.NotNull;
import java.util.Objects;

public class RequestContext {
    public static void set(String name, Object value) {
        getRequestAttributes().setAttribute(name, value, RequestAttributes.SCOPE_REQUEST);
    }

    public static Object get(String name) throws AttributeNotFoundException {
        Object attribute = getRequestAttributes().getAttribute(name, RequestAttributes.SCOPE_REQUEST);
        if (attribute == null) {
            throw new AttributeNotFoundException();
        }
        return attribute;
    }

    @NotNull
    private static RequestAttributes getRequestAttributes() {
        return Objects.requireNonNull(RequestContextHolder.getRequestAttributes());
    }
}
