package com.example.product_service.controller;


import com.example.product_service.data.Category;
import com.example.product_service.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4000"})
public class CategoryContoller {

    @Autowired
    CategoryService categoryService;

    @PostMapping()
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @GetMapping()
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable int id) {
        boolean isDelete = categoryService.deleteCategoryById(id);

        if (isDelete) {
            return ResponseEntity.ok("User account deleted successfully.");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
