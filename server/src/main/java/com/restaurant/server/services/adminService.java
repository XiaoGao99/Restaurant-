package com.restaurant.server.services;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.server.models.Admin;
import com.restaurant.server.repositories.adminRepo;

@Service
public class adminService {
  @Autowired
  adminRepo adminRepo;

  public Admin login(String username, String password) {
    Optional<Admin> admin = adminRepo.findByUsername(username);
    if (!admin.isPresent()) {
      return null;
    }

    if (!BCrypt.checkpw(password, admin.get().getPassword())) {
      return null;
    }

    return admin.get();
  }
}
