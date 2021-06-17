package org.example.inventory.dao;

import org.example.inventory.model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeDao extends CrudRepository<Employee, Integer> {

    List<Employee> findByDepartmentName(String departmentName);
    Optional<Employee> findByEmail(String email);
    List<Employee> findByEmailContains(String term);
    List<Employee> findByNameContains(String term);
    Employee findTopByOrderByIdDesc();
}