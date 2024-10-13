package com.example.WordWise.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.WordWise.Model.User;

public interface UserRepository extends JpaRepository<User, String> {
	User findByUsername(String username);

	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);

	Optional<User> findByUuid(String uuid);

}
