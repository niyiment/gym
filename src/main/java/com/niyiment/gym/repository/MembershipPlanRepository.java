package com.niyiment.gym.repository;

import com.niyiment.gym.model.MembershipPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MembershipPlanRepository extends JpaRepository<MembershipPlan, UUID> {
    List<MembershipPlan> findByIsActiveTrue();
}

