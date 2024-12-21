import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const FilterBar = () => {
  const [vehicleType, setVehicleType] = React.useState<string>('');
  const [seats, setSeats] = React.useState<string>('');
  const [delivery, setDelivery] = React.useState<string>('');
  const [sortBy, setSortBy] = React.useState<string>('recommended');
  const [price, setPrice] = React.useState<string>('');

  return (
    <div className="max-w-[90rem] mx-auto px-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Daily Price Filter */}
          <Select value={price} onValueChange={setPrice}>
            <SelectTrigger className="w-40 h-14 bg-white">
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Daily price</span>
                <SelectValue placeholder="Any price" className="text-lg" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50">$0 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-200">$100 - $200</SelectItem>
              <SelectItem value="200+">$200+</SelectItem>
            </SelectContent>
          </Select>

          {/* Vehicle Type Filter */}
          <Select value={vehicleType} onValueChange={setVehicleType}>
            <SelectTrigger className="w-40 h-14 bg-white">
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Vehicle Type</span>
                <SelectValue placeholder="Any type" className="text-lg" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>

          {/* Seats Filter */}
          <Select value={seats} onValueChange={setSeats}>
            <SelectTrigger className="w-40 h-14 bg-white">
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Seats</span>
                <SelectValue placeholder="Any seats" className="text-lg" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Seats</SelectItem>
              <SelectItem value="4">4 Seats</SelectItem>
              <SelectItem value="5">5 Seats</SelectItem>
              <SelectItem value="7">7 Seats</SelectItem>
              <SelectItem value="8">8+ Seats</SelectItem>
            </SelectContent>
          </Select>

          {/* Delivery Option */}
          <Select value={delivery} onValueChange={setDelivery}>
            <SelectTrigger className="w-40 h-14 bg-white">
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Deliver to Me</span>
                <SelectValue placeholder="Any delivery" className="text-lg" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Delivery Available</SelectItem>
              <SelectItem value="no">No Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48 h-14 bg-white">
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-500">Sort by</span>
              <SelectValue placeholder="Recommended" className="text-lg" />
            </div>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;