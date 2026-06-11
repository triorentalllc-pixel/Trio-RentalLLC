import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Layout from '@/components/layout/Layout';
import toast from 'react-hot-toast';
import supabase from '@/lib/supabase';

export default function CheckoutPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  useEffect(() => {
    async function fetchReservation() {
      if (!reservationId || !user) return;

      const { data, error } = await supabase
        .from('reservations')
        .select(`
          *,
          vehicle:vehicles(*, category:vehicle_categories(*)),
          pickup_location:locations!reservations_pickup_location_id_fkey(*),
          dropoff_location:locations!reservations_dropoff_location_id_fkey(*)
        `)
        .eq('id', reservationId)
        .maybeSingle();

      if (error || !data) {
        toast.error('Reservation not found');
        navigate('/dashboard');
        return;
      }

      setReservation(data);
      setLoading(false);
    }

    fetchReservation();
  }, [reservationId, user, navigate]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate payment processing (in production, integrate with Stripe)
    setProcessing(true);

    try {
      // In a real app, you would:
      // 1. Create a Stripe PaymentIntent via edge function
      // 2. Confirm the payment with Stripe.js
      // 3. Handle the result

      // For demo, simulate successful payment
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const { error: paymentError } = await supabase.from('payments').insert({
        reservation_id: reservation.id,
        customer_id: user!.id,
        amount: reservation.total_amount,
        currency: 'USD',
        payment_method: 'card',
        payment_provider: 'stripe',
        provider_transaction_id: `sim_${Date.now()}`,
        status: 'completed',
        card_last_four: cardInfo.number.slice(-4) || '4242',
        card_brand: 'Visa',
      });

      if (paymentError) throw paymentError;

      const { error: updateError } = await supabase
        .from('reservations')
        .update({ status: 'confirmed' })
        .eq('id', reservation.id);

      if (updateError) throw updateError;

      toast.success('Payment successful!');
      navigate(`/confirmation/${reservation.id}`);
    } catch (err: any) {
      toast.error(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <PageLoader />;
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl text-navy mb-2">Complete Your Reservation</h1>
            <p className="text-gray-600">Review your booking details and complete payment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-navy">Payment Information</h2>
                </CardHeader>
                <CardBody>
                  <form onSubmit={handlePayment} className="space-y-4">
                    <Input
                      label="Cardholder Name"
                      value={cardInfo.name}
                      onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                    <Input
                      label="Card Number"
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                      placeholder="4242 4242 4242 4242"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        value={cardInfo.expiry}
                        onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                        placeholder="MM/YY"
                        required
                      />
                      <Input
                        label="CVV"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                        placeholder="123"
                        required
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mt-4">
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <div className="text-sm">
                          <p className="font-medium text-blue-900">Secure Payment</p>
                          <p className="text-blue-700">Your payment information is encrypted and secure.</p>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" fullWidth size="lg" isLoading={processing}>
                      Pay ${reservation.total_amount.toFixed(2)}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-navy">Booking Summary</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex items-start space-x-4 mb-6">
                    <img
                      src={reservation.vehicle?.primary_image || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=200'}
                      alt=""
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-navy">
                        {reservation.vehicle?.year} {reservation.vehicle?.make} {reservation.vehicle?.model}
                      </h3>
                      <p className="text-sm text-gray-500">{reservation.vehicle?.category?.name}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confirmation #</span>
                      <span className="font-medium text-gold">{reservation.confirmation_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pick-up</span>
                      <span className="font-medium text-navy">
                        {format(new Date(reservation.pickup_date), 'MMM d, yyyy')} at {reservation.pickup_time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Drop-off</span>
                      <span className="font-medium text-navy">
                        {format(new Date(reservation.dropoff_date), 'MMM d, yyyy')} at {reservation.dropoff_time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pick-up Location</span>
                      <span className="font-medium text-navy">{reservation.pickup_location?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Drop-off Location</span>
                      <span className="font-medium text-navy">{reservation.dropoff_location?.name}</span>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 my-4" />

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
                  </div>

                  <div className="h-px bg-gray-200 my-4" />

                  <div className="flex justify-between">
                    <span className="font-semibold text-navy">Total</span>
                    <span className="font-bold text-2xl text-navy">${reservation.total_amount.toFixed(2)}</span>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <Link to="/terms" className="text-sm text-gold hover:text-gold-light transition-colors">
                  View Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
