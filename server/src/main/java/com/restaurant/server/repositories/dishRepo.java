package com.restaurant.server.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.server.models.Dish;
import com.restaurant.server.models.Type;

@Repository
public interface dishRepo extends CrudRepository<Dish, Long> {
  List<Dish> findAll();
  List<Dish> findAllByType(Type type);
}
