import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { useLocations, useCategories } from '@/hooks/useData';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { locations, loading: loadingLocations } = useLocations();
  const { categories, loading: loadingCategories } = useCategories();

  const [formData, setFormData] = useState({
    pickupLocation: searchParams.get('pickupLocation') || '',
    dropoffLocation: searchParams.get('dropoffLocation') || '',
    pickupDate: searchParams.get('pickupDate') || format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    pickupTime: searchParams.get('pickupTime') || '10:00',
    dropoffDate: searchParams.get('dropoffDate') || format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    dropoffTime: searchParams.get('dropoffTime') || '10:00',
    category: searchParams.get('category') || '',
  });

  const [sameLocation, setSameLocation] = useState(true);

  useEffect(() => {
    if (formData.pickupLocation && !formData.dropoffLocation) {
      setFormData((prev) => ({ ...prev, dropoffLocation: prev.pickupLocation }));
    }
  }, [formData.pickupLocation, formData.dropoffLocation]);

  useEffect(() => {
    if (sameLocation && formData.pickupLocation) {
      setFormData((prev) => ({ ...prev, dropoffLocation: prev.pickupLocation }));
    }
  }, [sameLocation, formData.pickupLocation]);

  const locationOptions = locations.map((loc) => ({
    value: loc.id,
    label: loc.name,
  }));

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })),
  ];

  const timeOptions = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
      timeOptions.push({ value: time, label: displayTime });
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(formData as Record<string, string>);
    navigate(`/fleet?${params.toString()}`);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isLoading = loadingLocations || loadingCategories;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Pick-up Location
            </label>
            <Select
              options={locationOptions}
              value={formData.pickupLocation}
              onChange={(e) => handleChange('pickupLocation', e.target.value)}
              placeholder="Select location..."
              disabled={isLoading}
              required
            />
          </div>
          {!sameLocation && (
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Drop-off Location
              </label>
              <Select
                options={locationOptions}
                value={formData.dropoffLocation}
                onChange={(e) => handleChange('dropoffLocation', e.target.value)}
                placeholder="Select location..."
                disabled={isLoading}
                required
              />
            </div>
          )}
          <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={sameLocation}
              onChange={(e) => setSameLocation(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
            />
            <span>Return to same location</span>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Pick-up Date
            </label>
            <input
              type="date"
              value={formData.pickupDate}
              onChange={(e) => handleChange('pickupDate', e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Pick-up Time
            </label>
            <Select
              options={timeOptions}
              value={formData.pickupTime}
              onChange={(e) => handleChange('pickupTime', e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Drop-off Date
            </label>
            <input
              type="date"
              value={formData.dropoffDate}
              onChange={(e) => handleChange('dropoffDate', e.target.value)}
              min={formData.pickupDate}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Drop-off Time
            </label>
            <Select
              options={timeOptions}
              value={formData.dropoffTime}
              onChange={(e) => handleChange('dropoffTime', e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Vehicle Category
            </label>
            <Select
              options={categoryOptions}
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="pt-2">
            <Button type="submit" fullWidth size="lg" disabled={isLoading}>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Vehicles
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
