package com.niyiment.gym.repository;

import com.niyiment.gym.model.Subscription;
import com.niyiment.gym.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {
    List<Subscription> findByUser(User user);

    Optional<Subscription> findByStripeSubscriptionId(String stripeSubscriptionId);

    @Query("SELECT s FROM Subscription s WHERE s.status = 'ACTIVE' AND s.endDate < :date")
    List<Subscription> findExpiredSubscriptions(LocalDate date);

    @Query("SELECT COUNT(s) FROM Subscription s WHERE s.status = 'ACTIVE'")
    long countActiveSubscriptions();
}