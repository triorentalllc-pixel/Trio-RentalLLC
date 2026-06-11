/*
# Trio Rental LLC - Complete Database Schema

## Overview
This migration creates the complete database schema for Trio Rental LLC's car rental platform,
including vehicles, reservations, customers, payments, and administrative functions.

## New Tables

### Vehicle Categories
- `vehicle_categories` - Categories like Economy, Luxury, SUV, etc.
- `id` (uuid, primary key)
- `name` (text, unique, not null)
- `description` (text)
- `icon` (text) - icon identifier for UI
- `display_order` (integer) - for sorting categories
- `created_at` (timestamp)

### Locations
- `locations` - Pickup/dropoff locations in DMV area
- `id` (uuid, primary key)
- `name` (text, not null)
- `address` (text, not null)
- `city` (text, not null)
- `state` (text, not null)
- `zip_code` (text, not null)
- `phone` (text)
- `email` (text)
- `operating_hours` (jsonb) - opening/closing times by day
- `is_active` (boolean, default true)
- `created_at` (timestamp)

### Vehicles
- `vehicles` - The rental fleet
- `id` (uuid, primary key)
- `make` (text, not null) - e.g., Toyota, BMW
- `model` (text, not null) - e.g., Camry, X5
- `year` (integer, not null)
- `category_id` (uuid, FK to vehicle_categories)
- `license_plate` (text, unique, not null)
- `vin` (text, unique)
- `color` (text)
- `passenger_capacity` (integer, not null)
- `transmission` (text) - 'automatic' or 'manual'
- `fuel_type` (text) - 'gasoline', 'diesel', 'electric', 'hybrid'
- `mileage` (integer) - current odometer reading
- `daily_rate` (decimal, not null)
- `weekly_rate` (decimal)
- `monthly_rate` (decimal)
- `deposit_amount` (decimal)
- `features` (jsonb) - array of features like GPS, Bluetooth, etc.
- `description` (text)
- `images` (jsonb) - array of image URLs
- `primary_image` (text) - main image URL
- `status` (text) - 'available', 'rented', 'maintenance', 'retired'
- `location_id` (uuid, FK to locations)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Customers
- `customers` - Customer profiles linked to auth.users
- `id` (uuid, primary key, references auth.users)
- `first_name` (text, not null)
- `last_name` (text, not null)
- `phone` (text)
- `date_of_birth` (date)
- `driver_license_number` (text)
- `driver_license_state` (text)
- `driver_license_expiry` (date)
- `address` (text)
- `city` (text)
- `state` (text)
- `zip_code` (text)
- `emergency_contact_name` (text)
- `emergency_contact_phone` (text)
- `is_verified` (boolean, default false)
- `notes` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Reservations
- `reservations` - Booking records
- `id` (uuid, primary key)
- `confirmation_number` (text, unique, not null)
- `customer_id` (uuid, FK to customers)
- `vehicle_id` (uuid, FK to vehicles)
- `pickup_location_id` (uuid, FK to locations)
- `dropoff_location_id` (uuid, FK to locations)
- `pickup_date` (date, not null)
- `pickup_time` (time, not null)
- `dropoff_date` (date, not null)
- `dropoff_time` (time, not null)
- `status` (text) - 'pending', 'confirmed', 'active', 'completed', 'cancelled'
- `daily_rate` (decimal, not null) - rate at time of booking
- `subtotal` (decimal, not null)
- `taxes` (decimal, not null)
- `fees` (decimal, not null)
- `discount_amount` (decimal)
- `total_amount` (decimal, not null)
- `promo_code` (text)
- `special_requests` (text)
- `pickup_odometer` (integer)
- `dropoff_odometer` (integer)
- `notes` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Payments
- `payments` - Payment transactions
- `id` (uuid, primary key)
- `reservation_id` (uuid, FK to reservations)
- `customer_id` (uuid, FK to customers)
- `amount` (decimal, not null)
- `currency` (text, default 'USD')
- `payment_method` (text) - 'card', 'cash'
- `payment_provider` (text) - 'stripe', 'square'
- `provider_transaction_id` (text)
- `provider_payment_intent_id` (text)
- `status` (text) - 'pending', 'completed', 'failed', 'refunded'
- `card_last_four` (text)
- `card_brand` (text)
- `billing_address` (jsonb)
- `refund_amount` (decimal)
- `refund_reason` (text)
- `refunded_at` (timestamp)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Promo Codes
- `promo_codes` - Discount codes
- `id` (uuid, primary key)
- `code` (text, unique, not null)
- `description` (text)
- `discount_type` (text) - 'percentage' or 'fixed'
- `discount_value` (decimal, not null)
- `min_order_amount` (decimal)
- `max_discount_amount` (decimal)
- `usage_limit` (integer)
- `usage_count` (integer, default 0)
- `valid_from` (timestamp)
- `valid_until` (timestamp)
- `is_active` (boolean, default true)
- `created_at` (timestamp)

### Reviews
- `reviews` - Customer reviews for vehicles
- `id` (uuid, primary key)
- `customer_id` (uuid, FK to customers)
- `vehicle_id` (uuid, FK to vehicles)
- `reservation_id` (uuid, FK to reservations)
- `rating` (integer, 1-5, not null)
- `title` (text)
- `comment` (text)
- `is_published` (boolean, default true)
- `created_at` (timestamp)

### Contact Messages
- `contact_messages` - Contact form submissions
- `id` (uuid, primary key)
- `name` (text, not null)
- `email` (text, not null)
- `phone` (text)
- `subject` (text, not null)
- `message` (text, not null)
- `status` (text) - 'new', 'read', 'responded', 'closed'
- `admin_notes` (text)
- `created_at` (timestamp)

### Admin Users
- `admin_users` - Extended profile for admin users
- `id` (uuid, primary key, references auth.users)
- `role` (text) - 'super_admin', 'admin', 'manager', 'staff'
- `permissions` (jsonb) - granular permissions
- `first_name` (text, not null)
- `last_name` (text, not null)
- `phone` (text)
- `is_active` (boolean, default true)
- `last_login_at` (timestamp)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Audit Logs
- `audit_logs` - System activity tracking
- `id` (uuid, primary key)
- `user_id` (uuid, FK to auth.users)
- `action` (text, not null)
- `entity_type` (text) - table name
- `entity_id` (uuid)
- `old_values` (jsonb)
- `new_values` (jsonb)
- `ip_address` (text)
- `user_agent` (text)
- `created_at` (timestamp)

### Saved Payment Methods
- `saved_payment_methods` - Customer saved cards
- `id` (uuid, primary key)
- `customer_id` (uuid, FK to customers)
- `provider` (text) - 'stripe' or 'square'
- `provider_customer_id` (text)
- `provider_payment_method_id` (text)
- `card_last_four` (text)
- `card_brand` (text)
- `card_expiry_month` (integer)
- `card_expiry_year` (integer)
- `is_default` (boolean, default false)
- `created_at` (timestamp)

### Notifications
- `notifications` - User notifications
- `id` (uuid, primary key)
- `user_id` (uuid, FK to auth.users)
- `type` (text) - 'reservation', 'payment', 'system', 'promotion'
- `title` (text, not null)
- `message` (text, not null)
- `data` (jsonb) - additional data
- `is_read` (boolean, default false)
- `created_at` (timestamp)

## Security
- RLS enabled on all tables
- Owner-scoped policies for customer data
- Admin policies for administrative access
- Public read access for vehicle browsing (limited)

## Indexes
- Strategic indexes for search and filtering performance
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Vehicle Categories
CREATE TABLE IF NOT EXISTS vehicle_categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text UNIQUE NOT NULL,
    description text,
    icon text,
    display_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Locations
CREATE TABLE IF NOT EXISTS locations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    zip_code text NOT NULL,
    phone text,
    email text,
    operating_hours jsonb,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- Vehicles
CREATE TABLE IF NOT EXISTS vehicles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    make text NOT NULL,
    model text NOT NULL,
    year integer NOT NULL,
    category_id uuid REFERENCES vehicle_categories(id) ON DELETE SET NULL,
    license_plate text UNIQUE NOT NULL,
    vin text UNIQUE,
    color text,
    passenger_capacity integer NOT NULL,
    transmission text NOT NULL DEFAULT 'automatic',
    fuel_type text NOT NULL DEFAULT 'gasoline',
    mileage integer DEFAULT 0,
    daily_rate decimal(10,2) NOT NULL,
    weekly_rate decimal(10,2),
    monthly_rate decimal(10,2),
    deposit_amount decimal(10,2) DEFAULT 500.00,
    features jsonb DEFAULT '[]'::jsonb,
    description text,
    images jsonb DEFAULT '[]'::jsonb,
    primary_image text,
    status text NOT NULL DEFAULT 'available',
    location_id uuid REFERENCES locations(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Customers
CREATE TABLE IF NOT EXISTS customers (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text,
    date_of_birth date,
    driver_license_number text,
    driver_license_state text,
    driver_license_expiry date,
    address text,
    city text,
    state text,
    zip_code text,
    emergency_contact_name text,
    emergency_contact_phone text,
    is_verified boolean DEFAULT false,
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Reservations
CREATE TABLE IF NOT EXISTS reservations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    confirmation_number text UNIQUE NOT NULL,
    customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    vehicle_id uuid NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    pickup_location_id uuid NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
    dropoff_location_id uuid NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
    pickup_date date NOT NULL,
    pickup_time time NOT NULL,
    dropoff_date date NOT NULL,
    dropoff_time time NOT NULL,
    status text NOT NULL DEFAULT 'pending',
    daily_rate decimal(10,2) NOT NULL,
    subtotal decimal(10,2) NOT NULL,
    taxes decimal(10,2) NOT NULL DEFAULT 0,
    fees decimal(10,2) NOT NULL DEFAULT 0,
    discount_amount decimal(10,2) DEFAULT 0,
    total_amount decimal(10,2) NOT NULL,
    promo_code text,
    special_requests text,
    pickup_odometer integer,
    dropoff_odometer integer,
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id uuid NOT NULL REFERENCES reservations(id) ON DELETE RESTRICT,
    customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    amount decimal(10,2) NOT NULL,
    currency text DEFAULT 'USD',
    payment_method text NOT NULL,
    payment_provider text,
    provider_transaction_id text,
    provider_payment_intent_id text,
    status text NOT NULL DEFAULT 'pending',
    card_last_four text,
    card_brand text,
    billing_address jsonb,
    refund_amount decimal(10,2) DEFAULT 0,
    refund_reason text,
    refunded_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Promo Codes
CREATE TABLE IF NOT EXISTS promo_codes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text UNIQUE NOT NULL,
    description text,
    discount_type text NOT NULL,
    discount_value decimal(10,2) NOT NULL,
    min_order_amount decimal(10,2) DEFAULT 0,
    max_discount_amount decimal(10,2),
    usage_limit integer,
    usage_count integer DEFAULT 0,
    valid_from timestamptz,
    valid_until timestamptz,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    vehicle_id uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    reservation_id uuid REFERENCES reservations(id) ON DELETE SET NULL,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title text,
    comment text,
    is_published boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'new',
    admin_notes text,
    created_at timestamptz DEFAULT now()
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role text NOT NULL DEFAULT 'staff',
    permissions jsonb DEFAULT '{}'::jsonb,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text,
    is_active boolean DEFAULT true,
    last_login_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    action text NOT NULL,
    entity_type text,
    entity_id uuid,
    old_values jsonb,
    new_values jsonb,
    ip_address text,
    user_agent text,
    created_at timestamptz DEFAULT now()
);

-- Saved Payment Methods
CREATE TABLE IF NOT EXISTS saved_payment_methods (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    provider text NOT NULL,
    provider_customer_id text,
    provider_payment_method_id text,
    card_last_four text,
    card_brand text,
    card_expiry_month integer,
    card_expiry_year integer,
    is_default boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type text NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    data jsonb,
    is_read boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE vehicle_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Vehicle Categories Policies (public read, admin write)
DROP POLICY IF EXISTS "public_read_categories" ON vehicle_categories;
CREATE POLICY "public_read_categories" ON vehicle_categories FOR SELECT
    TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_manage_categories" ON vehicle_categories;
CREATE POLICY "admin_manage_categories" ON vehicle_categories FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

-- Locations Policies (public read active locations, admin full access)
DROP POLICY IF EXISTS "public_read_active_locations" ON locations;
CREATE POLICY "public_read_active_locations" ON locations FOR SELECT
    TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "admin_manage_locations" ON locations;
CREATE POLICY "admin_manage_locations" ON locations FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

-- Vehicles Policies (public read available vehicles, admin full access)
DROP POLICY IF EXISTS "public_read_available_vehicles" ON vehicles;
CREATE POLICY "public_read_available_vehicles" ON vehicles FOR SELECT
    TO anon, authenticated USING (status IN ('available', 'rented'));

DROP POLICY IF EXISTS "admin_manage_vehicles" ON vehicles;
CREATE POLICY "admin_manage_vehicles" ON vehicles FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

-- Customers Policies (owner access, admin read)
DROP POLICY IF EXISTS "customer_read_own" ON customers;
CREATE POLICY "customer_read_own" ON customers FOR SELECT
    TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "customer_insert_own" ON customers;
CREATE POLICY "customer_insert_own" ON customers FOR INSERT
    TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "customer_update_own" ON customers;
CREATE POLICY "customer_update_own" ON customers FOR UPDATE
    TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "admin_read_customers" ON customers;
CREATE POLICY "admin_read_customers" ON customers FOR SELECT
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

DROP POLICY IF EXISTS "admin_update_customers" ON customers;
CREATE POLICY "admin_update_customers" ON customers FOR UPDATE
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

-- Reservations Policies
DROP POLICY IF EXISTS "customer_read_own_reservations" ON reservations;
CREATE POLICY "customer_read_own_reservations" ON reservations FOR SELECT
    TO authenticated USING (
        auth.uid() = customer_id OR 
        EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true)
    );

DROP POLICY IF EXISTS "customer_create_reservation" ON reservations;
CREATE POLICY "customer_create_reservation" ON reservations FOR INSERT
    TO authenticated WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "customer_update_own_reservation" ON reservations;
CREATE POLICY "customer_update_own_reservation" ON reservations FOR UPDATE
    TO authenticated 
    USING (auth.uid() = customer_id)
    WITH CHECK (auth.uid() = customer_id OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

DROP POLICY IF EXISTS "admin_manage_reservations" ON reservations;
CREATE POLICY "admin_manage_reservations" ON reservations FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

-- Payments Policies
DROP POLICY IF EXISTS "customer_read_own_payments" ON payments;
CREATE POLICY "customer_read_own_payments" ON payments FOR SELECT
    TO authenticated USING (
        auth.uid() = customer_id OR 
        EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true)
    );

DROP POLICY IF EXISTS "customer_create_payment" ON payments;
CREATE POLICY "customer_create_payment" ON payments FOR INSERT
    TO authenticated WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "admin_manage_payments" ON payments;
CREATE POLICY "admin_manage_payments" ON payments FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

-- Promo Codes Policies (admin manage, authenticated use)
DROP POLICY IF EXISTS "customer_use_promo_codes" ON promo_codes;
CREATE POLICY "customer_use_promo_codes" ON promo_codes FOR SELECT
    TO authenticated USING (is_active = true);

DROP POLICY IF EXISTS "admin_manage_promo_codes" ON promo_codes;
CREATE POLICY "admin_manage_promo_codes" ON promo_codes FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

-- Reviews Policies
DROP POLICY IF EXISTS "public_read_reviews" ON reviews;
CREATE POLICY "public_read_reviews" ON reviews FOR SELECT
    TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "customer_manage_own_reviews" ON reviews;
CREATE POLICY "customer_manage_own_reviews" ON reviews FOR ALL
    TO authenticated USING (auth.uid() = customer_id)
    WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "admin_manage_reviews" ON reviews;
CREATE POLICY "admin_manage_reviews" ON reviews FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

-- Contact Messages Policies
DROP POLICY IF EXISTS "public_create_contact" ON contact_messages;
CREATE POLICY "public_create_contact" ON contact_messages FOR INSERT
    TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_manage_contact" ON contact_messages;
CREATE POLICY "admin_manage_contact" ON contact_messages FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

-- Admin Users Policies
DROP POLICY IF EXISTS "admin_read_admin_users" ON admin_users;
CREATE POLICY "admin_read_admin_users" ON admin_users FOR SELECT
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

DROP POLICY IF EXISTS "admin_manage_admin_users" ON admin_users;
CREATE POLICY "admin_manage_admin_users" ON admin_users FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND role IN ('super_admin', 'admin') AND is_active = true))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND role IN ('super_admin', 'admin') AND is_active = true));

-- Audit Logs Policies (admin only)
DROP POLICY IF EXISTS "admin_read_audit_logs" ON audit_logs;
CREATE POLICY "admin_read_audit_logs" ON audit_logs FOR SELECT
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND is_active = true));

DROP POLICY IF EXISTS "admin_create_audit_logs" ON audit_logs;
CREATE POLICY "admin_create_audit_logs" ON audit_logs FOR INSERT
    TO authenticated WITH CHECK (true);

-- Saved Payment Methods Policies
DROP POLICY IF EXISTS "customer_manage_payment_methods" ON saved_payment_methods;
CREATE POLICY "customer_manage_payment_methods" ON saved_payment_methods FOR ALL
    TO authenticated
    USING (auth.uid() = customer_id)
    WITH CHECK (auth.uid() = customer_id);

-- Notifications Policies
DROP POLICY IF EXISTS "user_read_own_notifications" ON notifications;
CREATE POLICY "user_read_own_notifications" ON notifications FOR SELECT
    TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_update_own_notifications" ON notifications;
CREATE POLICY "user_update_own_notifications" ON notifications FOR UPDATE
    TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "system_create_notifications" ON notifications;
CREATE POLICY "system_create_notifications" ON notifications FOR INSERT
    TO authenticated WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_location ON vehicles(location_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX IF NOT EXISTS idx_reservations_customer ON reservations(customer_id);
CREATE INDEX IF NOT EXISTS idx_reservations_vehicle ON reservations(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON reservations(pickup_date, dropoff_date);
CREATE INDEX IF NOT EXISTS idx_payments_reservation ON payments(reservation_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_vehicle ON reviews(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- Function to generate confirmation number
CREATE OR REPLACE FUNCTION generate_confirmation_number()
RETURNS text AS $$
DECLARE
    chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    result text := '';
    i integer;
BEGIN
    FOR i IN 1..8 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN 'TR-' || result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set confirmation number on reservation insert
CREATE OR REPLACE FUNCTION set_confirmation_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.confirmation_number IS NULL THEN
        NEW.confirmation_number := generate_confirmation_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_confirmation_number ON reservations;
CREATE TRIGGER trigger_set_confirmation_number
    BEFORE INSERT ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION set_confirmation_number();

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_vehicles_updated_at ON vehicles;
CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reservations_updated_at ON reservations;
CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();