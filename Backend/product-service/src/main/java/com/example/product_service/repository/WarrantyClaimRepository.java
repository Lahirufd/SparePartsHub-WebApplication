package com.example.product_service.repository;

import com.example.product_service.entity.WarrantyClaim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarrantyClaimRepository extends JpaRepository<WarrantyClaim, Integer> {

}
