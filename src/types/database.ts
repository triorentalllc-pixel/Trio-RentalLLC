export interface VehicleCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string | null;
  email: string | null;
  operating_hours: OperatingHours | null;
  is_active: boolean;
  created_at: string;
}

export interface OperatingHours {
  [key: string]: {
    open?: string;
    close?: string;
    closed?: boolean;
  };
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  category_id: string;
  license_plate: string;
  vin: string | null;
  color: string | null;
  passenger_capacity: number;
  transmission: 'automatic' | 'manual';
  fuel_type: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  mileage: number;
  daily_rate: number;
  weekly_rate: number | null;
  monthly_rate: number | null;
  deposit_amount: number;
  features: string[];
  description: string | null;
  images: string[];
  primary_image: string | null;
  status: 'available' | 'rented' | 'maintenance' | 'retired';
  location_id: string | null;
  created_at: string;
  updated_at: string;
  category?: VehicleCategory;
  location?: Location;
}

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  date_of_birth: string | null;
  driver_license_number: string | null;
  driver_license_state: string | null;
  driver_license_expiry: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  is_verified: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  confirmation_number: string;
  customer_id: string;
  vehicle_id: string;
  pickup_location_id: string;
  dropoff_location_id: string;
  pickup_date: string;
  pickup_time: string;
  dropoff_date: string;
  dropoff_time: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  daily_rate: number;
  subtotal: number;
  taxes: number;
  fees: number;
  discount_amount: number;
  total_amount: number;
  promo_code: string | null;
  special_requests: string | null;
  pickup_odometer: number | null;
  dropoff_odometer: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  vehicle?: Vehicle;
  customer?: Customer;
  pickup_location?: Location;
  dropoff_location?: Location;
}

export interface Payment {
  id: string;
  reservation_id: string;
  customer_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_provider: string | null;
  provider_transaction_id: string | null;
  provider_payment_intent_id: string | null;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  card_last_four: string | null;
  card_brand: string | null;
  billing_address: BillingAddress | null;
  refund_amount: number | null;
  refund_reason: string | null;
  refunded_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface PromoCode {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount: number | null;
  usage_limit: number | null;
  usage_count: number;
  valid_from: string | null;
  valid_until: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  customer_id: string;
  vehicle_id: string;
  reservation_id: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  is_published: boolean;
  created_at: string;
  customer?: Customer;
  vehicle?: Vehicle;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'closed';
  admin_notes: string | null;
  created_at: string;
}

export interface AdminUser {
  id: string;
  role: 'super_admin' | 'admin' | 'manager' | 'staff';
  permissions: Record<string, boolean>;
  first_name: string;
  last_name: string;
  phone: string | null;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface SavedPaymentMethod {
  id: string;
  customer_id: string;
  provider: string;
  provider_customer_id: string | null;
  provider_payment_method_id: string | null;
  card_last_four: string | null;
  card_brand: string | null;
  card_expiry_month: number | null;
  card_expiry_year: number | null;
  is_default: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'reservation' | 'payment' | 'system' | 'promotion';
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  email_confirmed_at: string | null;
}

export interface SearchParams {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  category?: string;
}

export interface CheckoutData {
  vehicle_id: string;
  pickup_location_id: string;
  dropoff_location_id: string;
  pickup_date: string;
  pickup_time: string;
  dropoff_date: string;
  dropoff_time: string;
  special_requests?: string;
  promo_code?: string;
}
