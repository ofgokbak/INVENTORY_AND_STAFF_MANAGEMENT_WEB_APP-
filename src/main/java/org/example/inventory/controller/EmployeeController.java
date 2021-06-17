package org.example.inventory.controller;

import org.example.inventory.converter.EmployeeConverter;
import org.example.inventory.model.Employee;
import org.example.inventory.payload.request.NewPasswordRequest;
import org.example.inventory.service.EmployeeService;
import org.example.inventory.dto.EmployeeDto;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("employees")
@RestController
@CrossOrigin("http://localhost:3000")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final EmployeeConverter employeeConverter;

    public EmployeeController(EmployeeService employeeService, EmployeeConverter employeeConverter) {
        this.employeeService = employeeService;
        this.employeeConverter = employeeConverter;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Employee addNewEmployee(@Valid @NonNull @RequestBody EmployeeDto employeeDto) {
        return employeeService.addEmployee(employeeConverter.fromDtoToEntity(employeeDto));


    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        List<EmployeeDto> employeeDtoList = new ArrayList<>();
        employees.forEach(employee -> employeeDtoList.add(employeeConverter.fromEntityToDto(employee)));
        return employeeDtoList;
    }

    @GetMapping(path = "/department/{name}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<EmployeeDto> getEmployeesByDepartment(@PathVariable("name") String name) {
        List<Employee> employees = employeeService.getEmployeesByDepartment(name);
        List<EmployeeDto> employeeDtoList = new ArrayList<>();
        employees.forEach(employee -> employeeDtoList.add(employeeConverter.fromEntityToDto(employee)));
        return employeeDtoList;
    }

    @GetMapping(path = "/search/{term}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<EmployeeDto> getEmployeesBySearchTerm(@PathVariable("term") String term) {
        List<EmployeeDto> employeeDtoList = new ArrayList<>();
        List<Employee> employees = employeeService.getEmployeesBySearchTerm(term);
        if (employees.size() != 0)
            employees.forEach(employee -> employeeDtoList.add(employeeConverter.fromEntityToDto(employee)));

        return employeeDtoList;
    }


    @GetMapping(path = "{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public EmployeeDto getEmployeeById(@PathVariable("id") int id) {

        Employee emp = employeeService.getEmployeeById(id);
        return employeeConverter.fromEntityToDto(emp);

    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteEmployee(@PathVariable("id") int id) {
        employeeService.deleteEmployee(id);
    }

    @PutMapping(path = "{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public void updateEmployee(@Valid @NonNull @RequestBody EmployeeDto employeeDto, @PathVariable("id") int id) {
        Employee emp = employeeConverter.fromDtoToEntity(employeeDto);
        emp.setId(id);
        employeeService.updateEmployee(emp);
    }

    @PutMapping(path = "/{id}/newPassword")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public String updatePassword(@Valid @NonNull @RequestBody NewPasswordRequest newPasswordRequest, @PathVariable("id") int id) {
        if (employeeService.updatePassword(id, newPasswordRequest)) {
            return "Password is updated.";
        } else {
            return "Invalid current password.";
        }
    }

}