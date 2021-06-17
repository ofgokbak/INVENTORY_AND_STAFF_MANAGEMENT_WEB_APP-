package org.example.inventory.service;

import org.example.inventory.dao.DepartmentDao;
import org.example.inventory.dao.EmployeeDao;
import org.example.inventory.model.Department;
import org.example.inventory.model.Employee;
import org.example.inventory.payload.request.NewPasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeDao employeeDao;

    private final DepartmentDao departmentDao;

    private final PasswordEncoder encoder;

    @Autowired
    public EmployeeService(DepartmentDao departmentDao, EmployeeDao employeeDao, PasswordEncoder encoder) {
        this.employeeDao = employeeDao;
        this.departmentDao = departmentDao;
        this.encoder = encoder;
    }


    public Employee addEmployee(Employee emp) {
        if (checkEmployeeEmailUsage(emp.getEmail())) {
            return new Employee(0);
        }
        Department department = emp.getDepartment();
        department.getEmployees().add(emp);
        departmentDao.save(department);
        return employeeDao.findTopByOrderByIdDesc();

    }

    public List<Employee> getAllEmployees() {
        List<Employee> employees = new ArrayList<>();
        employeeDao.findAll().forEach(employees::add);
        return employees;
    }

    public List<Employee> getEmployeesByDepartment(String departmentName) {
        return employeeDao.findByDepartmentName(departmentName);
    }

    public Employee getEmployeeById(int employeeId) {
        return employeeDao.findById(employeeId).orElse(null);
    }

    private boolean checkEmployeeEmailUsage(String email) {
        Employee validEmployee = employeeDao.findByEmail(email).orElse(null);
        return validEmployee != null;
    }

    public void deleteEmployee(int id) {
        employeeDao.deleteById(id);
    }

    public Employee updateEmployee(Employee employeeToUpdate) {
        return employeeDao.save(employeeToUpdate);
    }

    public boolean updatePassword(int id, NewPasswordRequest newPasswordRequest) {
        Employee emp = getEmployeeById(id);
        if (encoder.matches(newPasswordRequest.getCurrentOne(), emp.getPassword())) {
            emp.setPassword(encoder.encode(newPasswordRequest.getNewOne()));
            employeeDao.save(emp);
            return true;
        }
        return false;
    }

    public Employee getEmployeeByEmail(String email) {
        return employeeDao.findByEmail(email).orElse(null);
    }

    public List<Employee> getEmployeeByNameContains(String term) {
        return employeeDao.findByNameContains(term);

    }

    public List<Employee> getEmployeeByEmailContains(String term) {
        return employeeDao.findByEmailContains(term);
    }
    private static boolean isNumeric(String strNum) {
        if (strNum == null) {
            return false;
        }
        try {
            Integer d = Integer.parseInt(strNum);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }

    public List<Employee> getEmployeesBySearchTerm(String term) {
        List<Employee> employeesToResultList = new ArrayList<>();

//        if (isNumeric(term)){
//            int id = Integer.parseInt(term);
//            if (getEmployeeById(id) != null)
//                employeesToResultList.add(getEmployeeById(id));
//        }
        if (getEmployeeByEmailContains(term) != null)
            getEmployeeByEmailContains(term).forEach(employee -> {
                if (!employeesToResultList.contains(employee)) {
                    employeesToResultList.add(employee);
                }
            });
        if (getEmployeeByNameContains(term) != null)
            getEmployeeByNameContains(term).forEach(employee -> {
                if (!employeesToResultList.contains(employee)) {
                    employeesToResultList.add(employee);
                }
            });

        return employeesToResultList;
    }
}