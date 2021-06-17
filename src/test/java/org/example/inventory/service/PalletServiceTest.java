//package org.example.inventory.service;
//
//import org.example.inventory.dao.LogDao;
//import org.example.inventory.dao.PalletDao;
//import org.example.inventory.model.*;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.eq;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//class PalletServiceTest {
//
//    @Autowired
//    private PalletService service;
//
//    @MockBean
//    private PalletDao repo;
//
//    @MockBean
//    private LogDao logRepo;
//
//
//    private Pallet fakePallet() {
//        Pallet fake = new Pallet();
//        fake.setId(1);
//        fake.setDescription("test");
//        fake.setDepartment(new Department(1, "mockDepartment"));
//        fake.setLocation("M-1");
//        List<ProductCollection> collections = new ArrayList<>();
//        ProductCollection prCol1 = new ProductCollection();
//        ProductCollection prCol2 = new ProductCollection();
//
//        prCol1.setProduct(new Product());
//        prCol1.getProduct().setBarcode("barcodePrCol1");
//        prCol2.setProduct(new Product());
//        prCol2.getProduct().setBarcode("barcodePrCol2");
//        prCol1.setQuantity(500);
//        prCol2.setQuantity(250);
//
//        collections.add(prCol1);
//        collections.add(prCol2);
//        fake.setCollections(collections);
//
//        return fake;
//    }
//
//    private Pallet fakePalletFromDatabase() {
//        Pallet fake = new Pallet();
//        fake.setId(1);
//        fake.setDescription("test");
//        fake.setDepartment(new Department(1, "mockDepartment"));
//        fake.setLocation("M-1");
//        List<ProductCollection> collections = new ArrayList<>();
//        ProductCollection prCol1 = new ProductCollection();
//        ProductCollection prCol2 = new ProductCollection();
//
//        prCol1.setId(1);
//        prCol2.setId(2);
//        prCol1.setProduct(new Product());
//        prCol1.getProduct().setBarcode("barcodePrCol1");
//        prCol2.setProduct(new Product());
//        prCol2.getProduct().setBarcode("barcodePrCol2");
//        prCol1.setQuantity(500);
//        prCol2.setQuantity(250);
//        prCol1.setMaxCapacity(500);
//        prCol2.setMaxCapacity(250);
//
//        collections.add(prCol1);
//        collections.add(prCol2);
//        fake.setCollections(collections);
//        fake.setLogs(fakeLogs(collections));
//
//        return fake;
//    }
//
//
//    private List<Log> fakeLogs(List<ProductCollection> collections) {
//        int logId = 0;
//        Pallet pallet = new Pallet();
//        pallet.setId(1);
//        List<Log> logs = new ArrayList<>();
//        for (ProductCollection collection : collections
//        ) {
//            Log newOne;
//            newOne = new Log(logId, collection.getProduct(), pallet, collection.getQuantity(), "2020-10-10", LogType.ADDED);
//            logs.add(newOne);
//            logId++;
//        }
//        return logs;
//    }
//
//
//    @Test
//    void addPallet() {
//        Pallet palletToAdd = fakePallet();
//        Pallet palletWithLogs = fakePalletFromDatabase();
//
//        Mockito.when(repo.findTopByOrderByIdDesc()).thenReturn(palletToAdd);
//        Mockito.when(repo.save(palletToAdd)).thenReturn(palletWithLogs);
//        assertThat(service.addPallet(palletToAdd)).isEqualTo(palletWithLogs);
//    }
//
//    @Test
//    void getPallet() {
//        Pallet pallet = fakePalletFromDatabase();
//
//        Mockito.when(repo.findById(pallet.getId())).thenReturn(java.util.Optional.of(pallet));
//        assertThat(service.getPallet(pallet.getId())).isEqualTo(pallet);
//    }
//
//    @Test
//    void getAllPallets() {
//        Pallet pallet1 = fakePalletFromDatabase();
//        Pallet pallet2 = fakePalletFromDatabase();
//        pallet2.setId(2);
//
//        List<Pallet> palletList = new ArrayList<>();
//        palletList.add(pallet1);
//        palletList.add(pallet2);
//
//        Mockito.when(repo.findAll()).thenReturn(palletList);
//        assertThat(service.getAllPallets()).isEqualTo(palletList);
//    }
//
//    @Test
//    void getPalletsByDepartment() {
//        List<Pallet> palletsOfDepartment = new ArrayList<>();
//        Pallet fake = fakePallet();
//        palletsOfDepartment.add(fake);
//
//        String departmentName = fake.getDepartment().getName();
//        Mockito.when(repo.findByDepartment_Name(departmentName)).thenReturn(palletsOfDepartment);
//        assertThat(service.getPalletsByDepartment(departmentName)).isEqualTo(palletsOfDepartment);
//
//    }
//
//    @Test
//    void updatePallet() {
//        Pallet palletToUpdate = fakePallet();
//        palletToUpdate.setDescription("newDescription");
//
//        Pallet pallet = fakePallet();
//        Mockito.when(repo.findById(1)).thenReturn(java.util.Optional.of(pallet));
//        Mockito.when(repo.save(palletToUpdate)).thenReturn(palletToUpdate);
//
//        assertThat(service.updatePallet(palletToUpdate)).isEqualTo(null);
//    }
//
//    @Test
//    void deletePallet() {
//        int palletId = 1;
//
//        // perform the call
//        Mockito.when(repo.findById(palletId)).thenReturn(java.util.Optional.of(new Pallet(1)));
//        service.deletePallet(palletId);
//        // verify the mocks
//        verify(repo, times(1)).deleteById(eq(palletId));
//    }
//
//    @Test
//    void getAllLogsByPallet() {
//
//        Log log1 = new Log();
//        Log log2 = new Log();
//        Log log3 = new Log();
//
//        Pallet pallet = new Pallet();
//        pallet.setId(1);
//
//        log1.setPallet(pallet);
//        log2.setPallet(pallet);
//        log3.setPallet(pallet);
//
//        List<Log> logList = new ArrayList<>();
//        logList.add(log1);
//        logList.add(log2);
//        logList.add(log3);
//
//        Mockito.when(logRepo.findByPalletId(1)).thenReturn(logList);
//        assertThat(service.getAllLogsByPallet(1)).isEqualTo(logList);
//
//    }
//
//    @Test
//    void getPalletsByProduct() {
//        Pallet pallet1 = new Pallet();
//        Pallet pallet2 = new Pallet();
//        Pallet pallet3 = new Pallet();
//
//        ProductCollection collection = new ProductCollection();
//        collection.setProduct(new Product());
//        collection.getProduct().setBarcode("QWEDFDT456902ER");
//        collection.setMaxCapacity(500);
//        collection.setQuantity(400);
//
//        pallet1.getCollections().add(collection);
//        pallet2.getCollections().add(collection);
//        pallet3.getCollections().add(collection);
//
//        List<Pallet> palletsByProduct = new ArrayList<>();
//        palletsByProduct.add(pallet1);
//        palletsByProduct.add(pallet2);
//        palletsByProduct.add(pallet3);
//
//        Mockito.when(repo.findAll()).thenReturn(palletsByProduct);
//        assertThat(service.getPalletsByProduct("QWEDFDT456902ER")).isEqualTo(palletsByProduct);
//
//    }
//}