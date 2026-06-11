/*
# Trio Rental LLC - Initial Data Seeding

## Overview
This migration populates the database with initial data for the car rental platform.

## Data Added

### Vehicle Categories
- Economy - Affordable, fuel-efficient vehicles
- Compact - Slightly larger with good value
- Midsize - Comfortable sedans
- Full-size - Spacious sedans
- SUV - Sport utility vehicles
- Luxury - Premium vehicles
- Van/Minivan - Family and group transport
- Pickup Truck - Utility and work vehicles
- Sports Car - Performance vehicles
- Electric - EV and hybrid vehicles

### Locations
- Ronald Reagan Washington National Airport (DCA)
- Washington Union Station
- Dulles International Airport (IAD)
- Baltimore-Washington International Airport (BWI)
- Downtown Washington DC
- Bethesda, Maryland
- Arlington, Virginia
- Alexandria, Virginia

### Sample Vehicles
- A variety of vehicles across all categories with realistic specifications and pricing
*/

-- Insert Vehicle Categories
INSERT INTO vehicle_categories (name, description, icon, display_order) VALUES
('Economy', 'Affordable and fuel-efficient vehicles perfect for budget-conscious travelers', 'car', 1),
('Compact', 'Slightly larger vehicles with excellent value and fuel economy', 'car', 2),
('Midsize', 'Comfortable sedans ideal for families and business travelers', 'sedan', 3),
('Full-size', 'Spacious sedans with premium comfort and features', 'sedan', 4),
('SUV', 'Sport utility vehicles with extra space and versatility', 'suv', 5),
('Luxury', 'Premium vehicles with top-tier comfort and features', 'luxury', 6),
('Van/Minivan', 'Ideal for families and groups needing extra seating', 'van', 7),
('Pickup Truck', 'Utility vehicles perfect for work or adventure', 'truck', 8),
('Sports Car', 'Performance vehicles for the driving enthusiast', 'sports', 9),
('Electric', 'Eco-friendly electric and hybrid vehicles', 'electric', 10)
ON CONFLICT (name) DO NOTHING;

