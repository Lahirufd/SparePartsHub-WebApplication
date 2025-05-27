package com.example.product_service.mapper;

import com.example.product_service.dto.*;
import com.example.product_service.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    private final CategoryMapper categoryMapper;
    private final StockMapper stockMapper;

    @Autowired
    public ProductMapper(CategoryMapper categoryMapper, StockMapper stockMapper) {
        this.categoryMapper = categoryMapper;
        this.stockMapper = stockMapper;
    }

    public ProductDTO toDTO(Product product) {
        if (product == null) return null;

        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setImagePath(product.getImagePath());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setCategory(categoryMapper.toDTO(product.getCategory())); // ✅ Correct now
        dto.setStock(stockMapper.toDTO(product.getStock()));
        return dto;
    }

    public static Product toEntity(ProductDTO dto) {
        if (dto == null) return null;

        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setImagePath(dto.getImagePath());
        product.setCreatedAt(dto.getCreatedAt());
        product.setCategory(CategoryMapper.toEntity(dto.getCategory()));

        Stock stock = StockMapper.toEntity(dto.getStock());
        if (stock != null) {
            stock.setProduct(product);
        }
        product.setStock(stock);
        return product;
    }
}
