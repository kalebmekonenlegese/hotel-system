import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RoomCard from '../components/RoomCard';
import { rooms } from '../data/mockData';

const RoomsPage = () => {
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  
  const filteredRooms = rooms.filter(room => {
    if (filter !== 'all' && room.type !== filter) return false;
    if (room.price > priceRange) return false;
    return true;
  });
  
  const roomTypes = ['all', 'standard', 'executive', 'deluxe', 'suite', 'penthouse'];
  
  return (
    <div className="pt-32 pb-20 bg-luxury-gray">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-playfair text-luxury-dark mb-4">
            Our Luxurious Rooms
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our selection of elegantly appointed rooms and suites
          </p>
        </motion.div>
        
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {roomTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                    filter === type
                      ? 'bg-luxury-gold text-luxury-dark font-semibold'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Max Price: ${priceRange}</span>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-48 accent-luxury-gold"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
        
        {filteredRooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No rooms found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;