package com.example.product_service.repository;

import com.example.product_service.entity.WarrantyClaim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarrantyClaimRepository extends JpaRepository<WarrantyClaim, Integer> {

    List<WarrantyClaim> findByUserId(Long userId);
    List<WarrantyClaim> findByProductId(Long productId);

}
