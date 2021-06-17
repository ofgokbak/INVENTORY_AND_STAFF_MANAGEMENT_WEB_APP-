package org.example.inventory.service;

import org.example.inventory.dao.LogDao;
import org.example.inventory.dao.ProductCollectionDao;
import org.example.inventory.model.Log;
import org.example.inventory.model.Pallet;
import org.example.inventory.model.ProductCollection;
import org.example.inventory.dao.PalletDao;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class PalletService {

    private final PalletDao palletDao;
    private final LogDao logDao;
    private final ProductCollectionDao productCollectionDao;

    public PalletService(PalletDao palletDao, LogDao logDao, ProductCollectionDao productCollectionDao) {
        this.palletDao = palletDao;
        this.logDao = logDao;
        this.productCollectionDao = productCollectionDao;
    }


    public Pallet addPallet(Pallet pallet) {
        //update pallet again on the database
        return palletDao.save(pallet);
    }


    public Pallet getPallet(int id) {
        return palletDao.findById(id).orElse(null);
    }


    public List<Pallet> getAllPallets() {
        List<Pallet> pallets = new ArrayList<>();
        palletDao.findAll().forEach(pallets::add);
        return pallets;
    }

    public List<Pallet> getPalletsByDepartment(String departmentName) {
        return palletDao.findByDepartment_Name(departmentName);
    }

    public List<Log> getAllLogsByPallet(int palletId) {
        return logDao.findByPalletId(palletId);
    }

    public List<Pallet> getPalletsByProduct(String productBarcode) {
        List<Pallet> palletList = new ArrayList<>();
        getAllPallets().forEach(pallet -> {
            if (pallet.collectionExist(productBarcode)) {
                palletList.add(pallet);
            }
        });
        return palletList;
    }

    public Pallet updateCollection(int palletId, int collectionID, int newQuantity) {
        Pallet palletToUpdate = getPallet(palletId);

        ProductCollection collectionToUpdate = new ProductCollection();
        ProductCollection existedOne = palletToUpdate.getCollections().stream().filter(productCollection -> productCollection.getId()==collectionID).findFirst().orElse(null);
        collectionToUpdate.setId(existedOne.getId());
        collectionToUpdate.setProduct(existedOne.getProduct());
        collectionToUpdate.setQuantity(newQuantity);
        collectionToUpdate.setMaxCapacity(existedOne.getMaxCapacity());

        palletToUpdate.addUpdatedCollectionLogs(collectionToUpdate);
        if(newQuantity == 0){
            palletToUpdate.getCollections().removeIf(productCollection -> productCollection.getId()==collectionToUpdate.getId());
            productCollectionDao.delete(Objects.requireNonNull(productCollectionDao.findById(collectionToUpdate.getId()).orElse(null)));
        }
        else{
            productCollectionDao.save(collectionToUpdate);
        }

        return palletDao.save(palletToUpdate);
    }
    public Pallet updateCollections(int palletId, ProductCollection collection) {
        Pallet palletToUpdate = getPallet(palletId);

        palletToUpdate.addCollectionLog(collection);
        if(palletToUpdate.getCollections()!= null)
        {
            palletToUpdate.getCollections().add(collection);
        }
        else
        {
            palletToUpdate.setCollections(new ArrayList<>(Arrays.asList(collection)));
        }

        return palletDao.save(palletToUpdate);
    }



    public Pallet updatePallet(Pallet pallet) {

        int palletID = pallet.getId();
        Pallet palletInDataBase = getPallet(palletID);
        if(palletInDataBase!= null)
        {
            palletInDataBase.setDescription(pallet.getDescription());
            palletInDataBase.setLocation(pallet.getLocation());
            palletInDataBase.setDepartment(pallet.getDepartment());
//            List<ProductCollection> collectionsToUpdate = pallet.getCollections();
//
//            List<ProductCollection> collectionsToDelete = new ArrayList<>();
//
//            for (ProductCollection collection : collectionsToUpdate) {
//                if (palletInDataBase.collectionExist(collection.getProduct().getBarcode())) {
//                    ProductCollection collectionToCompare = palletInDataBase.getCollectionByProduct(collection.getProduct().getBarcode());
//                    pallet.addUpdatedCollectionLogs(collectionToCompare);
//                    if (collection.getQuantity() == 0)
//                        collectionsToDelete.add(collection);
//                } else {
//                    pallet.addCollectionLog(collection);
//                }
//            }
//            pallet.getCollections().removeAll(collectionsToDelete);
            return palletDao.save(palletInDataBase);
        }
            return new Pallet(-1);
    }


    public String deletePallet(int palletID) {
        if (getPallet(palletID) != null) {
            palletDao.deleteById(palletID);
            return "Pallet was deleted successfully";
        }
        else{
            return "Invalid Pallet id";
        }
    }


}