package com.example.WordWise.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.WordWise.Model.User;
import com.example.WordWise.Repository.UserRepository;

import java.util.Optional;
import java.util.UUID; // Импортируйте UUID

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public void registerUser(User user) {
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new IllegalArgumentException("Email already exists!");
		}
		user.setUuid(UUID.randomUUID().toString().replace("-", "").substring(0, 24));
		userRepository.save(user);
	}

	// Проверка наличия email в базе данных
	private boolean emailExists(String email) {
		return userRepository.findByEmail(email).isPresent();
	}

	// Обновление пользователя
	public User updateUser(String uuid, User user) {
		User existingUser = userRepository.findById(uuid)
				.orElseThrow(() -> new RuntimeException("User not found"));

		// Если email изменен, проверяем его уникальность
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

	public void deleteUser(String uuid) {
		User user = userRepository.findByUuid(uuid)
				.orElseThrow(() -> new RuntimeException("User not found"));
		userRepository.delete(user);
	}

}
