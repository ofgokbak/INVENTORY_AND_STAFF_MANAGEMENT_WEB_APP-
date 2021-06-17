package org.example.inventory.controller;

import org.example.inventory.converter.LogConverter;
import org.example.inventory.converter.ProductConverter;
import org.example.inventory.dto.LogDto;
import org.example.inventory.dto.ProductDto;
import org.example.inventory.model.Product;
import org.example.inventory.service.ProductService;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RequestMapping("products")
@RestController
@CrossOrigin("http://localhost:3000")
public class ProductController {
    private final ProductService productService;
    private final ProductConverter converter;
    private final LogConverter logConverter;

    public ProductController(ProductService productService, ProductConverter converter, LogConverter logConverter) {
        this.productService = productService;
        this.converter = converter;
        this.logConverter = logConverter;
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public String addProduct(@Valid @NonNull @RequestBody ProductDto productDto) {
       return productService.addProduct(converter.fromDtoToEntity(productDto)).getBarcode();
    }

    @GetMapping
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public List<ProductDto> getAllProducts(){
        List<Product> products = productService.getAllProducts();
        List<ProductDto> productDtoList = new ArrayList<>();
        products.forEach(product -> productDtoList.add(converter.fromEntityToDto(product)));
        return productDtoList;
    }

    @GetMapping(path = "{barcodeProduct}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ProductDto getProductByBarcode(@PathVariable("barcodeProduct") String barcodeProduct) {
         Product product = productService.getProductByBarcode(barcodeProduct);
        return converter.fromEntityToDto(product);
    }

    @GetMapping(path = "{barcodeProduct}/logs")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public List<LogDto> getLogsByProduct(@PathVariable String barcodeProduct) {
        List<LogDto> logDtoList = new ArrayList<>();
        productService.getLogsByProductBarcode(barcodeProduct).forEach(log -> logDtoList.add(logConverter.fromEntityToDto(log)));
        return logDtoList;
    }


    @GetMapping(path = "/{department}/search/{term}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public List<ProductDto> getProductBySearch(@PathVariable("department") String department, @PathVariable("term") String term) {
        List<ProductDto> productDtoList = new ArrayList<>();
        List<Product> productList = productService.getProductsBySearch(department,term);
        if(!productList.isEmpty())
        {
            productList.forEach(product -> productDtoList.add(converter.fromEntityToDto(product)));
        }
        return productDtoList;
    }

    @GetMapping(path = "{barcodeProduct}/logs/filter")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public List<LogDto> getLogsByProductAndDate(@PathVariable String barcodeProduct, @RequestParam(value = "date") String date) {
        List<LogDto> logDtoList = new ArrayList<>();
        productService.getLogsByProductBarcodeAndDate(barcodeProduct, date).forEach(log -> logDtoList.add(logConverter.fromEntityToDto(log)));
        return logDtoList;
    }

    @GetMapping(path = "/department/{name}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public List<ProductDto> getProductsByDepartment(@PathVariable("name") String name) {
        List<ProductDto> productDtoList = new ArrayList<>();
        List<Product> productList = productService.getProductsByDepartment(name);
        if(!productList.isEmpty())
        {
            productList.forEach(product -> productDtoList.add(converter.fromEntityToDto(product)));
        }
        return productDtoList;
    }

    @DeleteMapping(path = "{barcodeProduct}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public void deleteProduct(@PathVariable("barcodeProduct") String barcodeProduct) {
        productService.deleteProduct(barcodeProduct);
    }

    @PutMapping("/{barcodeProduct}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public void updateProduct(@Valid @NonNull @RequestBody ProductDto productdto) {
        Product product = converter.fromDtoToEntity(productdto);
        productService.updateProduct(product);
    }

}