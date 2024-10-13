package com.example.WordWise.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.WordWise.Model.User;
import com.example.WordWise.Service.UserService;

@RestController
public class AuthController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User user) {
		try {
			// Вызываем метод через инжектированный объект
			userService.registerUser(user);
			return ResponseEntity.ok("User registered successfully!");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@PostMapping("/login")
	public String login(@RequestBody User user) {
		// Логика аутентификации пользователя
		return "User logged in: " + user.getUsername();
	}
}