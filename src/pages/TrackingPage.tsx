
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
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
import { AlertCircle, Copyright } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TrackingPage: React.FC = () => {
  const { trackingId } = useParams<{ trackingId: string }>();
  const [trackingInfo, setTrackingInfo] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        setIsLoading(true);
        // Use the trackingId from URL params or fallback to example
        const id = trackingId || "TRK293847562";
        const data = await getTrackingInfo(id);
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
  }, [trackingId, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Navigation />
        <div className="container max-w-6xl px-4 sm:px-6 py-4 sm:py-8">
          <Skeleton className="h-12 w-2/3 mb-6" />
          <Skeleton className="h-20 w-full mb-6" />
          <div className="grid grid-cols-1 gap-4 mb-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-60 w-full mb-6" />
          <Skeleton className="h-40 w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !trackingInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Navigation />
        <div className="container max-w-6xl px-4 sm:px-6 py-4 sm:py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error || "No tracking information found."}
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  const renderContent = () => {
    if (isMobile) {
      // Mobile layout: stacked
      return (
        <div className="space-y-4">
          {/* Timeline */}
          <Card className="p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-white/10">
            <TrackingTimeline status={trackingInfo.status} />
          </Card>
          
          {/* Map */}
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-white/10 p-1">
            <TrackingMap 
              pickup={trackingInfo.pickup}
              delivery={trackingInfo.delivery}
              driver={trackingInfo.driver}
            />
          </Card>
          
          {/* Location Details */}
          <Card className="p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-white/10">
            <LocationDetails 
              pickup={trackingInfo.pickup}
              delivery={trackingInfo.delivery}
            />
          </Card>
          
          {/* Package Info */}
          <Card className="p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-white/10">
            <PackageInfo packageDetails={trackingInfo.packageDetails} />
          </Card>
        </div>
      );
    }
    
    // Desktop layout: 2 columns
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Timeline */}
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-white/10">
            <TrackingTimeline status={trackingInfo.status} />
          </Card>
          
          {/* Map */}
          <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-white/10 p-1">
            <TrackingMap 
              pickup={trackingInfo.pickup}
              delivery={trackingInfo.delivery}
              driver={trackingInfo.driver}
            />
          </Card>
        </div>
        
        {/* Right column */}
        <div className="lg:col-span-5">
          <div className="space-y-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-white/10 p-6">
              <LocationDetails 
                pickup={trackingInfo.pickup}
                delivery={trackingInfo.delivery}
              />
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-white/10 p-6">
              <PackageInfo packageDetails={trackingInfo.packageDetails} />
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <div className="container max-w-6xl px-4 sm:px-6 py-4 sm:py-8">
        <Card className="p-4 sm:p-6 shadow-md mb-4 sm:mb-6 hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-white/10">
          <TrackingHeader 
            trackingNumber={trackingInfo.trackingNumber}
            status={trackingInfo.status}
            eta={trackingInfo.eta}
          />
        </Card>
        
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-4 sm:py-6 border-t border-slate-200 dark:border-slate-700 backdrop-blur-sm bg-white/50 dark:bg-slate-800/50">
      <div className="container max-w-6xl flex items-center justify-center px-4">
        <div className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <Copyright className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span>{new Date().getFullYear()} Geofleet.ai. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default TrackingPage;
