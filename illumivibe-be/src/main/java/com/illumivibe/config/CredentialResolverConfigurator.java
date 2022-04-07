package com.illumivibe.config;

import com.illumivibe.authentication.Credential;
import com.illumivibe.authentication.LoginService;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.management.AttributeNotFoundException;
import java.util.List;
import java.util.Objects;

@Configuration
public class CredentialResolverConfigurator implements WebMvcConfigurer {
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new HandlerMethodArgumentResolver() {
            @Override
            public boolean supportsParameter(@NonNull MethodParameter parameter) {
                return isUserId(parameter) || isCredential(parameter);
            }

            @Override
            public Object resolveArgument(@NonNull MethodParameter parameter, ModelAndViewContainer mavContainer,
                                          @NonNull NativeWebRequest webRequest, WebDataBinderFactory binderFactory)
                    throws AttributeNotFoundException {
                if (isUserId(parameter)) {
                    return LoginService.getRequestCredential().uid();
                } else if (isCredential(parameter)) {
                    return LoginService.getRequestCredential();
                } else {
                    /* Internal Server Error */
                    throw new RuntimeException("resolveArgument error");
                }
            }

            private boolean isUserId(@NonNull MethodParameter parameter) {
                return parameter.getParameterType().equals(String.class) && Objects.equals(parameter.getParameterName(), "userId");
            }

            private boolean isCredential(@NonNull MethodParameter parameter) {
                return parameter.getParameterType().equals(Credential.class);
            }
        });
    }
}
