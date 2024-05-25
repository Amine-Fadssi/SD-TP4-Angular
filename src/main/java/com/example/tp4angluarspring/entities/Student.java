package com.example.tp4angluarspring.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString @Builder
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    // The @Column annotation allows customization of the mapping between the entity attribute and the database column
    // The unique = true attribute specifies that values in the 'code' column must be unique across all rows in the table
    @Column(unique = true)
    private String code;
    private String programId;
    private String photo;
}
