package com.example.WordWise.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.WordWise.Model.User;
import com.example.WordWise.Repository.UserRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public void registerUser(User user) {
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new IllegalArgumentException("Email already exists!");
		}
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setUuid(UUID.randomUUID().toString().replace("-", "").substring(0, 24));
		user.setPassword(encodedPassword);
		userRepository.save(user);
	}

	public User loginUser(String email, String password) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
		if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
			throw new BadCredentialsException("Invalid credentials");
		}
		return user;
	}

	private boolean emailExists(String email) {
		return userRepository.findByEmail(email).isPresent();
	}

	public User updateUser(String uuid, User user) {
		User existingUser = userRepository.findById(uuid)
				.orElseThrow(() -> new RuntimeException("User not found"));

		if (!existingUser.getEmail().equals(user.getEmail()) && emailExists(user.getEmail())) {
			throw new IllegalArgumentException("Email is already in use");
		}

		existingUser.setUsername(user.getUsername());
		existingUser.setEmail(user.getEmail());
		existingUser.setPassword(user.getPassword());

		return userRepository.save(existingUser);
	}

	public Optional<User> getUserById(String uuid) {
		return userRepository.findById(uuid);
	}

	public Optional<User> getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public void deleteUser(String uuid) {
		User user = userRepository.findByUuid(uuid)
				.orElseThrow(() -> new RuntimeException("User not found"));
		userRepository.delete(user);
	}

}
