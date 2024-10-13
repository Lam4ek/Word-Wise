package com.example.WordWise.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "users")
public class User {

	@Id
	private String uuid; // UUID в качестве идентификатора

	@Column(unique = true, nullable = false)
	private String email;

	private String username;
	private String password;

	// Конструктор по умолчанию (нужен для JPA)
	public User() {
	}

	// Геттеры и сеттеры
	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
