package org.example.inventory.dto;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PalletDto {
    private int id;
    private String description;
    private String location;
    private String department;
    private List<ProductCollectionDto> collections;
    private List<LogDto> logs;

    public PalletDto() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<ProductCollectionDto> getCollections() {
        return collections;
    }

    public void setCollections(List<ProductCollectionDto> collections) {
        this.collections = collections;
    }

    public List<LogDto> getLogs() {
        return logs;
    }

    public void setLogs(List<LogDto> logs) {
        this.logs = logs;
    }

}
