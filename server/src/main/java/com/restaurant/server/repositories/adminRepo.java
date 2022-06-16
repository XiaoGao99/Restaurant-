package com.restaurant.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.server.models.Admin;

@Repository
public interface adminRepo extends CrudRepository<Admin, Long>{

  List<Admin> findAll();
  Optional<Admin> findByUsername(String username);
}
