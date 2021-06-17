package org.example.inventory.converter;

import org.example.inventory.dto.LogDto;
import org.example.inventory.model.Log;
import org.springframework.stereotype.Component;

@Component
public class LogConverter {

    public LogDto fromEntityToDto(Log log)
    {
        LogDto logDto = new LogDto();

        logDto.setId(log.getId());
        logDto.setAmount(log.getAmount());
        logDto.setBarcodeProduct(log.getProduct().getBarcode());
        logDto.setDate(log.getDate());
        logDto.setLogType(log.getLogType().toString());
        logDto.setPalletId(log.getPallet().getId());

        return logDto;
    }
}
