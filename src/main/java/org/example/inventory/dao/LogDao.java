package org.example.inventory.dao;

import org.example.inventory.model.Log;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogDao extends CrudRepository<Log, Integer> {
    List<Log> findByProductBarcode(String productBarcode);

    List<Log> findByDateAndProductBarcode(String date, String barcode);

    List<Log> findByPalletId(int id);

    boolean existsAllByPalletId(int id);

    List<Log> findByDate(String date);
}