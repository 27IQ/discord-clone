package de.minus27IQ.discord_clone.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                http

                                .csrf(csrf -> csrf.disable())
                                .anonymous(AbstractHttpConfigurer::disable)
                                .securityContext(context -> context.requireExplicitSave(false))
                                .headers(headers -> headers
                                                .frameOptions(frame -> frame.sameOrigin()))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/api/users/all", "/api/users/register",
                                                                "/api/users/login")
                                                .permitAll()
                                                .anyRequest().permitAll())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                                .cors(Customizer.withDefaults());

                return http.build();
        }
}
