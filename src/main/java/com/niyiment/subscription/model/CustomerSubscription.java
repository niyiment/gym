package com.niyiment.subscription.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "customer_subscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerEmail;

    private String customerName;

    @Column(nullable = false, unique = true)
    private String stripeCustomerId;

    @Column(nullable = false, unique = true)
    private String stripeSubscriptionId;

    @Column(nullable = false)
    private String status; // active, canceled, past_due, trialing, etc.

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "plan_id", nullable = false)
    private SubscriptionPlan plan;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public boolean isActive() {
        return "active".equals(status) || "trialing".equals(status);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerSubscription that = (CustomerSubscription) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}