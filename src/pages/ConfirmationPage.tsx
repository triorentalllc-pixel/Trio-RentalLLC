import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import supabase from '@/lib/supabase';

export default function ConfirmationPage() {
  const { reservationId } = useParams();
  const { user } = useAuth();
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservation() {
      if (!reservationId) return;

      const { data } = await supabase
        .from('reservations')
        .select(`
          *,
          vehicle:vehicles(*, category:vehicle_categories(*)),
          pickup_location:locations!reservations_pickup_location_id_fkey(*),
          dropoff_location:locations!reservations_dropoff_location_id_fkey(*),
          payments(*)
        `)
        .eq('id', reservationId)
        .maybeSingle();

      if (data) {
        setReservation(data);
      }
      setLoading(false);
    }

    fetchReservation();
  }, [reservationId]);

  if (loading) return <PageLoader />;

  if (!reservation) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-serif text-navy mb-4">Reservation Not Found</h2>
            <Link to="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-navy mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 text-lg">
              Thank you for your reservation. A confirmation email has been sent to {user?.email}
            </p>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-navy px-6 py-4">
              <p className="text-white/70 text-sm">Confirmation Number</p>
              <p className="text-gold font-bold text-2xl font-mono">{reservation.confirmation_number}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Vehicle Info */}
              <div className="flex items-start space-x-4">
                <img
                  src={reservation.vehicle?.primary_image || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=200'}
                  alt=""
                  className="w-32 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-serif text-xl text-navy">
                    {reservation.vehicle?.year} {reservation.vehicle?.make} {reservation.vehicle?.model}
                  </h3>
                  <p className="text-gray-500">{reservation.vehicle?.category?.name}</p>
                </div>
              </div>

              {/* Rental Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-navy mb-3">Pick-up</h4>
                  <p className="font-medium">{format(new Date(reservation.pickup_date), 'EEEE, MMMM d, yyyy')}</p>
                  <p className="text-gray-600">at {reservation.pickup_time}</p>
                  <p className="text-sm text-gray-500 mt-2">{reservation.pickup_location?.name}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-navy mb-3">Return</h4>
                  <p className="font-medium">{format(new Date(reservation.dropoff_date), 'EEEE, MMMM d, yyyy')}</p>
                  <p className="text-gray-600">at {reservation.dropoff_time}</p>
                  <p className="text-sm text-gray-500 mt-2">{reservation.dropoff_location?.name}</p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-navy mb-3">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-navy">${reservation.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span className="text-navy">${reservation.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fees</span>
                    <span className="text-navy">${reservation.fees.toFixed(2)}</span>
                  </div>
                  {reservation.discount_amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${reservation.discount_amount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span className="text-navy">Total Paid</span>
                    <span className="text-navy">${reservation.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-gold/10 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-navy mb-4">Important Information</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Bring a valid driver's license and credit card to pickup</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>A ${reservation.vehicle?.deposit_amount} security deposit will be held on your card</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free cancellation up to 48 hours before pickup</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="outline" fullWidth>
                View My Reservations
              </Button>
            </Link>
            <Link to="/">
              <Button fullWidth>
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
