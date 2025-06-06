package com.example.order_service.service;

import com.example.order_service.entity.Shipment;
import com.example.order_service.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    public Optional<Shipment> getShipmentById(int id) {
        return shipmentRepository.findById(id);
    }

    public Shipment saveShipment(Shipment shipment) {
        return shipmentRepository.save(shipment);
    }

    public void deleteShipment(int id) {
        shipmentRepository.deleteById(id);
    }

    public Shipment getShipmentByOrderId(int orderId) {
        return shipmentRepository.findByOrderId(orderId);
    }

}
