package com.restaurant.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


import org.mindrot.jbcrypt.BCrypt;

import com.restaurant.server.models.Admin;
import com.restaurant.server.repositories.adminRepo;
import com.restaurant.server.services.adminService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class adminController {
  @Autowired
  adminRepo adminRepo;

  @Autowired
  adminService adminService;

  // test

  @GetMapping("/admin/test")
  public List<Admin> getAll() {
    return adminRepo.findAll();
  }

  @DeleteMapping("/admin/{id}")
  public HashMap<String, String> deleteAdmin(@PathVariable Long id) {
    Optional<Admin> admin = adminRepo.findById(id);
    if (!admin.isPresent()) {
      return new HashMap<String, String>() {
        {
          put("error", "Admin does not exist");
        }
      };
    } else {
      adminRepo.deleteById(id);
      return new HashMap<String, String>() {
        {
          put("message", "Deleted!");
        }
      };
    }

  }
  // register
  @PostMapping("/admin")
  public Admin createAdmin(@RequestBody Admin admin) {
    String hashed = BCrypt.hashpw(admin.getPassword(), BCrypt.gensalt());
    admin.setPassword(hashed);
    return adminRepo.save(admin);
  }

  // login
  @GetMapping("/admin/{username}/{password}")
  public HashMap<String, String> login(@PathVariable String username, @PathVariable String password) {
    Admin login = adminService.login(username, password);
    if (login == null) {
      HashMap<String, String> error = new HashMap<>();
      error.put("error", "Username and password do not match!");
      return error;
    } else {
      HashMap<String,String> object = new HashMap<>();
      object.put("message", "Success!");
      object.put("username", login.getUsername());
      object.put("email", login.getEmail());
      return object;
    }
  }
}
