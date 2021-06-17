package org.example.inventory.controller;

import org.example.inventory.converter.DepartmentConverter;
import org.example.inventory.model.Department;
import org.example.inventory.model.Employee;
import org.example.inventory.model.Product;
import org.example.inventory.service.DepartmentService;
import org.example.inventory.service.EmployeeService;
import org.example.inventory.service.ProductService;
import org.example.inventory.dto.DepartmentDto;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("departments")
@RestController
@CrossOrigin("http://localhost:3000")
public class DepartmentController {
    private final DepartmentService departmentService;
    private final EmployeeService employeeService;
    private final ProductService productService;
    private final DepartmentConverter departmentConverter;

    public DepartmentController(DepartmentService departmentService, EmployeeService employeeService, ProductService productService, DepartmentConverter departmentConverter) {
        this.departmentService = departmentService;
        this.employeeService = employeeService;
        this.productService = productService;
        this.departmentConverter = departmentConverter;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Department addDepartment(@Valid @NonNull @RequestBody DepartmentDto departmentDto) {
        return departmentService.addDepartment(departmentConverter.fromDtoToEntity(departmentDto));
    }

    @GetMapping(path = "/department")
    @PreAuthorize("hasRole('ADMIN')")
    public Department getDepartmentByName(@RequestParam(value = "name") String name) {
        return departmentService.getDepartmentByName(name);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<DepartmentDto> getAllDepartments() {

        List<Department> departments = departmentService.getAllDepartments();
        List<DepartmentDto> departmentDtoList = new ArrayList<>();
        departments.forEach(department -> departmentDtoList.add(departmentConverter.fromEntityToDto(department)));
        return departmentDtoList;
    }


    @GetMapping(path = "{departmentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Department getDepartmentByID(@PathVariable("departmentId") int departmentId) {
        return departmentService.getDepartmentById(departmentId);
    }


    @GetMapping(path = "/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Employee> getEmployeesByDepartment(@RequestParam(value = "department") String name) {
        return employeeService.getEmployeesByDepartment(name);
    }


    @GetMapping(path = "/products")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public List<Product> getProductsByDepartment(@RequestParam(value = "department") String name) {
        return productService.getProductsByDepartment(name);
    }


    @DeleteMapping(path = "{departmentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteDepartment(@PathVariable("departmentId") int departmentId) {
        departmentService.deleteDepartment(departmentId);
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Department updateDepartment(@RequestBody DepartmentDto departmentDto) {

        return departmentService.updateDepartment(departmentConverter.fromDtoToEntity(departmentDto));
    }
}