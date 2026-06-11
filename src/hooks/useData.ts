import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';
import type { Location, VehicleCategory } from '@/types/database';

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      const { data, error: supabaseError } = await supabase
        .from('locations')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setLocations(data || []);
      }
      setLoading(false);
    }

    fetchLocations();
  }, []);

  return { locations, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<VehicleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error: supabaseError } = await supabase
        .from('vehicle_categories')
        .select('*')
        .order('display_order');

      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setCategories(data || []);
      }
      setLoading(false);
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export function useVehicles(categoryId?: string) {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVehicles() {
      let query = supabase
        .from('vehicles')
        .select(`
          *,
          category:vehicle_categories(*),
          location:locations(*)
        `)
        .in('status', ['available', 'rented'])
        .order('daily_rate', { ascending: true });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setVehicles(data || []);
      }
      setLoading(false);
    }

    fetchVehicles();
  }, [categoryId]);

  return { vehicles, loading, error };
}

export function useVehicle(vehicleId: string | undefined) {
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) {
      setLoading(false);
      return;
    }

    async function fetchVehicle() {
      const { data, error: supabaseError } = await supabase
        .from('vehicles')
        .select(`
          *,
          category:vehicle_categories(*),
          location:locations(*)
        `)
        .eq('id', vehicleId)
        .maybeSingle();

      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setVehicle(data);
      }
      setLoading(false);
    }

    fetchVehicle();
  }, [vehicleId]);

  return { vehicle, loading, error };
}

export function useReservations(userId: string | undefined) {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchReservations() {
      const { data, error: supabaseError } = await supabase
        .from('reservations')
        .select(`
          *,
          vehicle:vehicles(*, category:vehicle_categories(*)),
          pickup_location:locations!reservations_pickup_location_id_fkey(*),
          dropoff_location:locations!reservations_dropoff_location_id_fkey(*)
        `)
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setReservations(data || []);
      }
      setLoading(false);
    }

    fetchReservations();
  }, [userId]);

  return { reservations, loading, error, setReservations };
}

export function useReviews(vehicleId: string | undefined) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) {
      setLoading(false);
      return;
    }

    async function fetchReviews() {
      const { data, error: supabaseError } = await supabase
        .from('reviews')
        .select(`
          *,
          customer:customers(first_name, last_name)
        `)
        .eq('vehicle_id', vehicleId)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(10);

      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setReviews(data || []);
      }
      setLoading(false);
    }

    fetchReviews();
  }, [vehicleId]);

  return { reviews, loading, error };
}
