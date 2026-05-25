import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers, FaArrowsAlt, FaBed, FaWifi, FaCoffee, FaTv } from 'react-icons/fa';

const RoomCard = ({ room, index }) => {
  const iconMap = {
    'WiFi': FaWifi,
    'Coffee Maker': FaCoffee,
    'Smart TV': FaTv,
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="card group"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-luxury-gold text-luxury-dark px-3 py-1 rounded-full font-semibold">
          ${room.price}/night
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-playfair mb-2">{room.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
        
        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <div className="flex items-center gap-1">
            <FaUsers />
            <span className="text-sm">{room.capacity} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <FaArrowsAlt />
            <span className="text-sm">{room.size} m²</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBed />
            <span className="text-sm">{room.bedType}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, idx) => {
            const Icon = iconMap[amenity] || FaWifi;
            return (
              <span key={idx} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                <Icon className="text-luxury-gold" />
                {amenity}
              </span>
            );
          })}
        </div>
        
        <Link
          to="/reservation"
          state={{ selectedRoom: room }}
          className="btn-primary inline-block text-center w-full"
        >
          Book This Room
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;