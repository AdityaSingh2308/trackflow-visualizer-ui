
import React from 'react';
import { CheckIcon, ClockIcon, MapPinIcon, TruckIcon } from 'lucide-react';
import { PackageStatusType } from '@/types/tracking';

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
    <div className="mt-8 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentProgress >= stepNumber;
          const isCurrentStep = Math.floor(currentProgress) === stepNumber;
          const isFailed = status === 'failed' && stepNumber === 2;

          return (
            <React.Fragment key={step.key}>
              {/* Step Circle */}
              <div className="relative">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 
                    ${isActive ? 
                      isFailed ? 'border-tracking-red bg-red-50 text-tracking-red' : 'border-tracking-blue bg-blue-50 text-tracking-blue' 
                      : 'border-gray-300 bg-white text-gray-400'
                    }
                    ${isCurrentStep ? 'animate-pulse-slow' : ''}
                  `}
                >
                  {isFailed ? (
                    <div className="w-4 h-4 bg-tracking-red rounded-full"></div>
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                
                {/* Step Label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-max">
                  <span 
                    className={`text-xs font-medium ${
                      isActive ? 
                        isFailed ? 'text-tracking-red' : 'text-tracking-blue' 
                        : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </div>
              
              {/* Connector Line (except after last step) */}
              {index < steps.length - 1 && (
                <div 
                  className={`
                    h-1 flex-1 mx-2 
                    ${currentProgress > stepNumber ? 
                      status === 'failed' && stepNumber === 2 ? 'bg-tracking-red' : 'bg-tracking-blue' 
                      : 'bg-gray-300'
                    }
                  `}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingTimeline;
