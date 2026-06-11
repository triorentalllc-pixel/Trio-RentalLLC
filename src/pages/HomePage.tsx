import { Link } from 'react-router-dom';
import SearchForm from '@/components/booking/SearchForm';
import VehicleCard from '@/components/booking/VehicleCard';
import { useVehicles } from '@/hooks/useData';
import { InlineLoader } from '@/components/ui/LoadingSpinner';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Competitive Pricing',
    description: 'Best rates in the DMV area with no hidden fees. Weekly and monthly discounts available.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Fully Insured',
    description: 'All vehicles come with comprehensive insurance coverage for your peace of mind.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Multiple Locations',
    description: 'Convenient pickup and drop-off at airports and downtown locations across DMV.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: '24/7 Support',
    description: 'Our customer service team is available around the clock to assist you.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Washington, DC',
    rating: 5,
    text: 'Trio Rental made my business trip seamless. The car was spotless and ready when I arrived at DCA. Great prices and amazing service!',
  },
  {
    name: 'Michael Chen',
    location: 'Bethesda, MD',
    rating: 5,
    text: 'Family vacation was perfect with the minivan we rented. Spacious, clean, and the kids loved the entertainment system.',
  },
  {
    name: 'Angela Williams',
    location: 'Arlington, VA',
    rating: 5,
    text: 'I have rented from Trio multiple times. Always reliable, always fair prices. Highly recommend for anyone in the DMV area.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Search & Compare',
    description: 'Enter your dates and location to browse our fleet of well-maintained vehicles.',
  },
  {
    number: '02',
    title: 'Book Instantly',
    description: 'Select your vehicle and complete the reservation in minutes with our secure checkout.',
  },
  {
    number: '03',
    title: 'Pick Up & Go',
    description: 'Show up at your selected location and drive away in your rental vehicle.',
  },
  {
    number: '04',
    title: 'Return Easily',
    description: 'Drop off at any of our convenient locations and get back to your day.',
  },
];

export default function HomePage() {
  const { vehicles, loading } = useVehicles();
  const featuredVehicles = vehicles.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 bg-gold/20 border border-gold/40 rounded-full mb-6">
              <span className="text-gold-light font-medium text-sm">Premium Car Rentals in DMV</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Your Journey <span className="text-gold-light">Starts Here</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl">
              Experience premium car rentals across Washington DC, Maryland, and Virginia.
              Competitive rates, diverse fleet, and exceptional service.
            </p>

            <div className="flex flex-wrap gap-8 mb-12">
              <div>
                <p className="text-3xl font-bold text-gold-light">50+</p>
                <p className="text-white/70 text-sm">Vehicles</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gold-light">8</p>
                <p className="text-white/70 text-sm">Locations</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gold-light">10K+</p>
                <p className="text-white/70 text-sm">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Form Section */}
      <section className="relative -mt-24 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchForm />
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-2">Featured Vehicles</h2>
              <p className="text-gray-600">Explore our most popular rental options</p>
            </div>
            <Link to="/fleet" className="text-gold hover:text-gold-light font-medium transition-colors">
              View All Vehicles &rarr;
            </Link>
          </div>

          {loading ? (
            <InlineLoader message="Loading vehicles..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Why Choose Trio Rental?</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We are committed to providing the best car rental experience in the DMV area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 text-gold-light mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Renting a car with Trio is simple and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-gold/20">{step.number}</div>
                <h3 className="text-xl font-semibold text-navy mb-2 -mt-8">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gold/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-navy">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-navy-mid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Ready to Hit the Road?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Book your rental today and experience the Trio difference.
          </p>
          <Link to="/fleet">
            <button className="inline-flex items-center px-8 py-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Browse Our Fleet
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
