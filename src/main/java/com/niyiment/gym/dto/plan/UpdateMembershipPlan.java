package com.niyiment.gym.dto.plan;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record UpdateMembershipPlan (
        @NotBlank(message = "Name is required")
        String name,
        String description,

        @NotNull(message = "Price is required")
        @Positive BigDecimal price,

        @NotNull(message = "Duration is required")
        @Positive Integer durationMonths,
        String features,

        Boolean isActive
) {
}
