package org.example.inventory.converter;

import org.example.inventory.dto.EmployeeDto;
import org.example.inventory.model.Department;
import org.example.inventory.model.Employee;
import org.example.inventory.service.DepartmentService;
import org.example.inventory.service.EmployeeService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class EmployeeConverter {

    private final DepartmentService departmentService;
    private final PasswordEncoder encoder;
    private final EmployeeService employeeRepository;

    public EmployeeConverter(DepartmentService departmentService, PasswordEncoder encoder, EmployeeService employeeRepository) {
        this.departmentService = departmentService;
        this.encoder = encoder;
        this.employeeRepository = employeeRepository;
    }

    public Employee fromDtoToEntity(EmployeeDto employeeDto) {
        Employee emp = new Employee();
        emp.setId(employeeDto.getId());
        emp.setName(employeeDto.getName());
        emp.setEmail(employeeDto.getEmail());
        if (employeeDto.getPassword() != null) {
            emp.setPassword(encoder.encode(employeeDto.getPassword()));
        } else {
            String currentPassword = employeeRepository.getEmployeeById(emp.getId()).getPassword();
            emp.setPassword(currentPassword);
        }
        Department department = departmentService.getDepartmentByName(employeeDto.getDepartment());
        emp.setDepartment(department);
        if (employeeDto.getIsAdmin()) {
            emp.setRole("ROLE_ADMIN");
        } else {
            emp.setRole("ROLE_EMPLOYEE");
        }
        return emp;
    }

    public EmployeeDto fromEntityToDto(Employee emp) {
        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setId(emp.getId());
        employeeDto.setEmail(emp.getEmail());
        employeeDto.setName(emp.getName());
        employeeDto.setDepartment(emp.getDepartment().getName());
        employeeDto.setAdmin(emp.getRole().equals("ROLE_ADMIN"));
        return employeeDto;
    }
}
