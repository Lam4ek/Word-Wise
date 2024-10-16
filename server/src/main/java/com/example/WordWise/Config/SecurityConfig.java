package com.example.WordWise.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@SuppressWarnings("deprecation")
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeRequests(requests -> requests
						.requestMatchers("/register", "/login").permitAll() // Разрешить доступ
																																																		// без
																																																		// аутентификации
						.anyRequest().authenticated()) // Остальные запросы требуют аутентификацию
				.httpBasic(withDefaults());
		return http.build();
	}

}
