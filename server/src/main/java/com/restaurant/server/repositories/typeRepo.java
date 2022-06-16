package com.restaurant.server.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.server.models.Type;
@Repository
public interface typeRepo extends CrudRepository<Type, Long>{
  List<Type> findAll();
}
