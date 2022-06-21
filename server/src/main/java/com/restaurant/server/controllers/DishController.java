package com.restaurant.server.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

import com.restaurant.server.models.Dish;
import com.restaurant.server.services.DishService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class DishController {
  @Autowired
  DishService dishService;

  @GetMapping("/dish")
  public List<HashMap<String, Object>> getAll() {
    List<HashMap<String, Object>> res = new ArrayList<>();
    List<Dish> dishes = dishService.getAll();
    for (Dish dish : dishes) {
      String type = dish.getType().getName();
      HashMap<String, Object> map = new HashMap<>();
      map.put("dish", dish);
      map.put("type", type);
      res.add(map);
    }
    return res;
  }

  @GetMapping("/dish/{id}")
  public Object getById(@PathVariable Long id) {
    Dish dish = dishService.getDishById(id);
    if (dish == null) {
      HashMap<String, String> err = new HashMap<>();
      err.put("error", "Dish does not exist!");
      return err;
    }
    HashMap<String, Object> map = new HashMap<>();
    map.put("dish", dish);
    map.put("type", dish.getType().getName());
    map.put("typeId", dish.getType().getId());
    return map;
  }

  @GetMapping("/dish/type/{typeid}")
  public List<Dish> getByType(@PathVariable Long typeid) {
    return dishService.getByType(typeid);
  }

  @PostMapping("/dish")
  public Dish create(@RequestBody HashMap<String, String> dishMap) {
    Long typeId = Long.parseLong(dishMap.get("typeId"));
    Double price = Double.parseDouble(dishMap.get("price"));
    String name = dishMap.get("name");
    String description = dishMap.get("description");
    return dishService.create(name, price, description, typeId);
  }

  @PutMapping("/dish/{id}")
  public Dish update(@PathVariable Long id, @RequestBody HashMap<String, String> dishMap) {
    Long typeId = Long.parseLong(dishMap.get("typeId"));
    Double price = Double.parseDouble(dishMap.get("price"));
    String name = dishMap.get("name");
    String description = dishMap.get("description");
    return dishService.updateDishById(id, name, price, description, typeId);
  }

  @DeleteMapping("/dish/{id}")
  public HashMap<String, String> delete(@PathVariable Long id) {
    return dishService.deleteById(id);
  }
}