-- Insert Locations
INSERT INTO locations (name, address, city, state, zip_code, phone, email, operating_hours, is_active) VALUES
('Ronald Reagan Washington National Airport (DCA)', '2401 S Clark St', 'Arlington', 'VA', '22202', '(703) 417-8000', 'dca@triorentalllc.com', '{"monday": {"open": "06:00", "close": "24:00"}, "tuesday": {"open": "06:00", "close": "24:00"}, "wednesday": {"open": "06:00", "close": "24:00"}, "thursday": {"open": "06:00", "close": "24:00"}, "friday": {"open": "06:00", "close": "24:00"}, "saturday": {"open": "06:00", "close": "24:00"}, "sunday": {"open": "06:00", "close": "24:00"}}', true),
('Washington Union Station', '50 Massachusetts Ave NE', 'Washington', 'DC', '20002', '(202) 289-1908', 'unionstation@triorentalllc.com', '{"monday": {"open": "07:00", "close": "22:00"}, "tuesday": {"open": "07:00", "close": "22:00"}, "wednesday": {"open": "07:00", "close": "22:00"}, "thursday": {"open": "07:00", "close": "22:00"}, "friday": {"open": "07:00", "close": "22:00"}, "saturday": {"open": "08:00", "close": "20:00"}, "sunday": {"open": "08:00", "close": "20:00"}}', true),
('Dulles International Airport (IAD)', '1 Saarinen Cir', 'Dulles', 'VA', '20166', '(703) 572-2700', 'iad@triorentalllc.com', '{"monday": {"open": "05:00", "close": "23:00"}, "tuesday": {"open": "05:00", "close": "23:00"}, "wednesday": {"open": "05:00", "close": "23:00"}, "thursday": {"open": "05:00", "close": "23:00"}, "friday": {"open": "05:00", "close": "23:00"}, "saturday": {"open": "05:00", "close": "23:00"}, "sunday": {"open": "05:00", "close": "23:00"}}', true),
('Baltimore-Washington International Airport (BWI)', '7050 Friendship Rd', 'Baltimore', 'MD', '21240', '(410) 859-7111', 'bwi@triorentalllc.com', '{"monday": {"open": "06:00", "close": "24:00"}, "tuesday": {"open": "06:00", "close": "24:00"}, "wednesday": {"open": "06:00", "close": "24:00"}, "thursday": {"open": "06:00", "close": "24:00"}, "friday": {"open": "06:00", "close": "24:00"}, "saturday": {"open": "06:00", "close": "24:00"}, "sunday": {"open": "06:00", "close": "24:00"}}', true),
('Downtown Washington DC', '1200 New York Ave NW', 'Washington', 'DC', '20005', '(202) 555-0123', 'downtown@triorentalllc.com', '{"monday": {"open": "08:00", "close": "18:00"}, "tuesday": {"open": "08:00", "close": "18:00"}, "wednesday": {"open": "08:00", "close": "18:00"}, "thursday": {"open": "08:00", "close": "18:00"}, "friday": {"open": "08:00", "close": "18:00"}, "saturday": {"open": "09:00", "close": "16:00"}, "sunday": {"open": "10:00", "close": "14:00"}}', true),
('Bethesda, Maryland', '7400 Wisconsin Ave', 'Bethesda', 'MD', '20814', '(301) 555-0456', 'bethesda@triorentalllc.com', '{"monday": {"open": "08:00", "close": "19:00"}, "tuesday": {"open": "08:00", "close": "19:00"}, "wednesday": {"open": "08:00", "close": "19:00"}, "thursday": {"open": "08:00", "close": "19:00"}, "friday": {"open": "08:00", "close": "19:00"}, "saturday": {"open": "09:00", "close": "17:00"}, "sunday": {"open": "10:00", "close": "15:00"}}', true),
('Arlington, Virginia', '1100 N Glebe Rd', 'Arlington', 'VA', '22201', '(703) 555-0789', 'arlington@triorentalllc.com', '{"monday": {"open": "08:00", "close": "19:00"}, "tuesday": {"open": "08:00", "close": "19:00"}, "wednesday": {"open": "08:00", "close": "19:00"}, "thursday": {"open": "08:00", "close": "19:00"}, "friday": {"open": "08:00", "close": "19:00"}, "saturday": {"open": "09:00", "close": "17:00"}, "sunday": {"open": "10:00", "close": "15:00"}}', true),
('Alexandria, Virginia', '4000 King St', 'Alexandria', 'VA', '22302', '(703) 555-0101', 'alexandria@triorentalllc.com', '{"monday": {"open": "08:00", "close": "18:00"}, "tuesday": {"open": "08:00", "close": "18:00"}, "wednesday": {"open": "08:00", "close": "18:00"}, "thursday": {"open": "08:00", "close": "18:00"}, "friday": {"open": "08:00", "close": "18:00"}, "saturday": {"open": "09:00", "close": "16:00"}, "sunday": {"closed": true}}', true);

-- Insert Vehicles with realistic data
-- Get category IDs dynamically in the inserts
DO $$
DECLARE
    eco_id uuid;
    compact_id uuid;
    mid_id uuid;
    full_id uuid;
    suv_id uuid;
    lux_id uuid;
    van_id uuid;
    truck_id uuid;
    sports_id uuid;
    electric_id uuid;
    loc_dca uuid;
    loc_iad uuid;
    loc_bwi uuid;
    loc_downtown uuid;
    loc_bethesda uuid;
    loc_arlington uuid;
    loc_alex uuid;
    loc_union uuid;
