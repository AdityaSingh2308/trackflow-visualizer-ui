
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrackingEvent } from '@/services/trackingService';
import { PackageStatusType } from '@/types/tracking';
import { CheckIcon, TruckIcon, MapPinIcon, XIcon, RefreshCwIcon, PackageIcon } from 'lucide-react';

interface TrackingHistoryProps {
  events: TrackingEvent[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <PackageIcon className="h-4 w-4" />;
    case 'in-transit':
      return <TruckIcon className="h-4 w-4" />;
    case 'out-for-delivery':
      return <MapPinIcon className="h-4 w-4" />;
    case 'delivered':
      return <CheckIcon className="h-4 w-4" />;
    case 'failed':
      return <XIcon className="h-4 w-4" />;
    default:
      return <PackageIcon className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500 border-yellow-600';
    case 'in-transit':
      return 'bg-blue-500 border-blue-600';
    case 'out-for-delivery':
      return 'bg-orange-500 border-orange-600';
    case 'delivered':
      return 'bg-green-500 border-green-600';
    case 'failed':
      return 'bg-red-500 border-red-600';
    default:
      return 'bg-gray-500 border-gray-600';
  }
};

const TrackingHistory: React.FC<TrackingHistoryProps> = ({ events }) => {
  // Sort events by date (most recent first)
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Tracking History</h3>
      <div className="space-y-4">
        {sortedEvents.map((event, index) => (
          <div key={index} className="relative">
            {/* Timeline connector line */}
            {index < sortedEvents.length - 1 && (
              <div className="absolute top-6 bottom-0 left-4 w-0.5 bg-gray-200 dark:bg-gray-700" />
            )}
            
            <div className="flex gap-4">
              {/* Status icon/dot */}
              <div className={`relative z-10 h-8 w-8 rounded-full border-2 flex items-center justify-center text-white ${getStatusColor(event.status)}`}>
                {getStatusIcon(event.status)}
              </div>
              
              {/* Event details */}
              <div className="flex-1 pb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <p className="font-medium">{event.description}</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                {event.location && (
                  <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingHistory;
