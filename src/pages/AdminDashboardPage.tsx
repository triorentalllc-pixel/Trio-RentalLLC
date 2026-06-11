import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import supabase from '@/lib/supabase';
import type { Vehicle, Reservation, Customer, Location } from '@/types/database';
import Button from '@/components/ui/Button';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

type Tab = 'dashboard' | 'vehicles' | 'reservations' | 'customers';

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [, setLoading] = useState(true);

  // Data
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [locations] = useState<Location[]>([]);

  // Stats
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    totalReservations: 0,
    activeRentals: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    if (!isAdmin) return;
    fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);

    const [vehiclesRes, reservationsRes, customersRes, locationsRes] = await Promise.all([
      supabase.from('vehicles').select('*, category:vehicle_categories(*), location:locations(*)').order('created_at', { ascending: false }),
      supabase.from('reservations').select('*, vehicle:vehicles(*), customer:customers(*), pickup_location:locations!reservations_pickup_location_id_fkey(*), dropoff_location:locations!reservations_dropoff_location_id_fkey(*)').order('created_at', { ascending: false }).limit(50),
      supabase.from('customers').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('locations').select('*').order('name'),
    ]);

    if (vehiclesRes.data) {
      setVehicles(vehiclesRes.data);
      const available = vehiclesRes.data.filter((v: Vehicle) => v.status === 'available').length;
      setStats((prev) => ({ ...prev, totalVehicles: vehiclesRes.data.length, availableVehicles: available }));
    }

    if (reservationsRes.data) {
      setReservations(reservationsRes.data);
      const active = reservationsRes.data.filter((r: Reservation) => r.status === 'active' || r.status === 'confirmed').length;
      const revenue = reservationsRes.data
        .filter((r: Reservation) => r.status === 'completed')
        .reduce((sum: number, r: Reservation) => sum + r.total_amount, 0);
      setStats((prev) => ({ ...prev, totalReservations: reservationsRes.data.length, activeRentals: active, totalRevenue: revenue }));
    }

    if (customersRes.data) {
      setCustomers(customersRes.data);
      setStats((prev) => ({ ...prev, totalCustomers: customersRes.data.length }));
    }

    if (locationsRes.data) {
      // Locations data available if needed
    }

    setLoading(false);
  };

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-navy min-h-screen flex-shrink-0">
          <div className="p-6">
            <h2 className="font-serif text-xl text-white mb-8">Admin Panel</h2>
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { id: 'vehicles', label: 'Vehicles', icon: 'M11 19l-7-7 7-7m8 14l-7-7 7-7' },
                { id: 'reservations', label: 'Reservations', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                { id: 'customers', label: 'Customers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-gold text-navy'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="font-serif text-3xl text-navy mb-8">Dashboard</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardBody>
                    <p className="text-sm text-gray-500 mb-1">Total Vehicles</p>
                    <p className="text-3xl font-bold text-navy">{stats.totalVehicles}</p>
                    <p className="text-sm text-green-600 mt-2">{stats.availableVehicles} available</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <p className="text-sm text-gray-500 mb-1">Total Reservations</p>
                    <p className="text-3xl font-bold text-navy">{stats.totalReservations}</p>
                    <p className="text-sm text-blue-600 mt-2">{stats.activeRentals} active</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-navy">${stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-2">Lifetime</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <p className="text-sm text-gray-500 mb-1">Customers</p>
                    <p className="text-3xl font-bold text-navy">{stats.totalCustomers}</p>
                    <p className="text-sm text-gray-500 mt-2">Registered</p>
                  </CardBody>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-navy">Recent Reservations</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {reservations.slice(0, 5).map((res) => (
                        <div key={res.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium text-navy">{res.confirmation_number}</p>
                            <p className="text-sm text-gray-500">{res.customer?.first_name} {res.customer?.last_name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-navy">${res.total_amount}</p>
                            <p className="text-sm text-gray-500">{format(new Date(res.created_at), 'MMM d')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-navy">Vehicle Status</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Available</span>
                        <span className="font-bold text-green-600">{vehicles.filter((v) => v.status === 'available').length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rented</span>
                        <span className="font-bold text-blue-600">{vehicles.filter((v) => v.status === 'rented').length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Maintenance</span>
                        <span className="font-bold text-yellow-600">{vehicles.filter((v) => v.status === 'maintenance').length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Retired</span>
                        <span className="font-bold text-gray-400">{vehicles.filter((v) => v.status === 'retired').length}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'vehicles' && <VehiclesTab vehicles={vehicles} locations={locations} onRefresh={fetchData} />}
          {activeTab === 'reservations' && <ReservationsTab reservations={reservations} onRefresh={fetchData} />}
          {activeTab === 'customers' && <CustomersTab customers={customers} />}
        </main>
      </div>
    </div>
  );
}

function VehiclesTab({ vehicles, onRefresh }: { vehicles: Vehicle[]; locations: Location[]; onRefresh: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-navy">Vehicles</h1>
        <Button onClick={() => { setEditingVehicle(null); setShowModal(true); }}>
          Add Vehicle
        </Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Vehicle</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Category</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Daily Rate</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Location</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={vehicle.primary_image || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=100'}
                          alt=""
                          className="w-12 h-8 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-navy">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                          <p className="text-sm text-gray-500">{vehicle.license_plate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{vehicle.category?.name}</td>
                    <td className="px-6 py-4 font-medium text-navy">${vehicle.daily_rate}/day</td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        vehicle.status === 'available' ? 'success' :
                        vehicle.status === 'rented' ? 'warning' :
                        vehicle.status === 'maintenance' ? 'info' : 'default'
                      }>
                        {vehicle.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{vehicle.location?.name || 'Unassigned'}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-gray-500 cursor-pointer hover:text-gold" onClick={() => { setEditingVehicle(vehicle); setShowModal(true); }}>
                        Edit
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <VehicleModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingVehicle(null); }}
        vehicle={editingVehicle}
        locations={[]}
        onSave={onRefresh}
      />
    </div>
  );
}

function ReservationsTab({ reservations }: { reservations: Reservation[]; onRefresh: () => void }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'confirmed': return <Badge variant="info">Confirmed</Badge>;
      case 'active': return <Badge variant="success">Active</Badge>;
      case 'completed': return <Badge>Completed</Badge>;
      case 'cancelled': return <Badge variant="danger">Cancelled</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div>
      <h1 className="font-serif text-3xl text-navy mb-8">Reservations</h1>

      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Confirmation</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Customer</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Vehicle</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Dates</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Total</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-gold">{res.confirmation_number}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-navy">{res.customer?.first_name} {res.customer?.last_name}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{res.vehicle?.make} {res.vehicle?.model}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {format(new Date(res.pickup_date), 'MMM d')} - {format(new Date(res.dropoff_date), 'MMM d')}
                    </td>
                    <td className="px-6 py-4 font-medium text-navy">${res.total_amount.toFixed(2)}</td>
                    <td className="px-6 py-4">{getStatusBadge(res.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function CustomersTab({ customers }: { customers: Customer[] }) {
  return (
    <div>
      <h1 className="font-serif text-3xl text-navy mb-8">Customers</h1>

      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Phone</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Verified</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-navy">{customer.first_name} {customer.last_name}</td>
                    <td className="px-6 py-4 text-gray-600">Email in auth.users</td>
                    <td className="px-6 py-4 text-gray-600">{customer.phone || '-'}</td>
                    <td className="px-6 py-4">
                      <Badge variant={customer.is_verified ? 'success' : 'default'}>
                        {customer.is_verified ? 'Verified' : 'Unverified'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(new Date(customer.created_at), 'MMM d, yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function VehicleModal({ isOpen, onClose, vehicle }: { isOpen: boolean; onClose: () => void; vehicle: Vehicle | null; locations: Location[]; onSave: () => void }) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={vehicle ? 'Edit Vehicle' : 'Add Vehicle'} size="lg">
      <p className="text-gray-600">Vehicle form would go here...</p>
      <div className="flex gap-4 mt-6">
        <Button variant="outline" fullWidth onClick={onClose}>Cancel</Button>
        <Button fullWidth>Save</Button>
      </div>
    </Modal>
  );
}
