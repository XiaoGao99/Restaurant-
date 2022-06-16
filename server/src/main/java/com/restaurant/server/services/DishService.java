package com.restaurant.server.services;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.server.models.Dish;
import com.restaurant.server.models.Type;
import com.restaurant.server.repositories.dishRepo;
import com.restaurant.server.repositories.typeRepo;

@Service
public class DishService {
  @Autowired
  dishRepo dishRepo;

  @Autowired
  typeRepo typeRepo;

  public List<Dish> getAll() {
    return dishRepo.findAll();
  }

  public Dish getDishById(Long id) {
    Optional<Dish> dish = dishRepo.findById(id);
    if (dish.isPresent())
      return dish.get();
    return null;
  }

  public List<Dish> getByType(Long typeId) {
    Type type = typeRepo.findById(typeId).get();
    return dishRepo.findAllByType(type);
  }

  public HashMap<String, String> deleteById(Long id) {
    Optional<Dish> dish = dishRepo.findById(id);
    if (!dish.isPresent()) {
      return new HashMap<String, String>() {
        {
          put("error", "This dish does not exist!");
        }
      };
    } else {
      String name = dish.get().getName();
      dishRepo.deleteById(id);
      return new HashMap<String, String>() {
        {
          put("Success", name + " is deleted successfully!");
        }
      };
    }
  }

  public Dish create(String name, Double price, String description, Long typeId) {
    Type type = typeRepo.findById(typeId).get();
    Dish dish = new Dish(name, price, description, type);
    return dishRepo.save(dish);
  }

  public Dish updateDishById(Long id, String name, Double price, String description, Long typeId) {
    Optional<Dish> dish = dishRepo.findById(id);
    if (!dish.isPresent()) {
      return null;
    } else {
      // since type id is passed by select menu, it always exists
      Type type = typeRepo.findById(id).get();
      Dish theDish = dish.get();
      theDish.setName(name);
      theDish.setPrice(price);
      theDish.setDescription(description);
      theDish.setType(type);
      return dishRepo.save(theDish);
    }

  }
}
