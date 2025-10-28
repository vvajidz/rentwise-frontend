"use client";

import { CalendarIcon, MapPinIcon, SlidersIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  location: string;
  setLocation: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  onSearch?: (location: string, date: string) => void;
}

export default function SearchBar({
  location,
  setLocation,
  date,
  setDate,
  onSearch,
}: SearchBarProps) {
  const handleSearch = () => {
    if (onSearch) onSearch(location, date);
  };

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white p-3 rounded-xl shadow-sm mb-8 border transition-all sm:justify-between"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {/* Location Input */}
      <div className="flex items-center w-full sm:w-auto flex-1 bg-gray-50 rounded-md px-2 py-1">
        <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
        <Input
          placeholder="City or Street"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border-none focus-visible:ring-0 bg-transparent text-sm h-8"
        />
      </div>

      {/* Date Input */}
      <div className="flex items-center w-full sm:w-auto flex-1 bg-gray-50 rounded-md px-2 py-1">
        <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
        <Input
          placeholder="Move-in Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border-none focus-visible:ring-0 bg-transparent text-sm h-8"
        />
      </div>

      {/* Filter Button */}
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-600 w-full sm:w-auto"
      >
        <SlidersIcon className="w-4 h-4 mr-1" /> Filters
      </Button>

      {/* Search Button */}
      <Button
        size="sm"
        className="px-4 w-full sm:w-auto"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}
