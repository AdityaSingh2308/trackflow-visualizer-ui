
import React from 'react';
import { CheckIcon, ClockIcon, MapPinIcon, TruckIcon } from 'lucide-react';
import { PackageStatusType } from '@/types/tracking';
import { motion } from 'framer-motion';

interface TrackingTimelineProps {
  status: PackageStatusType;
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ status }) => {
  const steps = [
    { key: 'pending', label: 'Order Placed', icon: CheckIcon },
    { key: 'in-transit', label: 'In Transit', icon: TruckIcon },
    { key: 'out-for-delivery', label: 'Out For Delivery', icon: MapPinIcon },
    { key: 'delivered', label: 'Delivered', icon: MapPinIcon }
  ];

  // Map status to numeric progress value
  const statusMap: Record<PackageStatusType, number> = {
    'pending': 1,
    'in-transit': 2,
    'out-for-delivery': 3,
    'delivered': 4,
    'failed': 2.5 // Failed typically happens during transit
  };

  const currentProgress = statusMap[status];

  return (
    <div className="mt-8 mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentProgress >= stepNumber;
          const isCurrentStep = Math.floor(currentProgress) === stepNumber;
          const isFailed = status === 'failed' && stepNumber === 2;

          return (
            <React.Fragment key={step.key}>
              {/* Step Circle */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  ease: "easeOut" 
                }}
              >
                <motion.div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 
                    ${isActive ? 
                      isFailed ? 'border-tracking-red bg-red-50 text-tracking-red' : 'border-tracking-blue bg-blue-50 text-tracking-blue' 
                      : 'border-gray-300 bg-white text-gray-400'
                    }
                  `}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    boxShadow: isCurrentStep ? '0 0 0 4px rgba(59, 130, 246, 0.15)' : 'none'
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {isFailed ? (
                    <motion.div 
                      className="w-4 h-4 bg-tracking-red rounded-full"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, rotate: -15 }}
                      animate={{ 
                        opacity: 1, 
                        rotate: 0,
                        scale: isCurrentStep ? [1, 1.1, 1] : 1
                      }}
                      transition={{ 
                        duration: isCurrentStep ? 2 : 0.3, 
                        repeat: isCurrentStep ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    >
                      <step.icon className="w-5 h-5" />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Step Label */}
                <motion.div 
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-max"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                >
                  <span 
                    className={`text-xs font-medium ${
                      isActive ? 
                        isFailed ? 'text-tracking-red' : 'text-tracking-blue' 
                        : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              </motion.div>
              
              {/* Connector Line (except after last step) */}
              {index < steps.length - 1 && (
                <motion.div 
                  className={`h-1 flex-1 mx-2 bg-gray-300 overflow-hidden`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className={`h-full ${
                      currentProgress > stepNumber ? 
                        status === 'failed' && stepNumber === 2 ? 'bg-tracking-red' : 'bg-tracking-blue' 
                        : 'bg-transparent'
                    }`}
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: currentProgress > stepNumber 
                        ? "100%" 
                        : currentProgress > stepNumber - 1 && currentProgress < stepNumber 
                          ? `${(currentProgress - (stepNumber - 1)) * 100}%` 
                          : "0%" 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2 + 0.4,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingTimeline;
