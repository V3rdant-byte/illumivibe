package com.illumivibe.authentication;

import com.illumivibe.users.Role;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.TemporalAmount;
import java.util.Date;

@Service
class Jwt {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final Key key;
    private final JwtParser parser;
    private final TemporalAmount expiresIn;

    Jwt(@Value("${jwt.secret}") String secret, @Value("${jwt.expires_in}") int expiresIn) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.parser = Jwts.parserBuilder().setSigningKey(key).build();
        this.expiresIn = Duration.ofSeconds(expiresIn);
    }

    String refresh(String oldToken) throws JwtException {
        Credential credential = getCredential(oldToken);
        return generate(credential.uid(), credential.role());
    }

    String generate(String uid, Role role) {
        Date expires = generateExpirationDate();
        logger.info("Generating a token that expires at {}", expires);
        return Jwts.builder()
                .claim("uid", uid)
                .claim("rol", role.level)
                .setExpiration(expires)
                .signWith(key)
                .compact();
    }

    private Claims getClaims(String token) throws JwtException {
        return parser.parseClaimsJws(token).getBody();
    }

    Credential getCredential(String token) throws JwtException {
        Claims claims = getClaims(token);
        try {
            String uid = claims.get("uid", String.class);
            Role role = Role.of(claims.get("rol", Integer.class));
            Date expires = claims.getExpiration();
            return new Credential(uid, role, expires);
        } catch (NullPointerException e) {
            throw new MalformedJwtException("Unable to read claims");
        }
    }

    private Date generateExpirationDate() {
        return Date.from(Instant.now().plus(expiresIn));
    }

}
