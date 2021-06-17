package org.example.inventory.converter;

import org.example.inventory.dto.ProductDto;
import org.example.inventory.model.Department;
import org.example.inventory.model.Product;
import org.example.inventory.service.DepartmentService;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter {
    private final DepartmentService departmentService;

    public ProductConverter(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    public Product fromDtoToEntity(ProductDto productDto)
    {
        Product product = new Product();
        product.setBarcode(productDto.getBarcode());
        product.setDescription(productDto.getDescription());
        product.setTitle(productDto.getTitle());
        product.setVendor(productDto.getVendor());
        product.setWeight(productDto.getWeight());
        Department department = departmentService.getDepartmentByName(productDto.getDepartment());
        product.setDepartment(department);

        return product;
    }

    public ProductDto fromEntityToDto(Product product)
    {
        ProductDto productDto = new ProductDto();
        productDto.setBarcode(product.getBarcode());
        productDto.setDepartment(product.getDepartment().getName());
        productDto.setDescription(product.getDescription());
        productDto.setTitle(product.getTitle());
        productDto.setVendor(product.getVendor());
        productDto.setWeight(product.getWeight());

        return productDto;
    }
}
