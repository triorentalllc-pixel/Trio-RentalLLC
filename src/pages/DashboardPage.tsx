import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { useReservations } from '@/hooks/useData';
import Layout from '@/components/layout/Layout';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { InlineLoader } from '@/components/ui/LoadingSpinner';

const tabs = ['Reservations', 'Profile', 'Notifications'];

export default function DashboardPage() {
  const { user, customer } = useAuth();
  const { reservations, loading } = useReservations(user?.id);
  const [activeTab, setActiveTab] = useState(0);

  const activeReservation = reservations.find(
    (r: any) => r.status === 'confirmed' || r.status === 'active'
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="info">Confirmed</Badge>;
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'completed':
        return <Badge>Completed</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-serif text-navy mb-4">Please sign in</h2>
            <Link to="/login?redirect=/dashboard">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl text-white mb-2">Welcome, {customer?.first_name || user.email}</h1>
          <p className="text-white/70">Manage your reservations and account settings</p>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeReservation && (
            <div className="mb-8">
              <Card className="bg-gradient-to-r from-navy to-navy-mid text-white">
                <CardBody className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/70 text-sm mb-1">Your Current Rental</p>
                      <h3 className="text-xl font-medium mb-2">
                        {activeReservation.vehicle?.year} {activeReservation.vehicle?.make} {activeReservation.vehicle?.model}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <p className="text-white/70">Pick-up</p>
                          <p className="font-medium">
                            {format(new Date(activeReservation.pickup_date), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/70">Return</p>
                          <p className="font-medium">
                            {format(new Date(activeReservation.dropoff_date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gold text-2xl font-bold">
                        {activeReservation.confirmation_number}
                      </p>
                      <p className="text-white/70 text-sm mb-2">Confirmation #</p>
                      {getStatusBadge(activeReservation.status)}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === index
                        ? 'text-gold border-b-2 border-gold'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-serif text-navy">Your Reservations</h3>
                    <Link to="/fleet">
                      <Button variant="outline" size="sm">
                        Book New Rental
                      </Button>
                    </Link>
                  </div>

                  {loading ? (
                    <InlineLoader message="Loading reservations..." />
                  ) : reservations.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h4 className="text-lg font-medium text-navy mb-2">No Reservations Yet</h4>
                      <p className="text-gray-500 mb-6">You don't have any reservations. Start by browsing our fleet!</p>
                      <Link to="/fleet">
                        <Button>Browse Vehicles</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reservations.map((reservation: any) => (
                        <div
                          key={reservation.id}
                          className="border rounded-lg p-4 hover:border-gold transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <img
                                src={reservation.vehicle?.primary_image || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=200'}
                                alt=""
                                className="w-24 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <h4 className="font-medium text-navy">
                                  {reservation.vehicle?.year} {reservation.vehicle?.make} {reservation.vehicle?.model}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {format(new Date(reservation.pickup_date), 'MMM d')} - {format(new Date(reservation.dropoff_date), 'MMM d, yyyy')}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  Confirmation: {reservation.confirmation_number}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(reservation.status)}
                              <p className="text-lg font-bold text-navy mt-2">
                                ${reservation.total_amount.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 1 && (
                <div>
                  <h3 className="text-xl font-serif text-navy mb-6">Profile Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-navy">{user.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-navy">{customer?.phone || 'Not provided'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">First Name</p>
                      <p className="font-medium text-navy">{customer?.first_name || 'Not provided'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Last Name</p>
                      <p className="font-medium text-navy">{customer?.last_name || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <h3 className="text-xl font-serif text-navy mb-6">Notifications</h3>
                  <p className="text-gray-500">You have no new notifications.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
