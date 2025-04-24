
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Subscription plans Table
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(50) NOT NULL,
    billing_cycle VARCHAR(50) NOT NULL,
    features TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer payments Table
CREATE TABLE IF NOT EXISTS customer_payments (
    id UUID PRIMARY KEY,
    subscription_id VARCHAR(100) NOT NULL,
    customer_id VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    plan_id UUID NOT NULL,
    payment_method_id VARCHAR(50) NOT NULL,
    last_payment_date TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
