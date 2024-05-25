package com.example.tp4angluarspring.repository;

import com.example.springdemoangular.entities.Payment;
import com.example.springdemoangular.entities.PaymentStatus;
import com.example.springdemoangular.entities.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByStudentCode(String code);
    List<Payment> findByStatus(PaymentStatus paymentStatus);
    List<Payment> findByType(PaymentType type);
}
