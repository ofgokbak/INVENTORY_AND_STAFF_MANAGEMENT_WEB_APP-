package org.example.inventory.dao;

import org.example.inventory.model.ProductCollection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductCollectionDao extends CrudRepository<ProductCollection, Integer> {
}