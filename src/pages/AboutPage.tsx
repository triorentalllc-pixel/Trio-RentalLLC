import Layout from '@/components/layout/Layout';

const teamMembers = [
  {
    name: 'James Richardson',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Maria Santos',
    role: 'Operations Director',
    image: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'David Kim',
    role: 'Fleet Manager',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const stats = [
  { number: '50+', label: 'Vehicles' },
  { number: '8', label: 'Locations' },
  { number: '10K+', label: 'Happy Customers' },
  { number: '15+', label: 'Years Experience' },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
              About Trio Rental LLC
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              For over 15 years, we have been providing reliable, affordable, and convenient
              vehicle rental solutions throughout the Washington DC, Maryland, and Virginia area.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl md:text-5xl font-bold text-navy">{stat.number}</p>
                <p className="text-navy/80 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl text-navy mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Trio Rental LLC was founded in 2008 with a simple mission: make car rentals easy,
                  affordable, and stress-free. What started with a fleet of just 5 vehicles has grown
                  into a premier rental service serving the entire DMV region.
                </p>
                <p>
                  Our founders, frustrated with the complicated and often frustrating experience of
                  renting cars from big national chains, envisioned a different kind of rental
                  company—one that puts customers first, maintains transparency in pricing, and
                  provides exceptional service at every touchpoint.
                </p>
                <p>
                  Today, we operate from 8 convenient locations across DC, Maryland, and Virginia,
                  offering a diverse fleet of well-maintained vehicles ranging from economical sedans
                  to luxury cars and spacious SUVs.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3779694/pexels-photo-3779694.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our team"
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold/20 rounded-xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-navy mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and how we serve our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Customer First</h3>
              <p className="text-gray-600">
                Every decision we make starts with the question: How does this benefit our customers?
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Integrity</h3>
              <p className="text-gray-600">
                No hidden fees, no surprises. We believe in transparent pricing and honest communication.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Excellence</h3>
              <p className="text-gray-600">
                From fleet maintenance to customer service, we strive for excellence in every detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-navy mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced team is dedicated to providing you with the best rental experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gold/20"
                />
                <h3 className="text-xl font-semibold text-navy">{member.name}</h3>
                <p className="text-gold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
