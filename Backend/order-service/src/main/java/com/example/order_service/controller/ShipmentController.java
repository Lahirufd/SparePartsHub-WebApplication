package com.example.order_service.controller;

import com.example.order_service.entity.Shipment;
import com.example.order_service.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    @GetMapping
    public List<Shipment> getAllShipments() {
        return shipmentService.getAllShipments();
    }

    @GetMapping("/{id}")
    public Shipment getShipmentById(@PathVariable int id) {
        return shipmentService.getShipmentById(id).orElse(null);
    }

    @PostMapping
    public Shipment addShipment(@RequestBody Shipment shipment) {
        return shipmentService.saveShipment(shipment);
    }

    @DeleteMapping("/{id}")
    public void deleteShipment(@PathVariable int id) {
        shipmentService.deleteShipment(id);
    }
}
