package com.restaurant.server.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.server.models.Order;

@Repository
public interface orderRepo extends CrudRepository<Order, Long>{
    
}
