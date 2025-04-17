package com.niyiment.gym.repository;

import com.niyiment.gym.model.PaymentHistory;
import com.niyiment.gym.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, UUID> {
    List<PaymentHistory> findBySubscription(Subscription subscription);

    Optional<PaymentHistory> findByStripePaymentId(String stripePaymentId);
}