package com.illumivibe.config;

import com.illumivibe.authentication.Credential;
import com.illumivibe.authentication.LoginService;
import com.illumivibe.users.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    private final LoginService loginService;

    @Autowired
    public AuthenticationFilter(LoginService loginService) {
        this.loginService = loginService;
    }

    @Override
    public void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                 @NonNull FilterChain chain) throws IOException, ServletException {
        /* Ignore OPTIONS for CORS preflight */
        if (request.getMethod().equals("OPTIONS")) {
            chain.doFilter(request, response);
            return;
        }

        /* Ignore public URIs */
        String uri = request.getRequestURI();
        if (!uri.startsWith("/api") || uri.startsWith("/api/public")) {
            chain.doFilter(request, response);
            return;
        }

        Credential credential;
        try {
            credential = loginService.processCredential(request);
        } catch (GeneralSecurityException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().println(e.getMessage());
            return;
        }

        if (uri.startsWith("/api/admin")) {
            if (!credential.role().atLeast(Role.Admin)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().println("Not an admin");
            }
        } else if (uri.startsWith("/api/user")) {
            if (!credential.role().atLeast(Role.User)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().println("Not a user");
            }
        }

        chain.doFilter(request, response);
    }
}
