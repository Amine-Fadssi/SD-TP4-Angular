package com.example.tp4angluarspring.dtos;

import com.example.springdemoangular.entities.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class NewPaymentDTO {
    private LocalDate date;
    private double amount;
    private PaymentType type;
    private String studentCode;
}
