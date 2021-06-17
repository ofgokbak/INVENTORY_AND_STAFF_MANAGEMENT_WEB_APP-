package org.example.inventory.dto;

public class ProductDto {
    private String barcode;
    private String title;
    private String description;
    private double weight;
    private String vendor;
    private String department;

    public ProductDto() {
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "ProductDto{" +
                "barcode='" + barcode + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", weight=" + weight +
                ", vendor='" + vendor + '\'' +
                ", department='" + department + '\'' +
                '}';
    }
}
