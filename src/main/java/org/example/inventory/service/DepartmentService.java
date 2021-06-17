package org.example.inventory.service;

import org.example.inventory.dao.DepartmentDao;
import org.example.inventory.dao.PalletDao;
import org.example.inventory.dao.ProductDao;
import org.example.inventory.model.Department;
import org.example.inventory.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentService {
    private final DepartmentDao departmentDao;
    private final EmployeeService employeeService;
    private final PalletDao palletRepository;
    private final ProductDao productRepository;

    @Autowired
    public DepartmentService(DepartmentDao departmentDao, EmployeeService employeeService, PalletDao palletRepository, ProductDao productRepository) {
        this.departmentDao = departmentDao;

        this.employeeService = employeeService;
        this.palletRepository = palletRepository;
        this.productRepository = productRepository;
    }

    public Department addDepartment(Department department) {
        if(getDepartmentByName(department.getName())!=null)
            return new Department(-1,"exist");
        return departmentDao.save(department);
    }


    public List<Department>getAllDepartments() {
        List<Department> departments = new ArrayList<>();
        departmentDao.findAll().forEach(departments::add);

        return departments;
    }

    public List<Integer> getDepartmentDetailsByName(String name) {
        int palletNumber = palletRepository.findByDepartment_Name(name).size();
        int productNumber = productRepository.findByDepartment_Name(name).size();
        List<Integer> numbers = new ArrayList<>();
        numbers.add(palletNumber);
        numbers.add(productNumber);
        return numbers;
    }

    public Department getDepartmentById(int id) {
        return departmentDao.findById(id).orElse(null);
    }

    public Department getDepartmentByName(String departmentName) {
        return departmentDao.findByName(departmentName);
    }

    public void deleteDepartment(int id) {
        departmentDao.deleteById(id);
    }

    public Department updateDepartment(Department department) {
        return departmentDao.save(department);
    }


}