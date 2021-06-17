package org.example.inventory.dao;

import org.example.inventory.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao extends CrudRepository<Product, String> {

    List<Product> findByDepartment_Name(String departmentName);
    List<Product> findByVendor(String vendor);
    List<Product> findByTitleContains(String title);
    Product findByTitle(String title);
}