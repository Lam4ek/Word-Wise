package com.example.WordWise.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.WordWise.Model.User;
import com.example.WordWise.Service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/{uuid}")
	public ResponseEntity<User> getUserById(@PathVariable String uuid) {
		User user = userService.getUserById(uuid)
				.orElseThrow(() -> new RuntimeException("User not found"));
		return ResponseEntity.ok(user);
	}

	@PutMapping("/{uuid}")
	public ResponseEntity<User> updateUser(@PathVariable String uuid, @RequestBody User user) {
		User updatedUser = userService.updateUser(uuid, user);
		return ResponseEntity.ok(updatedUser);
	}

	@DeleteMapping("/{uuid}")
	public ResponseEntity<String> deleteUser(@PathVariable String uuid) {
		userService.deleteUser(uuid);
		return ResponseEntity.noContent().build();
	}
}
