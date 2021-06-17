//package org.example.inventory.service;
//
//import org.example.inventory.dao.LogDao;
//import org.example.inventory.dao.ProductDao;
//import org.example.inventory.model.*;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.mockito.ArgumentMatchers.eq;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//class ProductServiceTest {
//
//    @Autowired
//    ProductService service;
//
//    @MockBean
//    ProductDao repo;
//
//    @MockBean
//    LogDao logRepo;
//
//    private Product fakeProduct() {
//        Product product = new Product();
//        product.setBarcode("BLW983526323MN");
//        product.setTitle("washing machine");
//        product.setDescription("A++ energy cover, 16 programs and blue technology");
//        product.setDepartment(new Department(1, "Household"));
//        product.setVendor("Bosch");
//        product.setWeight(20);
//        return product;
//    }
//
//    @Test
//    void addProduct() {
//        Product product = fakeProduct();
//
//        Mockito.when(repo.save(product)).thenReturn(product);
//        assertThat(service.addProduct(product)).isEqualTo(product);
//    }
//
//    @Test
//    void getAllProducts() {
//        Product product1 = fakeProduct();
//        product1.setTitle("Fridge");
//        product1.setBarcode("LKM45439586743NM");
//
//        Product product2 = fakeProduct();
//
//        List<Product> productList = new ArrayList<>();
//        productList.add(product1);
//        productList.add(product2);
//
//        Mockito.when(repo.findAll()).thenReturn(productList);
//        assertThat(service.getAllProducts()).isEqualTo(productList);
//
//    }
//
//    @Test
//    void getProductByBarcode() {
//        Product product = fakeProduct();
//        String barcode = product.getBarcode();
//
//        Mockito.when(repo.findById(barcode)).thenReturn(java.util.Optional.of(product));
//        assertThat(service.getProductByBarcode(barcode)).isEqualTo(product);
//
//    }
//
//    @Test
//    void getProductsByDepartment() {
//        Product product = fakeProduct();
//        String departmentName = product.getDepartment().getName();
//
//        List<Product> productList = new ArrayList<>();
//        productList.add(product);
//
//        Mockito.when(repo.findByDepartment_Name(departmentName)).thenReturn(productList);
//        assertThat(service.getProductsByDepartment(departmentName)).isEqualTo(productList);
//    }
//
//    @Test
//    void getLogsByProductBarcode() {
//
//        Log log = new Log();
//
//        Pallet pallet = new Pallet();
//        pallet.setId(2);
//        Product product = new Product();
//        product.setBarcode("827371DISKS");
//        log.setPallet(pallet);
//        log.setProduct(product);
//        log.setAmount(200);
//        log.setDate("2020-11-10");
//        log.setLogType(LogType.ADDED);
//
//        Log log2 = new Log();
//
//        log2.setId(2);
//        pallet.setId(2);
//        product.setBarcode("827371DISKS");
//        log2.setPallet(pallet);
//        log2.setProduct(product);
//        log2.setAmount(200);
//        log2.setDate("2020-11-10");
//        log2.setLogType(LogType.REMOVED);
//
//        List<Log> logList = new ArrayList<>();
//
//        Mockito.when(logRepo.findByProductBarcode(log.getProduct().getBarcode())).thenReturn(logList);
//        assertThat(service.getLogsByProductBarcode(log2.getProduct().getBarcode())).isEqualTo(logList);
//
//    }
//
//    @Test
//    void deleteProduct() {
//
//        Product product = fakeProduct();
//        String productBarcode = product.getBarcode();
//
//        // perform the call
//        service.deleteProduct(productBarcode);
//
//        // verify the mocks
//        verify(repo, times(1)).deleteById(eq(productBarcode));
//    }
//
//    @Test
//    void updateProduct() {
//        Product product = fakeProduct();
//        product.setWeight(30);
//
//        Mockito.when(repo.save(product)).thenReturn(product);
//        assertThat(service.updateProduct(product)).isEqualTo(product);
//    }
//
//    @Test
//    void getLogsByProductBarcodeAndDate() {
//
//        Log log1 = new Log();
//        Log log2 = new Log();
//        String date = "2020-11-10";
//        String barcode = "827371DSKDSL";
//
//        Product product = new Product();
//        product.setBarcode(barcode);
//        log1.setProduct(product);
//        log1.setDate(date);
//        log2.setProduct(product);
//        log2.setDate(date);
//
//        List<Log> logList = new ArrayList<>();
//        logList.add(log1);
//        logList.add(log2);
//
//        Mockito.when(logRepo.findByDateAndProductBarcode(date, barcode)).thenReturn(logList);
//        assertThat(service.getLogsByProductBarcodeAndDate(barcode, date)).isEqualTo(logList);
//
//    }
//}