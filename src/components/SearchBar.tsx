import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  // Initialize with current date
  const [pickUpDate, setPickUpDate] = React.useState<Date>(new Date());
  
  // Initialize drop-off date as tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [dropOffDate, setDropOffDate] = React.useState<Date>(tomorrow);

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center p-6">
      {/* Pick-up Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-64 h-16 justify-start text-left font-normal bg-white"
          >
            <Calendar className="mr-2 h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-500">Pick-up date</span>
              <span className="text-lg">
                {pickUpDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={pickUpDate}
            onSelect={(date: Date | undefined) => setPickUpDate(date || new Date())}
            initialFocus
            className="rounded-lg"
          />
        </PopoverContent>
      </Popover>

      {/* Drop-off Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-64 h-16 justify-start text-left font-normal bg-white"
          >
            <Calendar className="mr-2 h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-500">Drop-off date</span>
              <span className="text-lg">
                {dropOffDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={dropOffDate}
            onSelect={(date: Date | undefined) => setDropOffDate(date || tomorrow)}
            initialFocus
            className="rounded-lg"
          />
        </PopoverContent>
      </Popover>

      {/* Pick-up Time */}
      <Select defaultValue="10:30">
        <SelectTrigger className="w-64 h-16 bg-white">
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500">Pick-up time</span>
            <SelectValue className="text-lg" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 48 }).map((_, i) => {
            const hour = Math.floor(i / 2);
            const minute = i % 2 === 0 ? '00' : '30';
            const time = `${hour.toString().padStart(2, '0')}:${minute}`;
            return (
              <SelectItem key={time} value={time} className="text-base">
                {time}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* Drop-off Time */}
      <Select defaultValue="10:30">
        <SelectTrigger className="w-64 h-16 bg-white">
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500">Drop-off time</span>
            <SelectValue className="text-lg" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 48 }).map((_, i) => {
            const hour = Math.floor(i / 2);
            const minute = i % 2 === 0 ? '00' : '30';
            const time = `${hour.toString().padStart(2, '0')}:${minute}`;
            return (
              <SelectItem key={time} value={time} className="text-base">
                {time}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* Search Button */}
      <Button className="w-32 h-16 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;