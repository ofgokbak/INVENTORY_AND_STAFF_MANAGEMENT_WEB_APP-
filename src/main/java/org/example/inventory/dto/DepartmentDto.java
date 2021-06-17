package org.example.inventory.dto;


public class DepartmentDto {
    private int id;
    private String name;
    private int employees;
    private int products;

    public DepartmentDto() {
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getEmployees() {
        return employees;
    }

    public int getProducts() {
        return products;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmployees(int employees) {
        this.employees = employees;
    }

    public void setProducts(int products) {
        this.products = products;
    }
}
