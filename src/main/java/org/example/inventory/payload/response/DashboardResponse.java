package org.example.inventory.payload.response;

public class DashboardResponse {
    private  int departments;
    private int pallets;
    private int products;
    private int employees;

    public DashboardResponse(int departments, int pallets, int products, int employees) {
        this.departments = departments;
        this.pallets = pallets;
        this.products = products;
        this.employees = employees;
    }

    public int getDepartments() {
        return departments;
    }

    public int getPallets() {
        return pallets;
    }

    public int getProducts() {
        return products;
    }

    public int getEmployees() {
        return employees;
    }

    @Override
    public String toString() {
        return "DashboardResponse{" +
                "departments=" + departments +
                ", pallets=" + pallets +
                ", products=" + products +
                ", employees=" + employees +
                '}';
    }
}
