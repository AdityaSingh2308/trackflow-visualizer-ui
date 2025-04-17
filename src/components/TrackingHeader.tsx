import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PackageStatusType } from '@/types/tracking';
import { ClockIcon, Share2, X, RefreshCw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from 'react';
import { cancelOrder, attemptDelivery, addTrackingEvent } from '@/services/trackingService';

interface TrackingHeaderProps {
  trackingNumber: string;
  status: PackageStatusType;
  eta?: string;
  onStatusUpdate?: (newStatus: PackageStatusType) => void;
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

const TrackingHeader: React.FC<TrackingHeaderProps> = ({ trackingNumber, status, eta, onStatusUpdate }) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAttempting, setIsAttempting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  
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

  const handleCancelOrder = async () => {
    setIsCancelling(true);
    
    try {
      const success = await cancelOrder(trackingNumber);
      
      if (success) {
        await addTrackingEvent(trackingNumber, {
          date: new Date().toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
          }),
          status: 'failed',
          description: 'Order cancelled by customer',
        });
        
        toast({
          title: "Order Cancelled",
          description: `Order #${trackingNumber} has been cancelled successfully.`,
        });
        
        if (onStatusUpdate) {
          onStatusUpdate('failed');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Cancellation Failed",
          description: "Unable to cancel the order. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast({
        variant: "destructive",
        title: "Cancellation Failed",
        description: "An error occurred while cancelling your order.",
      });
    } finally {
      setIsCancelling(false);
      setIsDialogOpen(false);
    }
  };

  const handleAttemptDelivery = async () => {
    setIsAttempting(true);
    
    try {
      const success = await attemptDelivery(trackingNumber);
      
      if (success) {
        await addTrackingEvent(trackingNumber, {
          date: new Date().toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
          }),
          status: 'in-transit',
          description: 'Delivery reattempt requested',
        });
        
        toast({
          title: "Delivery Attempt Scheduled",
          description: "We'll attempt to deliver your package again soon.",
        });
        
        if (onStatusUpdate) {
          onStatusUpdate('in-transit');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Request Failed",
          description: "Unable to schedule a new delivery attempt. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error scheduling delivery attempt:", error);
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: "An error occurred while scheduling a new delivery attempt.",
      });
    } finally {
      setIsAttempting(false);
    }
  };
  
  return (
    <>
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            
            {status !== 'delivered' && status !== 'failed' && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 border-destructive text-destructive hover:bg-destructive/10"
                onClick={() => setIsDialogOpen(true)}
                disabled={isCancelling}
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isCancelling ? 'Cancelling...' : 'Cancel'}
                </span>
              </Button>
            )}
            
            {status === 'failed' && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5"
                onClick={handleAttemptDelivery}
                disabled={isAttempting}
              >
                <RefreshCw className={`h-4 w-4 ${isAttempting ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isAttempting ? 'Scheduling...' : 'Attempt Delivery'}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to cancel order #{trackingNumber}?</p>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone. The package will be returned to the sender.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              No, Keep Order
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancelOrder}
              disabled={isCancelling}
            >
              {isCancelling ? 'Cancelling...' : 'Yes, Cancel Order'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrackingHeader;
