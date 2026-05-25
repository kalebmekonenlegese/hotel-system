import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaCreditCard, FaHeart, FaBell, FaCog } from 'react-icons/fa';
import { recentBookings } from '../data/mockData';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  
  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: FaCalendarAlt },
    { id: 'payments', label: 'Payments', icon: FaCreditCard },
    { id: 'favorites', label: 'Favorites', icon: FaHeart },
    { id: 'profile', label: 'Profile', icon: FaUser },
  ];
  
  return (
    <div className="pt-32 pb-20 bg-luxury-gray">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:w-80"
          >
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-luxury-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FaUser className="text-white text-4xl" />
                </div>
                <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                <p className="text-gray-600">sarah@example.com</p>
                <div className="mt-2 inline-flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Verified Member
                </div>
              </div>
              
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-luxury-gold text-luxury-dark font-semibold'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <tab.icon />
                    {tab.label}
                  </button>
                ))}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <FaBell />
                  Notifications
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                  <FaCog />
                  Settings
                </button>
              </div>
            </div>
          </motion.aside>
          
          {/* Main Content */}
          <motion.main
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-playfair mb-6">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  {recentBookings.map(booking => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{booking.room}</h4>
                          <p className="text-gray-600">Customer: {booking.customer}</p>
                          <p className="text-gray-600">Dates: {booking.dates}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-luxury-gold">${booking.amount}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'payments' && (
                <div className="space-y-4">
                  {recentBookings.map(booking => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{booking.room}</p>
                          <p className="text-sm text-gray-600">Transaction ID: HAT-{booking.id}234</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${booking.amount}</p>
                          <p className="text-sm text-green-600">Paid on Dec 15, 2024</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'profile' && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">First Name</label>
                      <input type="text" className="input-field" defaultValue="Sarah" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Last Name</label>
                      <input type="text" className="input-field" defaultValue="Johnson" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input type="email" className="input-field" defaultValue="sarah@example.com" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Phone</label>
                      <input type="tel" className="input-field" defaultValue="+251 911 234 567" />
                    </div>
                  </div>
                  <button className="btn-primary">Update Profile</button>
                </form>
              )}
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;