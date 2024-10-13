package com.example.WordWise.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.WordWise.Model.User;
import com.example.WordWise.Service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	// Получение пользователя по ID
	@GetMapping("/{uuid}")
	public ResponseEntity<User> getUserById(@PathVariable String uuid) {
		Optional<User> user = userService.getUserById(uuid);
		return user.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	// Обновление пользователя
	@PutMapping("/{uuid}")
	public ResponseEntity<User> updateUser(@PathVariable String uuid, @RequestBody User userDetails) {
		User updatedUser = userService.updateUser(uuid, userDetails);
		return ResponseEntity.ok(updatedUser);
	}

	// Удаление пользователя
	@DeleteMapping("/{uuid}")
	public ResponseEntity<String> deleteUser(@PathVariable String uuid) {
		try {
			userService.deleteUser(uuid);
			return ResponseEntity.ok("User with UUID " + uuid + " deleted successfully.");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
