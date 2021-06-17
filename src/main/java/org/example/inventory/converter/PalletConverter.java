package org.example.inventory.converter;

import org.example.inventory.dto.LogDto;
import org.example.inventory.dto.PalletDto;
import org.example.inventory.dto.ProductCollectionDto;
import org.example.inventory.model.Department;
import org.example.inventory.model.Pallet;
import org.example.inventory.model.ProductCollection;
import org.example.inventory.service.DepartmentService;
import org.example.inventory.service.PalletService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PalletConverter {
    private final DepartmentService departmentService;
    private final PalletService palletService;
    private final ProductCollectionConverter productCollectionConverter;
    private final LogConverter logConverter;

    public PalletConverter(DepartmentService departmentService, PalletService palletService, ProductCollectionConverter productCollectionConverter, LogConverter logConverter) {
        this.departmentService = departmentService;
        this.palletService = palletService;
        this.productCollectionConverter = productCollectionConverter;
        this.logConverter = logConverter;
    }

    public Pallet fromDtoToEntity(PalletDto palletDto) {
        Pallet pallet = new Pallet();
        pallet.setId(palletDto.getId());
        Department department = departmentService.getDepartmentByName(palletDto.getDepartment());
        pallet.setDepartment(department);
        pallet.setLocation(palletDto.getLocation());
        pallet.setDescription(palletDto.getDescription());
        List<ProductCollection> productCollectionList = new ArrayList<>();
        if (palletDto.getCollections()!=null) {
            palletDto.getCollections().forEach(productCollectionDto -> productCollectionList.add(productCollectionConverter.fromDtoToEntity(productCollectionDto)));
            System.out.println(productCollectionList);
        }
        pallet.setCollections(productCollectionList);
        Pallet palletFromDb = palletService.getPallet(palletDto.getId());
        if (palletFromDb != null)
        {
            pallet.setLogs(palletFromDb.getLogs());
        }
        return pallet;
    }

    public PalletDto fromEntityToDto(Pallet pallet) {

        PalletDto palletDto = new PalletDto();
        palletDto.setId(pallet.getId());
        palletDto.setDepartment(pallet.getDepartment().getName());
        palletDto.setDescription(pallet.getDescription());
        palletDto.setLocation(pallet.getLocation());
        List<ProductCollectionDto> productCollectionDtoList = new ArrayList<>();
        pallet.getCollections().forEach(productCollection -> productCollectionDtoList.add(productCollectionConverter.fromEntityToDto(productCollection)));
        palletDto.setCollections(productCollectionDtoList);
        List<LogDto> logDtoList = new ArrayList<>();
        pallet.getLogs().forEach(log -> logDtoList.add(logConverter.fromEntityToDto(log)));
        palletDto.setLogs(logDtoList);
        return palletDto;
    }
}
