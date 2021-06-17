package org.example.inventory.service;

import org.example.inventory.dao.LogDao;
import org.example.inventory.dao.ProductDao;
import org.example.inventory.model.Log;
import org.example.inventory.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductDao productDao;
    private final LogDao logDao;


    @Autowired
    public ProductService(ProductDao productDao, LogDao logDao) {
        this.productDao = productDao;
        this.logDao = logDao;
    }

    public Product addProduct(Product product) {
        if (getProductByBarcode(product.getBarcode()) != null)
            return new Product("inUse");
        return productDao.save(product);
    }

    public List<Product> getAllProducts() {

        List<Product> products = new ArrayList<>();
        productDao.findAll().forEach(products::add);
        return products;
    }

    public Product getProductByBarcode(String barcodeProduct) {
        return productDao.findById(barcodeProduct).orElse(null);
    }

    public List<Product> getProductsByDepartment(String departmentName) {
        return productDao.findByDepartment_Name(departmentName);
    }

    public List<Log> getLogsByProductBarcode(String productBarcode) {
        return logDao.findByProductBarcode(productBarcode);
    }

    public List<Log> getLogsByProductBarcodeAndDate(String productBarcode, String date) {
        return logDao.findByDateAndProductBarcode(date, productBarcode);
    }

    public void deleteProduct(String barcodeProduct) {
        productDao.deleteById(barcodeProduct);
    }

    public Product updateProduct(Product product) {
        return productDao.save(product);
    }


    public Product getProductByTitle(String productTitle) {
        return productDao.findByTitle(productTitle);
    }

    public List<Product> getProductByTitleContains(String productTitle) {
        return productDao.findByTitleContains(productTitle);
    }

    public List<Product> getProductsBySearch(String department, String term) {

        boolean isAdmin = department.equals("Administration");

        List<Product> productsToResultList = new ArrayList<>();
        if (getProductByBarcode(term) != null)
            productsToResultList.add(getProductByBarcode(term));

        if (getProductByTitleContains(term) != null)
            getProductByTitleContains(term).forEach(product -> {
                if (!productsToResultList.contains(product)) {
                    productsToResultList.add(product);
                }
            });
        if (getProductsByDepartment(term) != null)
            productsToResultList.addAll(getProductsByDepartment(term));

        if (getProductsByVendor(term) != null) {
            getProductsByVendor(term).forEach(product -> {
                if (!productsToResultList.contains(product)) {
                    productsToResultList.add(product);
                }
            });
        }

        if (!isAdmin) {
            return productsToResultList.stream().filter(product -> product.getDepartment().getName().equals(department)).collect(Collectors.toList());
        }

        return productsToResultList;
    }

    private List<Product> getProductsByVendor(String vendor) {
        return productDao.findByVendor(vendor);
    }
}