package com.example.product_service.service;

import com.example.product_service.dto.ProductDTO;
import com.example.product_service.mapper.ProductMapper;
import com.example.product_service.entity.Category;
import com.example.product_service.entity.Product;
import com.example.product_service.entity.Stock;
import com.example.product_service.repository.CategoryRepository;
import com.example.product_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {


    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
    }

    private final String uploadDir = "uploads/";

    public ProductDTO createProduct(
            String name, String description, double price,
            MultipartFile imageFile, int categoryId, int stockQuantity) throws IOException {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, imageFile.getBytes());

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImagePath(filePath.toString());
        product.setCategory(category);

        Stock stock = new Stock();
        stock.setQuantity(stockQuantity);
        stock.setProduct(product);

        product.setStock(stock);

        Product savedProduct = productRepository.save(product);

        return productMapper.toDTO(savedProduct);
    }

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findProductsByName(String name) {
        List<Product> products = productRepository.findByName(name);
        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO updateProduct(int productId, ProductDTO productDTO) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());

        if (productDTO.getCategory() != null) {
            Category category = categoryRepository.findById(productDTO.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found with ID: " + productDTO.getCategory().getId()));
            product.setCategory(category);
        }

        if (productDTO.getStock().getQuantity() != null) {
            Stock stock = product.getStock();
            if (stock == null) {
                stock = new Stock();
                stock.setProduct(product);
            }
            stock.setQuantity(productDTO.getStock().getQuantity());
            product.setStock(stock);
        }

        Product updatedProduct = productRepository.save(product);
        return productMapper.toDTO(updatedProduct);
    }

}