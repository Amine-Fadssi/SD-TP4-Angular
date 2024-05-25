package com.example.tp4angluarspring.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString @Builder
public class Payment {
    // The @Id annotation specifies that the field below is the primary key of the entity
    // The @GeneratedValue annotation indicates that the value of the primary key will be automatically generated
    // The strategy = GenerationType.IDENTITY specifies that the database will automatically generate unique identifiers (auto-incrementing)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Declaration of the id field
    private LocalDate date;
    private double amount;
    private PaymentType type;
    private PaymentStatus status;
    private String file;
    // The @ManyToOne annotation establishes a many-to-one relationship between this entity (Payment) and (Student)
    @ManyToOne
    private Student student; // Declaration of the student field representing the related entity

}
