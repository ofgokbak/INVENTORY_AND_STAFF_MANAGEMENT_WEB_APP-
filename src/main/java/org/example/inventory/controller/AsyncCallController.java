package org.example.inventory.controller;

import org.example.inventory.model.Department;
import org.example.inventory.model.Employee;
import org.example.inventory.model.Pallet;
import org.example.inventory.model.Product;
import org.example.inventory.payload.response.DashboardResponse;
import org.example.inventory.service.AsyncCallService;
import org.example.inventory.service.DepartmentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.WebAsyncTask;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
public class AsyncCallController {

    private final AsyncCallService service;
    private final DepartmentService departmentService;

    public AsyncCallController(AsyncCallService service, DepartmentService departmentService) {
        this.service = service;
        this.departmentService = departmentService;
    }

    @GetMapping(value = "/dashboard/{id}", produces = "application/json")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public DashboardResponse getAdminDashboard(@PathVariable("id") String name) throws ExecutionException, InterruptedException {

        DashboardResponse response;
        if(!name.equals("Administration"))
        {
            List<Integer> numbers = departmentService.getDepartmentDetailsByName(name);
            response = new DashboardResponse(0,numbers.get(0), numbers.get(1),0);


        }else
        {

            CompletableFuture<List<Product>>  products = service.getAllProducts();
            CompletableFuture<List<Pallet>> pallets = service.getAllPallets();
            CompletableFuture<List<Department>> departments = service.getAllDepartments();
            CompletableFuture<List<Employee>> employees = service.getAllEmployees();

            CompletableFuture.allOf(products, pallets, departments, employees).join();
            response = new DashboardResponse(departments.get().size(), pallets.get().size(), products.get().size(), employees.get().size());
        }
        return response;

    }

    @GetMapping("/hello")
    public WebAsyncTask sayHello(@RequestParam(defaultValue="Demo user") String name){
        System.out.println("service start...");
        WebAsyncTask task = new WebAsyncTask(4000, () -> {
            System.out.println("task execution start...");
            int waitSeconds = 2;
            if("timeout".equals(name)) {
                waitSeconds = 5;
            }
            Thread.sleep(waitSeconds * 1000);
            if("error".equals(name)) {
                throw new RuntimeException("Manual exception at runtime");
            }
            System.out.println("task execution end...");
            return "Welcome "+name+"!";
        });
        task.onTimeout(()->{
            System.out.println("onTimeout...");
            return "Request timed out...";
        });
        task.onError(()->{
            System.out.println("onError...");
            return "Some error occurred...";
        });
        task.onCompletion(()->{
            System.out.println("onCompletion...");
        });
        System.out.println("service end...");
        return task;
    }

}
