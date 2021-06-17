package org.example.inventory.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.*;

@Entity
public class Pallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String description;
    private String location;
    @ManyToOne
    private Department department;
    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "pallet")
    private List<Log> logs = new List<Log>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductCollection> collections = new ArrayList<>();

    public Pallet() {
        // default constructor
    }

    public Pallet(int id) {
        this.id = id;
    }

    public void setLogs(List<Log> logs) {
        this.logs = logs;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public List<ProductCollection> getCollections() {
        return collections;
    }

    public void setCollections(List<ProductCollection> collections) {
        this.collections = collections;
    }

    public void addCollectionLog(ProductCollection collection) {
        Log newOne = new Log(this, collection.getProduct(), collection.getQuantity(), LogType.ADDED);
        this.logs.add(newOne);
    }

    public boolean collectionExist(String productBarcode) {
        return collections.stream().anyMatch(col -> col.getProduct().getBarcode().equals(productBarcode));
    }

    public void addUpdatedCollectionLogs(ProductCollection collectionToUpdate) {
        String productBarcode = collectionToUpdate.getProduct().getBarcode();
        ProductCollection collection = collections.stream().filter(c -> c.getProduct().getBarcode().equals(productBarcode)).findFirst().orElse(null);
        if (collection != null) {
            if (collection.getQuantity() > collectionToUpdate.getQuantity()) {
                int quantityToIncrease = collection.getQuantity() - collectionToUpdate.getQuantity();
                this.logs.add(new Log(this, collection.getProduct(), quantityToIncrease, LogType.REMOVED));
            } else if(collection.getQuantity() < collectionToUpdate.getQuantity()){
                int quantityToReduce = collectionToUpdate.getQuantity() - collection.getQuantity();
                this.logs.add(new Log(this, collection.getProduct(), quantityToReduce, LogType.ADDED));
            }
        }
    }

    public String getDescription() { return description;
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

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<Log> getLogs() {
        return logs;
    }

    public ProductCollection getCollectionByProduct(String productBarcode) {
        return collections.stream().filter(collection -> collection.getProduct().getBarcode().equals(productBarcode)).findFirst().orElse(null);
    }

}