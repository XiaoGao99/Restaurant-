package com.restaurant.server.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.server.models.Type;
import com.restaurant.server.repositories.dishRepo;
import com.restaurant.server.repositories.typeRepo;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class TypeController {
  @Autowired
  typeRepo typeRepo;

  @Autowired
  dishRepo dishRepo;

  @GetMapping("/type")
  public List<Type> getAll() {
    List<Type> typies = typeRepo.findAll();

    return typies;
  }

  @PostMapping("/type")
  public Type create(@RequestBody Type type) {
    return typeRepo.save(type);
  }

  @PutMapping("/type/{id}")
  public Type update(@PathVariable Long id, @RequestBody Type type) {
    Optional<Type> temp = typeRepo.findById(id);
    if (!temp.isPresent())
      return null;

    Type oldType = temp.get();
    oldType.setName(type.getName());
    return typeRepo.save(oldType);
  }

  @DeleteMapping("/type/{id}")
  public HashMap<String, String> delete(@PathVariable Long id) {
    HashMap<String, String> res = new HashMap<>();
    Optional<Type> temp = typeRepo.findById(id);
    if (!temp.isPresent()) {
      res.put("error", "This type does not exist!");
    } else {
      String name = temp.get().getName();
      typeRepo.deleteById(id);
      res.put("message", name + " is deleted successfully!");
    }
    return res;
  }
}
