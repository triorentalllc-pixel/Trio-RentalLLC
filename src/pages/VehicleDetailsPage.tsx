import { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { format, differenceInDays, addDays } from 'date-fns';
import { useVehicle, useReviews } from '@/hooks/useData';
import { useAuth } from '@/context/AuthContext';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import supabase from '@/lib/supabase';

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { vehicle, loading, error } = useVehicle(id);
  const { reviews } = useReviews(id);

  const [activeImage, setActiveImage] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<any>(null);
  const [promoError, setPromoError] = useState('');

  const pickupDate = searchParams.get('pickupDate') || format(addDays(new Date(), 1), 'yyyy-MM-dd');
  const dropoffDate = searchParams.get('dropoffDate') || format(addDays(new Date(), 3), 'yyyy-MM-dd');
  const pickupTime = searchParams.get('pickupTime') || '10:00';
  const dropoffTime = searchParams.get('dropoffTime') || '10:00';
  const pickupLocationId = searchParams.get('pickupLocation');
  const dropoffLocationId = searchParams.get('dropoffLocation');

  const rentalDays = Math.max(1, differenceInDays(new Date(dropoffDate), new Date(pickupDate)));
  const dailyRate = vehicle?.daily_rate || 0;

  let subtotal = 0;
  if (rentalDays >= 30 && vehicle?.monthly_rate) {
    const months = Math.floor(rentalDays / 30);
    const remainingDays = rentalDays % 30;
    subtotal = months * vehicle.monthly_rate + remainingDays * dailyRate;
  } else if (rentalDays >= 7 && vehicle?.weekly_rate) {
    const weeks = Math.floor(rentalDays / 7);
    const remainingDays = rentalDays % 7;
    subtotal = weeks * vehicle.weekly_rate + remainingDays * dailyRate;
  } else {
    subtotal = rentalDays * dailyRate;
  }

  const taxes = subtotal * 0.0875;
  const fees = 25;
  const discount = promoApplied
    ? promoApplied.discount_type === 'percentage'
      ? subtotal * (promoApplied.discount_value / 100)
      : Math.min(promoApplied.discount_value, promoApplied.max_discount_amount || Infinity)
    : 0;
  const total = subtotal + taxes + fees - discount;

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) return;

    setPromoError('');
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', promoCode.trim().toUpperCase())
      .eq('is_active', true)
      .maybeSingle();

    if (error || !data) {
      setPromoError('Invalid promo code');
      setPromoApplied(null);
      return;
    }

    const now = new Date();
    if (data.valid_from && new Date(data.valid_from) > now) {
      setPromoError('This promo code is not yet valid');
      setPromoApplied(null);
      return;
    }
    if (data.valid_until && new Date(data.valid_until) < now) {
      setPromoError('This promo code has expired');
      setPromoApplied(null);
      return;
    }
    if (data.min_order_amount && subtotal < data.min_order_amount) {
      setPromoError(`Minimum order amount is $${data.min_order_amount}`);
      setPromoApplied(null);
      return;
    }
    if (data.usage_limit && data.usage_count >= data.usage_limit) {
      setPromoError('This promo code has reached its usage limit');
      setPromoApplied(null);
      return;
    }

    setPromoApplied(data);
    toast.success('Promo code applied!');
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search));
      return;
    }

    if (vehicle?.status !== 'available') {
      toast.error('This vehicle is not currently available');
      return;
    }

    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!user || !vehicle || !pickupLocationId || !dropoffLocationId) {
      toast.error('Missing required information');
      return;
    }

    setIsBooking(true);

    try {
      const { data: pickupLocation } = await supabase
        .from('locations')
        .select('*')
        .eq('id', pickupLocationId)
        .maybeSingle();

      const { data: dropoffLocation } = await supabase
        .from('locations')
        .select('*')
        .eq('id', dropoffLocationId)
        .maybeSingle();

      if (!pickupLocation || !dropoffLocation) {
        toast.error('Invalid pickup or dropoff location');
        setIsBooking(false);
        return;
      }

      const { data: reservation, error: reservationError } = await supabase
        .from('reservations')
        .insert({
          customer_id: user.id,
          vehicle_id: vehicle.id,
          pickup_location_id: pickupLocationId,
          dropoff_location_id: dropoffLocationId,
          pickup_date: pickupDate,
          pickup_time: pickupTime,
          dropoff_date: dropoffDate,
          dropoff_time: dropoffTime,
          status: 'pending',
          daily_rate: vehicle.daily_rate,
          subtotal,
          taxes,
          fees,
          discount_amount: discount,
          total_amount: total,
          promo_code: promoApplied?.code,
        })
        .select()
        .single();

      if (reservationError) throw reservationError;

      if (promoApplied) {
        await supabase
          .from('promo_codes')
          .update({ usage_count: promoApplied.usage_count + 1 })
          .eq('id', promoApplied.id);
      }

      toast.success('Reservation created successfully!');
      setShowBookingModal(false);
      navigate(`/checkout/${reservation.id}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to create reservation');
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) return <PageLoader />;
  if (error || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-navy mb-4">Vehicle Not Found</h2>
          <p className="text-gray-500 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
          <Link to="/fleet">
            <Button>Browse Fleet</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = vehicle.images?.length > 0
    ? vehicle.images
    : [vehicle.primary_image || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-gray-400 hover:text-gold">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link to="/fleet" className="text-gray-400 hover:text-gold">Fleet</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-navy">{vehicle.make} {vehicle.model}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={images[activeImage]}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  {vehicle.status === 'available' ? (
                    <Badge variant="success">Available</Badge>
                  ) : (
                    <Badge variant="warning">Currently Rented</Badge>
                  )}
                </div>
              </div>
              {images.length > 1 && (
                <div className="flex space-x-2 p-4 overflow-x-auto">
                  {images.map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImage === index ? 'border-gold' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-serif text-navy">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
                    <p className="text-gray-500">{vehicle.category?.name}</p>
                  </div>
                  <span className="text-2xl font-bold text-navy">${vehicle.daily_rate}<span className="text-sm text-gray-500">/day</span></span>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600 mb-6">{vehicle.description}</p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1h0" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Passengers</p>
                      <p className="font-medium text-navy">{vehicle.passenger_capacity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Transmission</p>
                      <p className="font-medium text-navy capitalize">{vehicle.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Fuel Type</p>
                      <p className="font-medium text-navy capitalize">{vehicle.fuel_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Color</p>
                      <p className="font-medium text-navy capitalize">{vehicle.color || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <h3 className="font-semibold text-navy mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features?.map((feature: string, index: number) => (
                    <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full bg-gold/10 text-gold text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Reviews */}
            {reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-navy">Customer Reviews</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  {reviews.map((review: any) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                            <span className="text-gold font-medium text-sm">
                              {review.customer?.first_name?.[0]}{review.customer?.last_name?.[0]}
                            </span>
                          </div>
                          <span className="font-medium text-navy">
                            {review.customer?.first_name} {review.customer?.last_name?.[0]}.
                          </span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-gold' : 'text-gray-200'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      {review.comment && <p className="text-gray-600 text-sm">{review.comment}</p>}
                      <p className="text-xs text-gray-400 mt-1">
                        {format(new Date(review.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                  ))}
                </CardBody>
              </Card>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div>
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-navy">Rental Details</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pick-up</span>
                      <span className="text-navy font-medium">{format(new Date(pickupDate), 'MMM d, yyyy')} at {pickupTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Drop-off</span>
                      <span className="text-navy font-medium">{format(new Date(dropoffDate), 'MMM d, yyyy')} at {dropoffTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="text-navy font-medium">{rentalDays} day{rentalDays !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-navy">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes (8.75%)</span>
                      <span className="text-navy">${taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fees</span>
                      <span className="text-navy">${fees.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div className="flex justify-between">
                    <span className="font-semibold text-navy">Total</span>
                    <span className="font-bold text-2xl text-navy">${total.toFixed(2)}</span>
                  </div>

                  {/* Promo Code */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        error={promoError}
                      />
                      <Button variant="outline" onClick={handleApplyPromoCode} disabled={!promoCode}>
                        Apply
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-sm text-green-600">Promo code applied: {promoApplied.code}</p>
                    )}
                  </div>

                  <Button
                    fullWidth
                    size="lg"
                    onClick={handleBookNow}
                    disabled={vehicle.status !== 'available' || !pickupLocationId}
                  >
                    {vehicle.status === 'available' ? 'Book Now' : 'Currently Unavailable'}
                  </Button>

                  {!pickupLocationId && (
                    <p className="text-sm text-orange-600 text-center">
                      Please select pickup location first
                    </p>
                  )}

                  <div className="flex items-center justify-center space-x-4 pt-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Free Cancellation</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Pay Later Option</span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Deposit Info */}
              <div className="mt-4 bg-gold/10 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gold mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-navy text-sm">Security Deposit</p>
                    <p className="text-gray-600 text-xs">A ${vehicle.deposit_amount} refundable deposit is required at pickup.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Confirm Your Booking"
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-navy mb-2">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle</span>
                <span className="font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pick-up</span>
                <span>{format(new Date(pickupDate), 'MMM d, yyyy')} at {pickupTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Drop-off</span>
                <span>{format(new Date(dropoffDate), 'MMM d, yyyy')} at {dropoffTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span>{rentalDays} day{rentalDays !== 1 ? 's' : ''}</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            By confirming this booking, you agree to our rental terms and conditions. A valid driver's license
            and credit card will be required at pickup.
          </p>

          <div className="flex gap-4">
            <Button variant="outline" fullWidth onClick={() => setShowBookingModal(false)}>
              Cancel
            </Button>
            <Button fullWidth onClick={handleConfirmBooking} isLoading={isBooking}>
              Confirm Booking
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
