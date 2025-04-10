
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { PackageStatusType } from '@/types/tracking';
import { ClockIcon } from 'lucide-react';

interface TrackingHeaderProps {
  trackingNumber: string;
  status: PackageStatusType;
  eta?: string;
}

const StatusBadge = ({ status }: { status: PackageStatusType }) => {
  const statusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      label: 'Pending'
    },
    'in-transit': {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      label: 'In Transit'
    },
    'out-for-delivery': {
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      label: 'Out For Delivery'
    },
    delivered: {
      color: 'bg-green-100 text-green-800 border-green-200',
      label: 'Delivered'
    },
    failed: {
      color: 'bg-red-100 text-red-800 border-red-200',
      label: 'Failed'
    }
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={`${config.color} px-3 py-1 text-xs font-medium`}>
      {config.label}
    </Badge>
  );
};

const TrackingHeader: React.FC<TrackingHeaderProps> = ({ trackingNumber, status, eta }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold mb-1">Package Tracking</h1>
        <p className="text-muted-foreground">
          <span className="font-medium">Tracking Number:</span> #{trackingNumber}
        </p>
      </div>
      <div className="flex flex-col items-end mt-2 md:mt-0">
        <StatusBadge status={status} />
        {eta && (
          <div className="flex items-center mt-2 text-tracking-orange">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">ETA: {eta}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingHeader;
