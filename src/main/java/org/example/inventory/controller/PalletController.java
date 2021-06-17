package org.example.inventory.controller;

import org.example.inventory.converter.LogConverter;
import org.example.inventory.converter.PalletConverter;
import org.example.inventory.converter.ProductCollectionConverter;
import org.example.inventory.dto.LogDto;
import org.example.inventory.dto.PalletDto;
import org.example.inventory.dto.ProductCollectionDto;
import org.example.inventory.model.Pallet;
import org.example.inventory.model.ProductCollection;
import org.example.inventory.service.PalletService;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("pallets")
@RestController
@CrossOrigin("http://localhost:3000")
public class PalletController {
    private final PalletService palletService;

    private final PalletConverter converter;
    private final ProductCollectionConverter productCollectionConverter;
    private final LogConverter logConverter;

    public PalletController(PalletService palletService, PalletConverter converter, ProductCollectionConverter productCollectionConverter, LogConverter logConverter) {
        this.palletService = palletService;
        this.converter = converter;
        this.productCollectionConverter = productCollectionConverter;
        this.logConverter = logConverter;
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public Pallet addPallet(@Valid @NonNull @RequestBody PalletDto palletDto) {
        return palletService.addPallet(converter.fromDtoToEntity(palletDto));
    }

    @GetMapping
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public List<PalletDto> getAllPallets() {
        List<PalletDto> palletDtoList = new ArrayList<>();
        List<Pallet> palletList = palletService.getAllPallets();
        palletList.forEach(pallet -> palletDtoList.add(converter.fromEntityToDto(pallet)));
        return palletDtoList;
    }

    @GetMapping(path = "/collections")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public List<PalletDto> getPalletsByProduct(@RequestParam(value = "barcode") String  barcode) {

        List<PalletDto> palletDtoList = new ArrayList<>();
        List<Pallet> palletList = palletService.getPalletsByProduct(barcode);
        palletList.forEach(pallet -> palletDtoList.add(converter.fromEntityToDto(pallet)));
        return palletDtoList;
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public PalletDto getPalletById(@PathVariable("id") int palletId) {
        return converter.fromEntityToDto(palletService.getPallet(palletId));
    }

    @GetMapping("/{id}/logs")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public List<LogDto> getLogsByPallet(@PathVariable("id") int palletId) {
        List<LogDto> logDtoList = new ArrayList<>();
        palletService.getAllLogsByPallet(palletId).forEach(log -> logDtoList.add(logConverter.fromEntityToDto(log)));
        return logDtoList;
    }

    @GetMapping(path = "/department")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public List<PalletDto> getPalletsByDepartment(@RequestParam(value = "name") String name) {
        List<PalletDto> palletDtoList = new ArrayList<>();
        palletService.getPalletsByDepartment(name).forEach(pallet -> palletDtoList.add(converter.fromEntityToDto(pallet)));
        return palletDtoList;
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public String deletePallet(@PathVariable("id") int palletId) {
        return palletService.deletePallet(palletId);
    }

    @PutMapping(path = "{id}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public PalletDto updatePallet(@Valid @NonNull @RequestBody PalletDto palletDto) {
        Pallet palletToUpdate = converter.fromDtoToEntity(palletDto);
      Pallet updatedPallet = palletService.updatePallet(palletToUpdate);
        return converter.fromEntityToDto(updatedPallet);
    }

    @PostMapping(path = "{id}/newCollection")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public PalletDto addNewCollection(@Valid @NonNull @RequestBody ProductCollectionDto productCollectionDto,@PathVariable("id") int palletId ) {
        ProductCollection productCollection = productCollectionConverter.fromDtoToEntity(productCollectionDto);
        Pallet updatedPallet = palletService.updateCollections(palletId,productCollection);
        return converter.fromEntityToDto(updatedPallet);
    }

    @PutMapping(path = "{id}/collection")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public PalletDto updatePalletCollection(@PathVariable("id") int palletId, @RequestParam(value = "id") String CollectionId, @Valid @NonNull @RequestBody int newQuantity) {
        int collectionID = Integer.parseInt(CollectionId);
        Pallet updatedPallet = palletService.updateCollection(palletId,collectionID,newQuantity);
        return converter.fromEntityToDto(updatedPallet);
    }
}