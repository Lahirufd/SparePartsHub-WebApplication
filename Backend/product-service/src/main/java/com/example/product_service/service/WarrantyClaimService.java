package com.example.product_service.service;

import com.example.product_service.dto.WarrantyClaimDTO;
import com.example.product_service.entity.Product;
import com.example.product_service.entity.WarrantyClaim;
import com.example.product_service.mapper.WarrantyClaimMapper;
import com.example.product_service.repository.ProductRepository;
import com.example.product_service.repository.WarrantyClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WarrantyClaimService {

    @Autowired
    private WarrantyClaimRepository warrantyClaimRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private WarrantyClaimMapper mapper;

    public WarrantyClaimDTO create(WarrantyClaimDTO dto) {
        Product product = productRepository.findById(dto.getProductId().intValue())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        WarrantyClaim entity = mapper.toEntity(dto, product);
        WarrantyClaim saved = warrantyClaimRepository.save(entity);
        return mapper.toDTO(saved);
    }

    public List<WarrantyClaimDTO> getAll() {
        return warrantyClaimRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<WarrantyClaimDTO> getById(Long id) {
        return warrantyClaimRepository.findById(id.intValue())
                .map(mapper::toDTO);
    }

    public WarrantyClaimDTO update(Long id, WarrantyClaimDTO dto) {
        WarrantyClaim existing = warrantyClaimRepository.findById(id.intValue())
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        Product product = productRepository.findById(dto.getProductId().intValue())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setProduct(product);
        existing.setUserId(dto.getUserId().intValue());
        existing.setOrderId(dto.getOrderId().intValue());
        existing.setClaimReason(dto.getClaimReason());
        existing.setStatus(dto.getStatus());
        existing.setImagePath(dto.getImageUrl());

        WarrantyClaim updated = warrantyClaimRepository.save(existing);
        return mapper.toDTO(updated);
    }

    public void delete(Long id) {
        warrantyClaimRepository.deleteById(id.intValue());
    }

    public List<WarrantyClaimDTO> getByUserId(Long userId) {
        return warrantyClaimRepository.findByUserId(userId).stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<WarrantyClaimDTO> getByProductId(Long productId) {
        return warrantyClaimRepository.findByProductId(productId).stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

}
