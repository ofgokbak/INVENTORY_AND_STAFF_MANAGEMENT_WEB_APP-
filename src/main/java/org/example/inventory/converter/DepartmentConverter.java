package org.example.inventory.converter;

import org.example.inventory.dto.DepartmentDto;
import org.example.inventory.model.Department;
import org.example.inventory.service.EmployeeService;
import org.example.inventory.service.ProductService;
import org.springframework.stereotype.Component;

@Component
public class DepartmentConverter {

    private final EmployeeService employeeService;
    private final ProductService productService;

    public DepartmentConverter(EmployeeService employeeService, ProductService productService) {
        this.employeeService = employeeService;
        this.productService = productService;
    }

    public Department fromDtoToEntity(DepartmentDto departmentDto)
    {
        Department department = new Department();
        department.setId(departmentDto.getId());
        department.setName(departmentDto.getName());
        department.setEmployees(employeeService.getEmployeesByDepartment(departmentDto.getName()));
        department.setProducts(productService.getProductsByDepartment(departmentDto.getName()));

        return department;
    }

    public DepartmentDto fromEntityToDto(Department department)
    {
        DepartmentDto departmentDto = new DepartmentDto();
        departmentDto.setId(department.getId());
        departmentDto.setName(department.getName());
        departmentDto.setEmployees(department.getEmployees().size());
        departmentDto.setProducts(department.getProducts().size());

        return departmentDto;
    }

}
