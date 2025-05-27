package com.example.product_service.controller;


import com.example.product_service.dto.CategoryDTO;
import com.example.product_service.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4000"})
public class CategoryContoller {

    @Autowired
    CategoryService categoryService;

    @PostMapping()
    public CategoryDTO createCategory(@RequestBody CategoryDTO categoryDTO) {
        return categoryService.createCategory(categoryDTO);
    }

    @GetMapping()
    public List<CategoryDTO> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable int id) {
        boolean isDeleted = categoryService.deleteCategoryById(id);

        if (isDeleted) {
            return ResponseEntity.ok("Category deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found.");
        }
    }

}
