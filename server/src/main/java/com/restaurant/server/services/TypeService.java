package com.restaurant.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.server.models.Type;
import com.restaurant.server.repositories.typeRepo;

@Service
public class TypeService {

  @Autowired
  typeRepo typeRepo;

  List<Type> findAll() {
    List<Type> typies = typeRepo.findAll();
    return typies;
  }
}
