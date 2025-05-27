package com.example.product_service.mapper;

import com.example.product_service.dto.StockDTO;
import com.example.product_service.entity.Stock;
import org.springframework.stereotype.Component;

@Component
public class StockMapper {

    public StockDTO toDTO(Stock stock) {
        if (stock == null) return null;

        StockDTO dto = new StockDTO();
        dto.setId(stock.getId());
        dto.setQuantity(stock.getQuantity());
        dto.setLastUpdated(stock.getLastUpdated());
        return dto;
    }

    public static Stock toEntity(StockDTO dto) {
        if (dto == null) return null;

        Stock stock = new Stock();
        stock.setId(dto.getId());
        stock.setQuantity(dto.getQuantity());
        stock.setLastUpdated(dto.getLastUpdated());
        return stock;
    }
}
