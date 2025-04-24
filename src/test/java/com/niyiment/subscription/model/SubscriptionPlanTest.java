package com.niyiment.subscription.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class SubscriptionPlanTest {

    @Test
    void testSubscriptionPlanCreation() {
        String name = "Premium Plan";
        String description = "Premium features with unlimited access";
        Double price = 49999.99;
        String currency = "NGN";
        String stripePriceId = "price_12345";
        String stripeProductId = "product_12345";
        String billingCycle = "month";

        SubscriptionPlan plan = new SubscriptionPlan();
        plan.setName(name);
        plan.setDescription(description);
        plan.setPrice(price);
        plan.setCurrency(currency);
        plan.setStripePriceId(stripePriceId);
        plan.setStripeProductId(stripeProductId);
        plan.setBillingCycle(billingCycle);

        assertEquals(name, plan.getName());
        assertEquals(description, plan.getDescription());
        assertEquals(price, plan.getPrice());
        assertEquals(currency, plan.getCurrency());
        assertEquals(stripePriceId, plan.getStripePriceId());
        assertEquals(stripeProductId, plan.getStripeProductId());
        assertEquals(billingCycle, plan.getBillingCycle());
    }

    @Test
    void testSubscriptionPlanBuilder() {
        String name = "Basic Plan";
        String description = "Basic features with limited access";
        Double price = 29999.99;
        String currency = "NGN";
        String stripePriceId = "price_12346";
        String stripeProductId = "product_12346";
        String billingCycle = "year";

        SubscriptionPlan plan = SubscriptionPlan.builder()
                .name(name)
                .description(description)
                .price(price)
                .currency(currency)
                .stripePriceId(stripePriceId)
                .stripeProductId(stripeProductId)
                .billingCycle(billingCycle)
                .build();

        assertEquals(name, plan.getName());
        assertEquals(description, plan.getDescription());
        assertEquals(price, plan.getPrice());
        assertEquals(currency, plan.getCurrency());
        assertEquals(stripePriceId, plan.getStripePriceId());
        assertEquals(stripeProductId, plan.getStripeProductId());
        assertEquals(billingCycle, plan.getBillingCycle());
    }

    @Test
    void testSubscriptionPlanEquality() {
        SubscriptionPlan plan1 = SubscriptionPlan.builder()
                .id(1L)
                .name("Premium Plan")
                .description("Premium features")
                .price(19.99)
                .currency("NGN")
                .stripePriceId("price_123")
                .stripeProductId("prod_123")
                .billingCycle("month")
                .build();

        SubscriptionPlan plan2 = SubscriptionPlan.builder()
                .id(1L)
                .name("Premium Plan")
                .description("Premium features")
                .price(19.99)
                .currency("NGN")
                .stripePriceId("price_123")
                .stripeProductId("prod_123")
                .billingCycle("month")
                .build();

        SubscriptionPlan plan3 = SubscriptionPlan.builder()
                .id(2L)
                .name("Basic Plan")
                .description("Basic features")
                .price(9.99)
                .currency("NGN")
                .stripePriceId("price_456")
                .stripeProductId("prod_456")
                .billingCycle("year")
                .build();

        assertEquals(plan1, plan2, "Plans with same ID should be equal");
        assertNotEquals(plan1, plan3, "Plans with different IDs should not be equal");
    }
}
