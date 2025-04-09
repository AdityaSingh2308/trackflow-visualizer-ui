
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { TrackingData } from '@/types/tracking';
import { getTrackingInfo } from '@/services/trackingService';
import TrackingHeader from '@/components/TrackingHeader';
import TrackingTimeline from '@/components/TrackingTimeline';
import LocationDetails from '@/components/LocationDetails';
import TrackingMap from '@/components/TrackingMap';
import PackageInfo from '@/components/PackageInfo';
import Navigation from '@/components/Navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TrackingPage: React.FC = () => {
  const [trackingInfo, setTrackingInfo] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        setIsLoading(true);
        // In a real app, you might get the tracking ID from URL params
        const trackingId = "TRK293847562"; // Example tracking number
        const data = await getTrackingInfo(trackingId);
        setTrackingInfo(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch tracking data:", err);
        setError("Unable to retrieve tracking information. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load tracking information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackingData();
  }, [toast]);

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="container max-w-6xl py-8">
          <Skeleton className="h-12 w-2/3 mb-8" />
          <Skeleton className="h-20 w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-80 w-full mb-8" />
          <Skeleton className="h-40 w-full" />
        </div>
      </>
    );
  }

  if (error || !trackingInfo) {
    return (
      <>
        <Navigation />
        <div className="container max-w-6xl py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error || "No tracking information found."}
            </AlertDescription>
          </Alert>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <div className="container max-w-6xl py-8">
        <Card className="p-6 shadow-sm mb-6">
          <TrackingHeader 
            trackingNumber={trackingInfo.trackingNumber}
            status={trackingInfo.status}
          />
        </Card>
        
        <Card className="p-6 shadow-sm mb-6">
          <TrackingTimeline status={trackingInfo.status} />
        </Card>
        
        <Card className="p-6 shadow-sm mb-6">
          <LocationDetails 
            pickup={trackingInfo.pickup}
            delivery={trackingInfo.delivery}
            eta={trackingInfo.eta}
          />
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-8">
            <Card className="h-full shadow-sm p-1">
              <TrackingMap 
                pickup={trackingInfo.pickup}
                delivery={trackingInfo.delivery}
                driver={trackingInfo.driver}
              />
            </Card>
          </div>
          <div className="lg:col-span-4">
            <Card className="h-full shadow-sm p-6">
              <PackageInfo packageDetails={trackingInfo.packageDetails} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
