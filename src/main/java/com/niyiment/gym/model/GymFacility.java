package com.niyiment.gym.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gym_facilities")
public class GymFacility {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @NotBlank
    @Column(name = "address", columnDefinition = "TEXT", nullable = false)
    private String address;

    @Column(name = "contact_info", length = 100)
    private String contactInfo;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "amenities", columnDefinition = "TEXT")
    private String amenities;

    @Column(name = "operating_hours", columnDefinition = "TEXT")
    private String operatingHours;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Utility method to get amenities as a list
    public java.util.List<String> getAmenitiesList() {
        if (amenities == null || amenities.isEmpty()) {
            return java.util.Collections.emptyList();
        }
        return java.util.Arrays.asList(amenities.split(","));
    }
}
