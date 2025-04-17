package com.niyiment.gym.dto.plan;


import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record MembershipPlanResponse (
        UUID id,
        String name,
        String description,
        BigDecimal price,
        Integer durationMonths,
        String features,
        Boolean isActive,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}