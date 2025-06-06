package com.example.order_service.repository;

import com.example.order_service.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {
    Shipment findByOrderId(int orderId);
}