import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa';

const ReservationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRoom = location.state?.selectedRoom || null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkInDate: '',
    checkOutDate: ''
  });
  const [formData, setFormData] = useState({
    roomId: selectedRoom?.id || '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkInDate: '',
    checkOutDate: ''
  });

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone) return 'Phone is required';
    const phoneRegex = /^[\d\s\-()+]{7,}$/;
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number (at least 7 digits)';
    return '';
  };

  const validateGuestName = (name) => {
    if (!name.trim()) return 'Guest name is required';
    return '';
  };

  const validateCheckInDate = (date) => {
    if (!date) return 'Check-in date is required';
    const checkInDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (checkInDate < today) return 'Check-in date cannot be in the past';
    return '';
  };

  const validateCheckOutDate = (date) => {
    if (!date) return 'Check-out date is required';
    const checkOutDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (checkOutDate < today) return 'Check-out date cannot be in the past';
    return '';
  };

  const validateDateRange = () => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      if (checkOut <= checkIn) return 'Check-out date must be after check-in date';
    }
    return '';
  };

  const validateForm = () => {
    const errors = {};
    errors.guestName = validateGuestName(formData.guestName);
    errors.guestEmail = validateEmail(formData.guestEmail);
    errors.guestPhone = validatePhone(formData.guestPhone);
    errors.checkInDate = validateCheckInDate(formData.checkInDate);
    errors.checkOutDate = validateCheckOutDate(formData.checkOutDate);
    
    const dateRangeError = validateDateRange();
    if (dateRangeError) {
      errors.checkOutDate = dateRangeError;
    }

    setFieldErrors(errors);
    return Object.values(errors).every(e => e === '');
  };

  const hasErrors = () => {
    return Object.values(fieldErrors).some(e => e !== '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');

    // Real-time validation
    let fieldError = '';
    if (name === 'guestName') {
      fieldError = validateGuestName(value);
    } else if (name === 'guestEmail') {
      fieldError = validateEmail(value);
    } else if (name === 'guestPhone') {
      fieldError = validatePhone(value);
    } else if (name === 'checkInDate') {
      fieldError = validateCheckInDate(value);
    } else if (name === 'checkOutDate') {
      fieldError = validateCheckOutDate(value);
      if (!fieldError) {
        fieldError = validateDateRange();
      }
    }

    setFieldErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const handleFieldBlur = (fieldName) => {
    let fieldError = '';
    if (fieldName === 'guestName') {
      fieldError = validateGuestName(formData.guestName);
    } else if (fieldName === 'guestEmail') {
      fieldError = validateEmail(formData.guestEmail);
    } else if (fieldName === 'guestPhone') {
      fieldError = validatePhone(formData.guestPhone);
    } else if (fieldName === 'checkInDate') {
      fieldError = validateCheckInDate(formData.checkInDate);
    } else if (fieldName === 'checkOutDate') {
      fieldError = validateCheckOutDate(formData.checkOutDate);
      if (!fieldError) {
        fieldError = validateDateRange();
      }
    }

    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: fieldError
    }));
  };

  const calculateNights = () => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const price = selectedRoom?.price || 0;
    return nights * price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Please fix all validation errors');
      return;
    }

    if (!selectedRoom) {
      setError('Please select a room');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: selectedRoom.id,
          guest_name: formData.guestName,
          guest_email: formData.guestEmail,
          guest_phone: formData.guestPhone,
          check_in_date: formData.checkInDate,
          check_out_date: formData.checkOutDate
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create reservation');
      }

      const reservation = await response.json();
      navigate('/payment', { state: { reservation, selectedRoom } });
    } catch (err) {
      setError(err.message || 'An error occurred while creating reservation');
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!selectedRoom) {
    return (
      <div className="pt-32 pb-20 bg-luxury-gray">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl font-playfair mb-4">No Room Selected</h2>
            <p className="text-gray-600 mb-6">Please select a room first.</p>
            <button
              onClick={() => navigate('/rooms')}
              className="btn-primary inline-block"
            >
              Back to Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nights = calculateNights();
  const total = calculateTotal();

  return (
    <div className="pt-32 pb-20 bg-luxury-gray">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-playfair text-luxury-dark mb-8">Reservation</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Guest Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FaUser className="inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="guestName"
                      value={formData.guestName}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('guestName')}
                      className={`input-field w-full ${fieldErrors.guestName ? 'border-red-500' : ''}`}
                      placeholder="John Doe"
                    />
                    {fieldErrors.guestName && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.guestName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="guestEmail"
                      value={formData.guestEmail}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('guestEmail')}
                      className={`input-field w-full ${fieldErrors.guestEmail ? 'border-red-500' : ''}`}
                      placeholder="guest@example.com"
                    />
                    {fieldErrors.guestEmail && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.guestEmail}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FaPhone className="inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="guestPhone"
                      value={formData.guestPhone}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('guestPhone')}
                      className={`input-field w-full ${fieldErrors.guestPhone ? 'border-red-500' : ''}`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {fieldErrors.guestPhone && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.guestPhone}</p>
                    )}
                  </div>

                  {/* Check-in Date */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FaCalendarAlt className="inline mr-2" />
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      name="checkInDate"
                      value={formData.checkInDate}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('checkInDate')}
                      min={getTodayString()}
                      className={`input-field w-full ${fieldErrors.checkInDate ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.checkInDate && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.checkInDate}</p>
                    )}
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FaCalendarAlt className="inline mr-2" />
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      name="checkOutDate"
                      value={formData.checkOutDate}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('checkOutDate')}
                      min={getTodayString()}
                      className={`input-field w-full ${fieldErrors.checkOutDate ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.checkOutDate && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.checkOutDate}</p>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || hasErrors()}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : (
                      <>
                        Continue to Payment
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Booking Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-md p-6 sticky top-32"
              >
                <h3 className="text-xl font-playfair mb-4">Booking Summary</h3>

                {/* Room Info */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  {selectedRoom.images && selectedRoom.images[0] && (
                    <img
                      src={selectedRoom.images[0]}
                      alt={selectedRoom.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h4 className="font-semibold text-lg mb-2">{selectedRoom.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{selectedRoom.description}</p>
                  <p className="text-luxury-gold font-bold text-lg">${selectedRoom.price}/night</p>
                </div>

                {/* Dates Summary */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-gray-600 text-sm">Check-in</p>
                    <p className="font-semibold">
                      {formData.checkInDate ? new Date(formData.checkInDate).toLocaleDateString() : 'Not selected'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Check-out</p>
                    <p className="font-semibold">
                      {formData.checkOutDate ? new Date(formData.checkOutDate).toLocaleDateString() : 'Not selected'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-600 text-sm">Number of Nights</p>
                    <p className="font-bold text-lg">{nights}</p>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal ({nights} nights)</p>
                    <p className="font-semibold">${(nights * selectedRoom.price).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <p>Tax (10%)</p>
                    <p>${(total * 0.1).toFixed(2)}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between">
                    <p className="font-bold">Total</p>
                    <p className="font-bold text-xl text-luxury-gold">${(total + total * 0.1).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReservationPage;
