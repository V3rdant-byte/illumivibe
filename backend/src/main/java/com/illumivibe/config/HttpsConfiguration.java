package com.illumivibe.config;

import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HttpsConfiguration {

    @Value("${server.port-http}")
    private int serverPortHttp;

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> cookieProcessorCustomizer() {
        return (TomcatServletWebServerFactory factory) -> {
            Connector connector = new Connector();
            connector.setPort(serverPortHttp);
            factory.addAdditionalTomcatConnectors(connector);
        };
    }
}
