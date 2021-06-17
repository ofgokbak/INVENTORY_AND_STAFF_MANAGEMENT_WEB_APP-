package org.example.inventory.controller;

import org.example.inventory.model.Employee;
import org.example.inventory.payload.request.LoginRequest;
import org.example.inventory.payload.response.JwtResponse;
import org.example.inventory.security.UserDetailsImpl;
import org.example.inventory.service.EmployeeService;
import org.example.inventory.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("api/auth")
@RestController
//@CrossOrigin("http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final EmployeeService service;

    private final JwtUtil jwtUtil;

    public AuthenticationController(AuthenticationManager authenticationManager, EmployeeService service, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    public boolean checkAuthorizedDepartment(String departmentName)
    {
        String email = jwtUtil.getEmail();
        Employee emp = service.getEmployeeByEmail(email);
        return(emp.getDepartment().getName().equals(departmentName));
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                roles, userDetails.getDepartment()));
    }

//    @PostMapping("/signup")
//    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
//
//        if (employeeRepository.existsByEmail(signUpRequest.getEmail())) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(new MessageResponse("Error: Email is already in use!"));
//        }
//
//        // Create new user's account
//        Employee employee = new Employee(signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()));
//
//        Department department = departmentRepository.findByName("test");
//        employee.setDepartment(department);
//        String employeeRole = signUpRequest.getRole();
//        if(employeeRole == null)
//        {
//            employeeRole = "ROLE_EMPLOYEE";
//        }
//        employee.setRole(employeeRole);
//        department.getEmployees().add(employee);
//        departmentRepository.save(department);
//        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
//    }

}