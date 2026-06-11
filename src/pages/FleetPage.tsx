import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VehicleCard from '@/components/booking/VehicleCard';
import { useVehicles, useCategories, useLocations } from '@/hooks/useData';
import { InlineLoader } from '@/components/ui/LoadingSpinner';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

export default function FleetPage() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('price_asc');
  const [priceRange, setPriceRange] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');

  const { vehicles, loading } = useVehicles(selectedCategory);
  const { categories } = useCategories();
  const { locations } = useLocations();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    ...locations.map((loc) => ({ value: loc.id, label: loc.name })),
  ];

  const sortOptions = [
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'year_desc', label: 'Newest First' },
    { value: 'year_asc', label: 'Oldest First' },
    { value: 'name_asc', label: 'Name: A to Z' },
  ];

  const priceOptions = [
    { value: '', label: 'Any Price' },
    { value: '0-50', label: 'Under $50/day' },
    { value: '50-100', label: '$50 - $100/day' },
    { value: '100-150', label: '$100 - $150/day' },
    { value: '150+', label: 'Over $150/day' },
  ];

  const transmissionOptions = [
    { value: '', label: 'Any Transmission' },
    { value: 'automatic', label: 'Automatic' },
    { value: 'manual', label: 'Manual' },
  ];

  let filteredVehicles = vehicles.filter((vehicle) => {
    if (selectedLocation && vehicle.location_id !== selectedLocation) return false;
    if (transmission && vehicle.transmission !== transmission) return false;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map((v) => (v === '+' ? Infinity : parseInt(v, 10)));
      if (vehicle.daily_rate < min || (max !== Infinity && vehicle.daily_rate > max)) return false;
    }
    return true;
  });

  filteredVehicles = filteredVehicles.sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.daily_rate - b.daily_rate;
      case 'price_desc':
        return b.daily_rate - a.daily_rate;
      case 'year_desc':
        return b.year - a.year;
      case 'year_asc':
        return a.year - b.year;
      case 'name_asc':
        return `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedLocation('');
    setSortBy('price_asc');
    setPriceRange('');
    setTransmission('');
  };

  const hasActiveFilters = selectedCategory || selectedLocation || priceRange || transmission;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl text-white mb-4">Our Fleet</h1>
          <p className="text-white/70 max-w-2xl">
            Browse our selection of well-maintained vehicles. From economy cars to luxury sedans,
            we have the perfect vehicle for your needs.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-navy text-lg">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gold hover:text-gold-light transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <Select
                      options={categoryOptions}
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <Select
                      options={locationOptions}
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <Select
                      options={priceOptions}
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transmission
                    </label>
                    <Select
                      options={transmissionOptions}
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Grid */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  <span className="font-medium text-navy">{filteredVehicles.length}</span> vehicles found
                </p>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="min-w-[180px]"
                  />
                </div>
              </div>

              {/* Vehicle Grid */}
              {loading ? (
                <InlineLoader message="Loading vehicles..." />
              ) : filteredVehicles.length === 0 ? (
                <div className="text-center py-16">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-navy mb-2">No vehicles found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters to see more results.</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      searchParams={searchParams.toString()}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
