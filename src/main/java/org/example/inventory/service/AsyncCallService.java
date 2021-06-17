package org.example.inventory.service;

import org.example.inventory.dao.DepartmentDao;
import org.example.inventory.dao.EmployeeDao;
import org.example.inventory.dao.PalletDao;
import org.example.inventory.dao.ProductDao;
import org.example.inventory.model.Department;
import org.example.inventory.model.Employee;
import org.example.inventory.model.Pallet;
import org.example.inventory.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class AsyncCallService {
    private final DepartmentDao departmentRepo;
    private final ProductDao productRepo;
    private final EmployeeDao employeeRepo;
    private final PalletDao palletDao;

    private static final Logger log = LoggerFactory.getLogger(AsyncCallService.class);

    public AsyncCallService(DepartmentDao departmentRepo, ProductDao productRepo, EmployeeDao employeeRepo, PalletDao palletDao) {
        this.departmentRepo = departmentRepo;
        this.productRepo = productRepo;
        this.employeeRepo = employeeRepo;
        this.palletDao = palletDao;
    }

    @Async("taskExecutor")
    public CompletableFuture<List<Product>> getAllProducts() {

        long start = System.currentTimeMillis();
        List<Product> products = new ArrayList<>();
        productRepo.findAll().forEach(products::add);
        log.info("Total product = {} checked by "+ Thread.currentThread().getName(), products.size());
        long end = System.currentTimeMillis();
        log.info("Total time {}",(end-start));
        return CompletableFuture.completedFuture(products);
    }

    @Async("taskExecutor")
    public CompletableFuture<List<Pallet>> getAllPallets() {

        long start = System.currentTimeMillis();
        List<Pallet> pallets = new ArrayList<>();
        palletDao.findAll().forEach(pallets::add);
        log.info("Total pallet = {} checked by "+ Thread.currentThread().getName(), pallets.size());
        long end = System.currentTimeMillis();
        log.info("Total time {}",(end-start));
        return CompletableFuture.completedFuture(pallets);
    }

    @Async("taskExecutor")
    public CompletableFuture<List<Department>> getAllDepartments() {

        long start = System.currentTimeMillis();
        List<Department> departments = new ArrayList<>();
        departmentRepo.findAll().forEach(departments::add);
        log.info("Total department = {} checked by  "+ Thread.currentThread().getName(), departments.size());
        long end = System.currentTimeMillis();
        log.info("Total time {}",(end-start));
        return CompletableFuture.completedFuture(departments);
    }

    @Async("taskExecutor")
    public CompletableFuture<List<Employee>> getAllEmployees() {

        long start = System.currentTimeMillis();
        List<Employee> employees = new ArrayList<>();
        employeeRepo.findAll().forEach(employees::add);
        log.info("Total employee = {} checked by  "+ Thread.currentThread().getName(), employees.size());
        long end = System.currentTimeMillis();
        log.info("Total time {}",(end-start));
        return CompletableFuture.completedFuture(employees);
    }
}