BEGIN
    -- Get category IDs
    SELECT id INTO eco_id FROM vehicle_categories WHERE name = 'Economy';
    SELECT id INTO compact_id FROM vehicle_categories WHERE name = 'Compact';
    SELECT id INTO mid_id FROM vehicle_categories WHERE name = 'Midsize';
    SELECT id INTO full_id FROM vehicle_categories WHERE name = 'Full-size';
    SELECT id INTO suv_id FROM vehicle_categories WHERE name = 'SUV';
    SELECT id INTO lux_id FROM vehicle_categories WHERE name = 'Luxury';
    SELECT id INTO van_id FROM vehicle_categories WHERE name = 'Van/Minivan';
    SELECT id INTO truck_id FROM vehicle_categories WHERE name = 'Pickup Truck';
    SELECT id INTO sports_id FROM vehicle_categories WHERE name = 'Sports Car';
    SELECT id INTO electric_id FROM vehicle_categories WHERE name = 'Electric';
    
    -- Get location IDs
    SELECT id INTO loc_dca FROM locations WHERE name LIKE '%National Airport%';
    SELECT id INTO loc_iad FROM locations WHERE name LIKE '%Dulles%';
    SELECT id INTO loc_bwi FROM locations WHERE name LIKE '%Baltimore%';
    SELECT id INTO loc_downtown FROM locations WHERE name LIKE '%Downtown%';
    SELECT id INTO loc_bethesda FROM locations WHERE name LIKE '%Bethesda%';
    SELECT id INTO loc_arlington FROM locations WHERE name LIKE '%Arlington%' AND name NOT LIKE '%National%';
    SELECT id INTO loc_alex FROM locations WHERE name LIKE '%Alexandria%';
    SELECT id INTO loc_union FROM locations WHERE name LIKE '%Union Station%';

    -- Economy Vehicles
    INSERT INTO vehicles (make, model, year, category_id, license_plate, vin, color, passenger_capacity, transmission, fuel_type, mileage, daily_rate, weekly_rate, monthly_rate, deposit_amount, features, description, primary_image, status, location_id) VALUES
    ('Toyota', 'Corolla', 2024, eco_id, 'ABC1234', '1HGBH41JXMN109186', 'Silver', 5, 'automatic', 'gasoline', 12500, 45.99, 279.99, 999.99, 300.00, '["Bluetooth", "Backup Camera", "Cruise Control", "USB Ports", "Keyless Entry"]', 'Reliable and fuel-efficient sedan perfect for city driving and daily commutes. Great gas mileage with modern amenities.', 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_dca),
    ('Honda', 'Civic', 2024, eco_id, 'DEF5678', '2HGFC2F59LH543210', 'Blue', 5, 'automatic', 'gasoline', 8900, 47.99, 289.99, 1049.99, 300.00, '["Bluetooth", "Backup Camera", "Apple CarPlay", "Android Auto", "Cruise Control"]', 'Stylish compact with excellent fuel economy and modern tech features. Perfect for urban adventures.', 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_iad),
    ('Hyundai', 'Elantra', 2024, eco_id, 'GHI9012', 'KMHG35JH5KU123456', 'White', 5, 'automatic', 'gasoline', 15200, 43.99, 269.99, 969.99, 300.00, '["Bluetooth", "Backup Camera", "Wireless Charging", "Sunroof", "Push Button Start"]', 'Feature-packed economy sedan with surprising premium touches. Excellent value for money.', 'https://images.pexels.com/photos/248747/pexels-photo-248747.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_bwi);

    -- Compact Vehicles
    INSERT INTO vehicles (make, model, year, category_id, license_plate, vin, color, passenger_capacity, transmission, fuel_type, mileage, daily_rate, weekly_rate, monthly_rate, deposit_amount, features, description, primary_image, status, location_id) VALUES
    ('Toyota', 'Camry', 2024, compact_id, 'JKL3456', '4T1BZ1HK0JU123789', 'Black', 5, 'automatic', 'gasoline', 5200, 52.99, 319.99, 1149.99, 400.00, '["Bluetooth", "Backup Camera", "Apple CarPlay", "Android Auto", "Heated Seats", "Leather Steering Wheel"]', 'Popular mid-size sedan known for reliability and comfort. Smooth ride with premium interior.', 'https://images.pexels.com/photos/162603/pexels-photo-162603.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_downtown),
    ('Nissan', 'Sentra', 2024, compact_id, 'MNO7890', '3N1AB8CV9LY234567', 'Gray', 5, 'automatic', 'gasoline', 7800, 49.99, 299.99, 1079.99, 350.00, '["Bluetooth", "Backup Camera", "Blind Spot Monitoring", "Rear Cross Traffic Alert", "Keyless Entry"]', 'Spacious compact with advanced safety features. Great choice for families.', 'https://images.pexels.com/photos/3874357/pexels-photo-3874357.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_bethesda);

    -- Midsize Vehicles
    INSERT INTO vehicles (make, model, year, category_id, license_plate, vin, color, passenger_capacity, transmission, fuel_type, mileage, daily_rate, weekly_rate, monthly_rate, deposit_amount, features, description, primary_image, status, location_id) VALUES
    ('Honda', 'Accord', 2024, mid_id, 'PQR2345', '1HGCV1F34LA123456', 'Pearl White', 5, 'automatic', 'gasoline', 3100, 59.99, 359.99, 1299.99, 450.00, '["Bluetooth", "Backup Camera", "Apple CarPlay", "Android Auto", "Heated Seats", "Navigation", "Leather Seats"]', 'Premium midsize sedan with refined interior and advanced technology. Smooth highway cruiser.', 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_arlington),
    ('Toyota', 'Camry XLE', 2024, mid_id, 'STU6789', '4T1BZ1HK5JU198765', 'Champagne', 5, 'automatic', 'hybrid', 4500, 62.99, 379.99, 1369.99, 450.00, '["Bluetooth", "Backup Camera", "Panoramic Sunroof", "Heated Ventilated Seats", "Navigation", "Premium Audio"]', 'Hybrid efficiency meets luxury comfort. Exceptional fuel economy without sacrificing style.', 'https://images.pexels.com/photos/3972723/pexels-photo-3972723.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_alex);

    -- Full-size Vehicles
    INSERT INTO vehicles (make, model, year, category_id, license_plate, vin, color, passenger_capacity, transmission, fuel_type, mileage, daily_rate, weekly_rate, monthly_rate, deposit_amount, features, description, primary_image, status, location_id) VALUES
    ('Chrysler', '300', 2024, full_id, 'VWX0123', '2C3CCADG5LH123456', 'Black', 5, 'automatic', 'gasoline', 18900, 69.99, 419.99, 1519.99, 500.00, '["Bluetooth", "Backup Camera", "Navigation", "Heated Leather Seats", "Premium Audio", "Uconnect"]', 'Full-size luxury sedan with commanding presence and sophisticated style. Smooth ride quality.', 'https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_dca),
    ('Dodge', 'Charger', 2024, full_id, 'YZA4567', '2C3CDZAG5LH234567', 'Red', 5, 'automatic', 'gasoline', 12500, 72.99, 439.99, 1589.99, 500.00, '["Bluetooth", "Backup Camera", "Navigation", "Heated Seats", "Performance Package", "Paddle Shifters"]', 'Bold American muscle sedan with sporty handling and aggressive styling. Thrilling drive experience.', 'https://images.pexels.com/photos/1200501/pexels-photo-1200501.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_iad);

    -- SUV Vehicles
    INSERT INTO vehicles (make, model, year, category_id, license_plate, vin, color, passenger_capacity, transmission, fuel_type, mileage, daily_rate, weekly_rate, monthly_rate, deposit_amount, features, description, primary_image, status, location_id) VALUES
    ('Toyota', 'RAV4', 2024, suv_id, 'SUV1010', '5YFBYREV5HP098765', 'Green', 5, 'automatic', 'gasoline', 6500, 74.99, 449.99, 1629.99, 500.00, '["Bluetooth", "Backup Camera", "Apple CarPlay", "Android Auto", "Heated Seats", "Power Liftgate"]', 'Popular compact SUV with versatility for any adventure. Great cargo space and reliability.', 'https://images.pexels.com/photos/1032990/pexels-photo-1032990.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_union),
    ('Honda', 'CR-V', 2024, suv_id, 'SUV2020', '3FNYK4H96LJ234567', 'Gray', 5, 'automatic', 'gasoline', 4200, 76.99, 459.99, 1659.99, 500.00, '["Bluetooth", "Backup Camera", "Honda Sensing", "Navigation", "Wireless Charging", "Panoramic Sunroof"]', 'Award-winning compact SUV with excellent safety ratings and family-friendly features.', 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_bwi),
    ('Jeep', 'Wrangler', 2024, suv_id, 'SUV3030', '1C4HJXDG6LW198765', 'Yellow', 4, 'automatic', 'gasoline', 8900, 89.99, 539.99, 1949.99, 600.00, '["Bluetooth", "4x4", "Removable Top", "Navigation", "Rock Rails", "All-Terrain Tires"]', 'Iconic off-roader ready for any terrain. Adventurous spirit with removable top and doors.', 'https://images.pexels.com/photos/3726415/pexels-photo-3726415.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_bethesda),
    ('Chevrolet', 'Suburban', 2024, suv_id, 'SUV4040', '3GNGYCVR6LG123456', 'Black', 8, 'automatic', 'gasoline', 11500, 99.99, 599.99, 2169.99, 700.00, '["Bluetooth", "Backup Camera", "Navigation", "Heated Captain Chairs", "Rear Entertainment", "Wireless Charging", "Third Row"]', 'Full-size SUV with maximum passenger and cargo capacity. Perfect for large families or groups.', 'https://images.pexels.com/photos/1906931/pexels-photo-1906931.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_dca),
    ('Ford', 'Explorer', 2024, suv_id, 'SUV5050', '1FMSK8DH5LGA12345', 'Blue', 7, 'automatic', 'gasoline', 7100, 84.99, 509.99, 1839.99, 550.00, '["Bluetooth", "Backup Camera", "Apple CarPlay", "Android Auto", "Third Row", "Power Liftgate", "B&O Audio"]', 'Three-row SUV with modern tech and comfortable seating for the whole family.', 'https://images.pexels.com/photos/351263/pexels-photo-351263.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_arlington);

    -- Luxury Vehicles
    INSERT INTO vehicles (make, model, year, category_id, license_plate, vin, color, passenger_capacity, transmission, fuel_type, mileage, daily_rate, weekly_rate, monthly_rate, deposit_amount, features, description, primary_image, status, location_id) VALUES
    ('BMW', '540i', 2024, lux_id, 'LUX1010', 'WBAVA3C50LW123456', 'White', 5, 'automatic', 'gasoline', 2800, 149.99, 899.99, 3249.99, 1000.00, '["Bluetooth", "Backup Camera", "Navigation", "Leather Seats", "Heated Steering Wheel", "Harman Kardon Audio", "Panoramic Sunroof", "Massage Seats"]', 'German luxury sedan with precision engineering and premium appointments. Exceptional driving dynamics.', 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_iad),
    ('Mercedes-Benz', 'E450', 2024, lux_id, 'LUX2020', 'WDDZF4KB5LA234567', 'Black', 5, 'automatic', 'gasoline', 1500, 159.99, 959.99, 3459.99, 1000.00, '["Bluetooth", "Backup Camera", "Navigation", "Burmester Audio", "Executive Package", "Heated Rear Seats", "Ambient Lighting"]', 'Elegant luxury sedan with world-class comfort and cutting-edge technology.', 'https://images.pexels.com/photos/210477/pexels-photo-210477.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_downtown),
    ('Audi', 'A7', 2024, lux_id, 'LUX3030', 'WAUXFAF56LA345678', 'Grey', 4, 'automatic', 'gasoline', 3200, 154.99, 929.99, 3349.99, 1000.00, '["Bluetooth", "Backup Camera", "Navigation", "Bang & Olufsen Audio", "Matrix LED Lights", "Virtual Cockpit", "Sport Package"]', 'Sleek sportback design meets luxury performance. Head-turning style with sophisticated tech.', 'https://images.pexels.com/photos/140291/pexels-photo-140291.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_dca),
    ('Lexus', 'LS 500', 2024, lux_id, 'LUX4040', 'JTHBK5GG5L2123456', ' pearl', 5, 'automatic', 'gasoline', 4100, 169.99, 1019.99, 3679.99, 1200.00, '["Bluetooth", "Backup Camera", "Navigation", "Mark Levinson Audio", "Executive Seats", "Shiatsu Massage", "Climate Seats"]', 'Flagship luxury sedan with unparalleled craftsmanship and attention to detail.', 'https://images.pexels.com/photos/331114/pexels-photo-331114.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_alex);

    -- Van/Minivan
    INSERT INTO vehicles (make, model, year, category_id, license_plate, vin, color, passenger_capacity, transmission, fuel_type, mileage, daily_rate, weekly_rate, monthly_rate, deposit_amount, features, description, primary_image, status, location_id) VALUES
    ('Honda', 'Odyssey', 2024, van_id, 'VAN1010', '5FNRL5H65LB123456', 'Silver', 8, 'automatic', 'gasoline', 9200, 79.99, 479.99, 1729.99, 500.00, '["Bluetooth", "Backup Camera", "Navigation", "HondaVac", "CabinWatch", "CabinTalk", "Magic Slide Seats", "Rear Entertainment"]', 'Family-friendly minivan with innovative features and versatile seating. Perfect for road trips.', 'https://images.pexels.com/photos/331114/pexels-photo-331114.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_bethesda),
    ('Toyota', 'Sienna', 2024, van_id, 'VAN2020', '5TDYZ3AC8LY234567', 'Blue', 7, 'automatic', 'hybrid', 6700, 84.99, 509.99, 1839.99, 550.00, '["Bluetooth", "Backup Camera", "Navigation", "Heated Seats", "Hands-Free Liftgate", "Second Row Captain Chairs", "Hybrid Efficiency"]', 'Hybrid minivan with excellent fuel economy and premium family features.', 'https://images.pexels.com/photos/87662/pexels-photo-87662.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_arlington);

    -- Pickup Trucks
    INSERT INTO vehicles (make, model, year, category_id, license_plate, vin, color, passenger_capacity, transmission, fuel_type, mileage, daily_rate, weekly_rate, monthly_rate, deposit_amount, features, description, primary_image, status, location_id) VALUES
    ('Ford', 'F-150', 2024, truck_id, 'TRK1010', '1FTEW1E54LA123456', 'Black', 5, 'automatic', 'gasoline', 14300, 89.99, 539.99, 1949.99, 600.00, '["Bluetooth", "Backup Camera", "Navigation", "Pro Power Onboard", "Tailgate Step", "LED Box Lighting", "FX4 Package"]', 'America best-selling truck with impressive capability and innovative features.', 'https://images.pexels.com/photos/1904863/pexels-photo-1904863.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_union),
    ('Chevrolet', 'Silverado 1500', 2024, truck_id, 'TRK2020', '3GCUYYEC5LG234567', 'Red', 5, 'automatic', 'gasoline', 8900, 86.99, 519.99, 1879.99, 550.00, '["Bluetooth", "Backup Camera", "Navigation", "MultiPro Tailgate", "Heated Seats", "Trailering Package"]', 'Tough truck with advanced technology and best-in-class cargo volume.', 'https://images.pexels.com/photos/1904560/pexels-photo-1904560.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_bwi);

    -- Sports Cars
    INSERT INTO vehicles (make, model, year, category_id, license_plate, vin, color, passenger_capacity, transmission, fuel_type, mileage, daily_rate, weekly_rate, monthly_rate, deposit_amount, features, description, primary_image, status, location_id) VALUES
    ('Ford', 'Mustang GT', 2024, sports_id, 'SPT1010', '1FA6P8CF5L5123456', 'Orange', 4, 'automatic', 'gasoline', 2100, 129.99, 779.99, 2819.99, 800.00, '["Bluetooth", "Backup Camera", "Navigation", "B&O Audio", "Performance Exhaust", "Track Apps", "Magnetic Suspension"]', 'Iconic American muscle car with thrilling V8 performance and aggressive styling.', 'https://images.pexels.com/photos/544514/pexels-photo-544514.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_dca),
    ('Chevrolet', 'Camaro SS', 2024, sports_id, 'SPT2020', '1G1FH1R74L0234567', 'Yellow', 4, 'automatic', 'gasoline', 4500, 124.99, 749.99, 2699.99, 800.00, '["Bluetooth", "Backup Camera", "Navigation", "Heads Up Display", "Performance Exhaust", "Launch Control"]', 'Pure American muscle with track-ready performance and head-turning presence.', 'https://images.pexels.com/photos/331114/pexels-photo-331114.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_iad),
    ('Porsche', '911 Carrera', 2024, sports_id, 'SPT3030', 'WP0AF2A96LS345678', 'White', 4, 'automatic', 'gasoline', 1800, 249.99, 1499.99, 5399.99, 2000.00, '["Bluetooth", "Backup Camera", "Navigation", "Sport Chrono", "Bose Audio", "PDK Transmission", "Sport Exhaust"]', 'Legendary German sports car with unmatched heritage and precision engineering.', 'https://images.pexels.com/photos/87662/pexels-photo-87662.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_downtown);

    -- Electric Vehicles
    INSERT INTO vehicles (make, model, year, category_id, license_plate, vin, color, passenger_capacity, transmission, fuel_type, mileage, daily_rate, weekly_rate, monthly_rate, deposit_amount, features, description, primary_image, status, location_id) VALUES
    ('Tesla', 'Model 3', 2024, electric_id, 'ELE1010', '5YJ3E1EA5LF123456', 'White', 5, 'automatic', 'electric', 5200, 99.99, 599.99, 2169.99, 700.00, '["Bluetooth", "Backup Camera", "Navigation", "Autopilot", "Premium Audio", "Glass Roof", "Tesla App"]', 'Revolutionary electric sedan with cutting-edge technology and long range capability.', 'https://images.pexels.com/photos/1597562/pexels-photo-1597562.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_dca),
    ('Tesla', 'Model Y', 2024, electric_id, 'ELE2020', '5YJYGDEF0LF234567', 'Blue', 5, 'automatic', 'electric', 3800, 109.99, 659.99, 2379.99, 800.00, '["Bluetooth", "Backup Camera", "Navigation", "Full Self-Driving Capability", "Premium Audio", "Panoramic Glass Roof", "Tow Hitch"]', 'Versatile electric SUV with spacious interior and impressive range.', 'https://images.pexels.com/photos/3874341/pexels-photo-3874341.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_iad),
    ('BMW', 'iX xDrive50', 2024, electric_id, 'ELE3030', 'WBAAF0C08L1234567', 'Grey', 5, 'automatic', 'electric', 2900, 149.99, 899.99, 3249.99, 1000.00, '["Bluetooth", "Backup Camera", "Navigation", "BMW Operating System 8", "Harman Kardon Audio", "Panoramic Roof", "Driving Assistant Pro"]', 'Premium electric SUV with BMW luxury and innovation. Sustainable luxury driving.', 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800', 'available', loc_bwi);
END $$;

-- Insert some Promo Codes
INSERT INTO promo_codes (code, description, discount_type, discount_value, min_order_amount, max_discount_amount, usage_limit, valid_from, valid_until, is_active) VALUES
('FIRSTTIMER', 'First time customer discount - 15% off', 'percentage', 15, 100, 100, 1000, now(), '2027-12-31', true),
('WEEKEND50', 'Save $50 on weekend rentals', 'fixed', 50, 200, 50, 500, now(), '2027-12-31', true),
('SUMMER2026', 'Summer special - 20% off', 'percentage', 20, 150, 150, 2000, now(), '2026-09-30', true)
ON CONFLICT (code) DO NOTHING;