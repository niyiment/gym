package com.niyiment.subscription.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class CustomerSubscriptionTest {

    @Test
    void testCustomerSubscriptionCreation() {

        SubscriptionPlan plan = SubscriptionPlan.builder()
                .id(1L)
                .name("Premium Plan")
                .description("Premium features")
                .price(19.99)
                .currency("NGN")
                .stripePriceId("price_123")
                .stripeProductId("prod_123")
                .billingCycle("month")
                .build();

        String email = "info@sample.com";
        String name = "John Doe";
        String stripeCustomerId = "customer_12345";
        String stripeSubscriptionId = "sub_12345";
        String status = "Active";
        LocalDateTime startDate = LocalDateTime.now();
        LocalDateTime endDate = LocalDateTime.now().plusMonths(1);

        CustomerSubscription customer = new CustomerSubscription();
        customer.setCustomerName(name);
        customer.setCustomerEmail(email);
        customer.setStripeCustomerId(stripeCustomerId);
        customer.setStripeSubscriptionId(stripeSubscriptionId);
        customer.setPlan(plan);
        customer.setStatus(status);
        customer.setStartDate(startDate);
        customer.setEndDate(endDate);

        assertEquals(name, customer.getCustomerName());
        assertEquals(email, customer.getCustomerEmail());
        assertEquals(stripeCustomerId, customer.getStripeCustomerId());
        assertEquals(stripeSubscriptionId, customer.getStripeSubscriptionId());
        assertEquals(plan, customer.getPlan());
        assertEquals(status, customer.getStatus());
        assertEquals(startDate, customer.getStartDate());
        assertEquals(endDate, customer.getEndDate());
    }

    @Test
    void testCustomerSubscriptionBuilder() {

        SubscriptionPlan plan = SubscriptionPlan.builder()
                .id(1L)
                .name("Premium Plan")
                .description("Premium features")
                .price(19.99)
                .currency("NGN")
                .stripePriceId("price_123")
                .stripeProductId("prod_123")
                .billingCycle("month")
                .build();

        String email = "info@sample.com";
        String name = "John Doe";
        String stripeCustomerId = "customer_12345";
        String stripeSubscriptionId = "sub_12345";
        String status = "Active";
        LocalDateTime startDate = LocalDateTime.now();
        LocalDateTime endDate = LocalDateTime.now().plusMonths(1);

        CustomerSubscription customer = CustomerSubscription.builder()
                .customerName(name)
                .customerEmail(email)
                .stripeCustomerId(stripeCustomerId)
                .stripeSubscriptionId(stripeSubscriptionId)
                .plan(plan)
                .status(status)
                .startDate(startDate)
                .endDate(endDate)
                .build();


        assertEquals(name, customer.getCustomerName());
        assertEquals(email, customer.getCustomerEmail());
        assertEquals(stripeCustomerId, customer.getStripeCustomerId());
        assertEquals(stripeSubscriptionId, customer.getStripeSubscriptionId());
        assertEquals(plan, customer.getPlan());
        assertEquals(status, customer.getStatus());
        assertEquals(startDate, customer.getStartDate());
        assertEquals(endDate, customer.getEndDate());
    }

    @Test
    void testIsActive() {
        CustomerSubscription activeSubscription = CustomerSubscription.builder()
                .status("active")
                .build();
        CustomerSubscription trialingSubscription = CustomerSubscription.builder()
                .status("trialing")
                .build();
        CustomerSubscription canceledSubscription = CustomerSubscription.builder()
                .status("canceled")
                .build();

        assertTrue(activeSubscription.isActive(), "Active subscription should be considered active");
        assertTrue(trialingSubscription.isActive(), "Trialing subscription should be considered active");
        assertFalse(canceledSubscription.isActive(), "Canceled subscription should not be considered active");
    }

    @Test
    void testEquality() {
        CustomerSubscription sub1 = CustomerSubscription.builder()
                .id(1L)
                .customerEmail("test@example.com")
                .stripeSubscriptionId("sub_123")
                .build();

        CustomerSubscription sub2 = CustomerSubscription.builder()
                .id(1L)
                .customerEmail("test@example.com")
                .stripeSubscriptionId("sub_123")
                .build();

        CustomerSubscription sub3 = CustomerSubscription.builder()
                .id(2L)
                .customerEmail("other@example.com")
                .stripeSubscriptionId("sub_456")
                .build();

        assertEquals(sub1, sub2, "Subscriptions with same ID should be equal");
        assertNotEquals(sub1, sub3, "Subscriptions with different IDs should not be equal");
    }

}
