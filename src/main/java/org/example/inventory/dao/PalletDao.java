package org.example.inventory.dao;

import org.example.inventory.model.Pallet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PalletDao extends CrudRepository<Pallet, Integer> {

    List<Pallet> findByDepartment_Name(String departmentName);

    Pallet findTopByOrderByIdDesc();

}