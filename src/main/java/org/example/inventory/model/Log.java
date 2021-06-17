package org.example.inventory.model;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private Product product;
    @JsonBackReference
    @ManyToOne
    private Pallet pallet;
    private int amount;

    private String date;
    private LogType logType;

    public Log(Pallet pallet, Product product, int amount, LogType logType) {
        this.product = product;
        this.amount = amount;
        this.pallet = pallet;
        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        this.date = formatter.format(now);
        this.logType = logType;
    }

    public Log() {
        // default constructor
    }

    public Log(int logId, Product product, Pallet pallet, int quantity, String s, LogType added) {
        this.id =logId;
        this.product = product;
        this.pallet = pallet;
        this.amount = quantity;
        this.date=s;
        this.logType = added;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public Product getProduct() { return product; }

    public void setProduct(Product product) { this.product = product; }

    public Pallet getPallet() {
        return pallet;
    }


    public void setPallet(Pallet pallet) {
        this.pallet = pallet;
    }

    public int getAmount() {
        return amount;
    }

    public LogType getLogType() {
        return logType;
    }


    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setLogType(LogType logType) {
        this.logType = logType;
    }

}