import React from 'react';
import { motion } from 'framer-motion';

const BillingToggle = ({ isAnnual, onToggle }) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`font-sf-text font-medium transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
        Monthly
      </span>
      <div className="relative">
        <button
          onClick={() => onToggle(!isAnnual)}
          className="relative w-14 h-8 bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          style={{
            backgroundColor: isAnnual ? '#0071E3' : '#E5E5EA'
          }}
        >
          <motion.div
            className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm"
            animate={{
              x: isAnnual ? 24 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-sf-text font-medium transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
          Annual
        </span>
        <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
          2 months free
        </div>
      </div>
    </div>
  );
};

export default BillingToggle;