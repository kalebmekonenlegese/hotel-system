import React from 'react';
import { motion } from 'framer-motion';

const AnalyticsCard = ({ title, value, icon: Icon, change, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-luxury-dark">{value}</p>
          <p className="text-sm text-green-600 mt-2">{change} from last month</p>
        </div>
        <div className={`${color} p-3 rounded-full text-white`}>
          <Icon className="text-2xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;