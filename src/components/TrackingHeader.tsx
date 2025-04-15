
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PackageStatusType } from '@/types/tracking';
import { ClockIcon, Share2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";

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
    <Badge variant="outline" className={`${config.color} px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium`}>
      {config.label}
    </Badge>
  );
};

const TrackingHeader: React.FC<TrackingHeaderProps> = ({ trackingNumber, status, eta }) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tracking Package #${trackingNumber}`,
          text: `Track package #${trackingNumber}`,
          url: url,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: "Tracking link copied to clipboard",
      });
    }).catch(() => {
      toast({
        variant: "destructive",
        description: "Failed to copy tracking link",
      });
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center animate-fade-in">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold mb-0.5 sm:mb-1">Package Tracking</h1>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Tracking Number:</span> #{trackingNumber}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-2 md:mt-0">
        <StatusBadge status={status} />
        {eta && (
          <div className="flex items-center text-tracking-orange">
            <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="text-xs sm:text-sm font-medium">ETA: {eta}</span>
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </div>
  );
};

export default TrackingHeader;
