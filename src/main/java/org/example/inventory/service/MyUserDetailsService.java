package org.example.inventory.service;

import org.example.inventory.dao.EmployeeDao;
import org.example.inventory.model.Employee;
import org.example.inventory.security.UserDetailsImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private final EmployeeDao employeeDao;

    public MyUserDetailsService(EmployeeDao employeeDao) {
        this.employeeDao = employeeDao;
    }


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Employee employee = employeeDao.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User Not Found with email: " + email));
        return UserDetailsImpl.build(employee);
    }
}