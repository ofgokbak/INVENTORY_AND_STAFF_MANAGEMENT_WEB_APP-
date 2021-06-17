//package org.example.inventory.service;
//
//import org.example.inventory.dao.DepartmentDao;
//import org.example.inventory.model.Department;
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
//class DepartmentServiceTest {
//
//
//    @Autowired
//    private DepartmentService service;
//
//    @MockBean
//    private DepartmentDao repo;
//
//
//    @Test
//    void addDepartment() {
//        Department department = new Department();
//        department.setId(1);
//        department.setName("test");
//
//        Mockito.when(repo.save(department)).thenReturn(department);
//        assertThat(service.addDepartment(department)).isEqualTo(department);
//    }
//
//    @Test
//    void getAllDepartments() {
//
//        Department department = new Department();
//        department.setId(1);
//        department.setName("test");
//
//        Department department2 = new Department();
//        department.setId(2);
//        department.setName("test2");
//
//        List<Department> departmentList = new ArrayList<>();
//        departmentList.add((department));
//        departmentList.add((department2));
//
//        Mockito.when(repo.findAll()).thenReturn(departmentList);
//        assertThat(service.getAllDepartments()).isEqualTo(departmentList);
//
//    }
//
//    @Test
//    void getDepartmentById() {
//        Department department = new Department();
//        department.setId(1);
//        department.setName("test");
//
//        Mockito.when(repo.findById(1)).thenReturn(java.util.Optional.of(department));
//        assertThat(service.getDepartmentById(1)).isEqualTo(department);
//    }
//
//
//    @Test
//    void getDepartmentByName() {
//
//        Department department = new Department();
//        department.setId(1);
//        department.setName("test");
//
//        Mockito.when(repo.findByName("test")).thenReturn(department);
//        assertThat(service.getDepartmentByName("test")).isEqualTo(department);
//    }
//
//    @Test
//    void deleteDepartment() {
//        int depId = 4;
//        // perform the call
//        service.deleteDepartment(depId);
//        // verify the mocks
//        verify(repo, times(1)).deleteById(eq(depId));
//    }
//
//    @Test
//    void updateDepartment() {
//        Department department = new Department();
//        department.setId(1);
//        department.setName("test");
//
//        Mockito.when(repo.save(department)).thenReturn(department);
//        assertThat(service.addDepartment(department)).isEqualTo(department);
//
//        Department updatedDepartment = new Department();
//        updatedDepartment.setId(1);
//        updatedDepartment.setName("newName");
//
//        Mockito.when(repo.save(updatedDepartment)).thenReturn(updatedDepartment);
//        assertThat(service.updateDepartment(updatedDepartment)).isEqualTo(updatedDepartment);
//
//    }
//}