import { Link } from 'react-router-dom';
import Card, { CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import type { Vehicle } from '@/types/database';

interface VehicleCardProps {
  vehicle: Vehicle;
  searchParams?: string;
}

export default function VehicleCard({ vehicle, searchParams }: VehicleCardProps) {
  const detailsLink = searchParams
    ? `/vehicles/${vehicle.id}?${searchParams}`
    : `/vehicles/${vehicle.id}`;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = () => {
    if (vehicle.status === 'rented') {
      return <Badge variant="warning">Currently Rented</Badge>;
    }
    return <Badge variant="success">Available</Badge>;
  };

  return (
    <Card hoverable className="h-full">
      <Link to={detailsLink} className="block h-full">
        <div className="relative">
          <img
            src={vehicle.primary_image || `https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600`}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            {getStatusBadge()}
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 px-2 py-1 rounded text-sm font-medium text-navy">
              {vehicle.category?.name}
            </span>
          </div>
        </div>
        <CardBody>
          <h3 className="font-serif text-xl text-navy mb-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {vehicle.transmission === 'automatic' ? 'Automatic' : 'Manual'} &bull;{' '}
            {vehicle.fuel_type === 'gasoline' ? 'Gas' : vehicle.fuel_type === 'electric' ? 'Electric' : vehicle.fuel_type} &bull;{' '}
            {vehicle.passenger_capacity} Seats
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {vehicle.features.slice(0, 4).map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
              >
                {feature}
              </span>
            ))}
            {vehicle.features.length > 4 && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                +{vehicle.features.length - 4} more
              </span>
            )}
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div>
              <span className="text-2xl font-bold text-navy">
                {formatPrice(vehicle.daily_rate)}
              </span>
              <span className="text-gray-500 text-sm"> /day</span>
            </div>
            {vehicle.weekly_rate && (
              <div className="text-right">
                <span className="text-xs text-gray-500">Weekly</span>
                <p className="text-gold font-semibold">{formatPrice(vehicle.weekly_rate)}</p>
              </div>
            )}
          </div>
        </CardBody>
      </Link>
    </Card>
  );
}
