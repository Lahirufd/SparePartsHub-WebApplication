package com.example.product_service.controller;

import com.example.product_service.dto.WarrantyClaimDTO;
import com.example.product_service.service.WarrantyClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/warranty-claims")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4000"})
public class WarrantyClaimController {

    @Autowired
    private WarrantyClaimService service;

    @PostMapping
    public ResponseEntity<WarrantyClaimDTO> createClaim(@RequestBody WarrantyClaimDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<WarrantyClaimDTO>> getAllClaims() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WarrantyClaimDTO> getClaimById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WarrantyClaimDTO> updateClaim(@PathVariable Long id, @RequestBody WarrantyClaimDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClaim(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WarrantyClaimDTO>> getClaimsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUserId(userId));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<WarrantyClaimDTO>> getClaimsByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(service.getByProductId(productId));
    }

}
