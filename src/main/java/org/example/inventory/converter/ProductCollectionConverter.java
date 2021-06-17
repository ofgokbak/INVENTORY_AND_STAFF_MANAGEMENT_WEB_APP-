package org.example.inventory.converter;

import org.example.inventory.dto.ProductCollectionDto;
import org.example.inventory.model.Product;
import org.example.inventory.model.ProductCollection;
import org.example.inventory.service.ProductService;
import org.springframework.stereotype.Component;

@Component
public class ProductCollectionConverter {
    private final ProductService productService;

    public ProductCollectionConverter( ProductService productService) {
        this.productService = productService;
    }

    public ProductCollection fromDtoToEntity(ProductCollectionDto productCollectionDto)
    {
        ProductCollection productCollection = new ProductCollection();
        productCollection.setId(productCollectionDto.getId());
        Product product = productService.getProductByTitle(productCollectionDto.getProduct());
        productCollection.setProduct(product);
        productCollection.setMaxCapacity(productCollectionDto.getMaxCapacity());
        productCollection.setQuantity(productCollectionDto.getQuantity());
        return productCollection;
    }

    public ProductCollectionDto fromEntityToDto(ProductCollection productCollection)
    {
        ProductCollectionDto productCollectionDto = new ProductCollectionDto();
        productCollectionDto.setId(productCollection.getId());
        productCollectionDto.setProduct(productCollection.getProduct().getTitle());
        productCollectionDto.setMaxCapacity(productCollection.getMaxCapacity());
        productCollectionDto.setQuantity(productCollection.getQuantity());

        return productCollectionDto;
    }
}
