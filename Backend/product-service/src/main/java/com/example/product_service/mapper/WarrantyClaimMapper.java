package com.example.product_service.mapper;

import com.example.product_service.dto.WarrantyClaimDTO;
import com.example.product_service.entity.Product;
import com.example.product_service.entity.WarrantyClaim;
import org.springframework.stereotype.Component;

@Component
public class WarrantyClaimMapper {

    public WarrantyClaimDTO toDTO(WarrantyClaim entity) {
        WarrantyClaimDTO dto = new WarrantyClaimDTO();
        dto.setId((long) entity.getId());
        dto.setUserId((long) entity.getUserId());
        dto.setProductId(entity.getProduct() != null ? (long) entity.getProduct().getId() : null);
        dto.setOrderId((long) entity.getOrderId());
        dto.setClaimReason(entity.getClaimReason());
        dto.setStatus(entity.getStatus());
        dto.setSubmittedAt(entity.getSubmittedAt());
        dto.setImageUrl(entity.getImagePath());
        return dto;
    }

    public WarrantyClaim toEntity(WarrantyClaimDTO dto, Product product) {
        WarrantyClaim entity = new WarrantyClaim();
        entity.setId(dto.getId() != null ? dto.getId().intValue() : 0);
        entity.setUserId(dto.getUserId().intValue());
        entity.setProduct(product);
        entity.setOrderId(dto.getOrderId().intValue());
        entity.setClaimReason(dto.getClaimReason());
        entity.setStatus(dto.getStatus());
        entity.setImagePath(dto.getImageUrl());
        entity.setSubmittedAt(dto.getSubmittedAt());
        return entity;
    }
}
