//package org.example.inventory.service;
//
//import org.example.inventory.dao.DepartmentDao;
//import org.example.inventory.dao.EmployeeDao;
//import org.example.inventory.model.Department;
//import org.example.inventory.model.Employee;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.mockito.ArgumentMatchers.eq;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//class EmployeeServiceTest {
//
//    @Autowired
//    private EmployeeService service;
//
//    @MockBean
//    private EmployeeDao repo;
//
//    @MockBean
//    private DepartmentDao departmentRepo;
//
//
//    @Test
//    void addEmployee() {
//
//        Department department = new Department();
//        department.setId(1);
//        department.setName("test");
//
//
//        Employee employee = new Employee();
//        employee.setId(1);
//        employee.setName("Bob Marley");
//        employee.setEmail("bobMarley@icloud.com");
//        employee.setDepartment(department);
//        employee.setRole("ROLE_ADMIN");
//
//        Mockito.when(repo.findTopByOrderByIdDesc()).thenReturn(employee);
//        assertThat(service.addEmployee(employee)).isEqualTo(employee);
//    }
//
//    @Test
//    void getAllEmployees() {
//        Department department = new Department();
//        department.setId(1);
//        department.setName("test");
//
//
//        Employee employee = new Employee();
//        employee.setId(1);
//        employee.setName("Bob Marley");
//        employee.setEmail("bobMarley@icloud.com");
//        employee.setDepartment(department);
//        employee.setRole("ROLE_ADMIN");
//
//        Employee employee2 = new Employee();
//        employee2.setId(2);
//        employee2.setName("John Biden");
//        employee2.setEmail("jBiden@icloud.com");
//        employee2.setDepartment(department);
//        employee.setRole("ROLE_ADMIN");
//
//        List<Employee> employeeList = new ArrayList<>();
//        employeeList.add(employee);
//        employeeList.add(employee2);
//
//        Mockito.when(repo.findAll()).thenReturn(employeeList);
//        assertThat(service.getAllEmployees()).isEqualTo(employeeList);
//    }
//
//    @Test
//    void getEmployeesByDepartment() {
//        Department department = new Department();
//        department.setId(1);
//        department.setName("test");
//
//
//        Employee employee = new Employee();
//        employee.setId(1);
//        employee.setName("Bob Marley");
//        employee.setEmail("bobMarley@icloud.com");
//        employee.setDepartment(department);
//        employee.setRole("ROLE_ADMIN");
//
//        List<Employee> employeeList = new ArrayList<>();
//        employeeList.add(employee);
//
//        Mockito.when(repo.findByDepartmentName("test")).thenReturn(employeeList);
//        assertThat(service.getEmployeesByDepartment("test")).isEqualTo(employeeList);
//
//    }
//
//    @Test
//    void getEmployeeById() {
//        Department department = new Department();
//        department.setId(1);
//        department.setName("test");
//
//
//        Employee employee = new Employee();
//        employee.setId(1);
//        employee.setName("Bob Marley");
//        employee.setEmail("bobMarley@icloud.com");
//        employee.setDepartment(department);
//        employee.setRole("ROLE_ADMIN");
//
//
//        Mockito.when(repo.findById(1)).thenReturn(java.util.Optional.of(employee));
//        assertThat(service.getEmployeeById(1)).isEqualTo(employee);
//    }
//
//    @Test
//    void deleteEmployee() {
//        int empId = 4;
//
//        // perform the call
//        service.deleteEmployee(empId);
//
//        // verify the mocks
//        verify(repo, times(1)).deleteById(eq(empId));
//
//    }
//
//    @Test
//    void updateEmployee() {
//        Department department = new Department();
//        department.setId(1);
//        department.setName("test");
//
//
//        Employee employee = new Employee();
//        employee.setId(1);
//        employee.setName("Bob Marley");
//        employee.setEmail("bobMarley@icloud.com");
//        employee.setPassword("test");
//        employee.setDepartment(department);
//        employee.setRole("ROLE_ADMIN");
//
//        department.getEmployees().add(employee);
//
//        Mockito.when(departmentRepo.save(department)).thenReturn(department);
//        Mockito.when(repo.findTopByOrderByIdDesc()).thenReturn(employee);
//        assertThat(service.addEmployee(employee)).isEqualTo(employee);
//
//        employee.setName("John Wick");
//        employee.setEmail("johnWick@icloud.com");
//
//        Mockito.when(repo.save(employee)).thenReturn(employee);
//        assertThat(service.updateEmployee(employee)).isEqualTo(employee);
//
//
//    }
//}