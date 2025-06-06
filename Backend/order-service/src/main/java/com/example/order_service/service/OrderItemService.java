package com.example.order_service.service;

import com.example.order_service.entity.OrderItem;
import com.example.order_service.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> getOrderItemById(int id) {
        return orderItemRepository.findById(id);
    }

    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public void deleteOrderItem(int id) {
        orderItemRepository.deleteById(id);
    }

    public List<OrderItem> getItemsByOrderId(int orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

}
