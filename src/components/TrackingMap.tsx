
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { LocationDetail, DriverInfo } from '@/types/tracking';
import { MapPinIcon, PhoneIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock map component - in a real app, this would use Mapbox, Google Maps, etc.
const Map: React.FC<{
  pickup: LocationDetail;
  delivery: LocationDetail;
  driverLocation?: { lat: number; lng: number };
}> = ({ pickup, delivery, driverLocation }) => {
  const isMobile = useIsMobile();
  const mapHeight = isMobile ? 'h-[250px]' : 'h-[300px] md:h-[400px]';
  
  return (
    <div className={`relative ${mapHeight} bg-gray-100 rounded-md overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
        {/* This is where you'd render an actual map */}
        <div className="absolute w-full h-full flex items-center justify-center">
          <p className="text-gray-400 text-center px-4">
            Interactive map would be displayed here with pickup, delivery, and driver markers.
            <br/>
            <span className="text-xs sm:text-sm">
              (In a real implementation, integrate with Mapbox, Google Maps, etc.)
            </span>
          </p>
        </div>
        
        {/* Sample visualization (for demo purposes) */}
        <div className="absolute top-2 sm:top-8 left-2 sm:left-8">
          <div className="flex items-center mb-1 sm:mb-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-tracking-blue mr-1 sm:mr-2"></div>
            <span className="text-xs">Pickup Point</span>
          </div>
          <div className="flex items-center mb-1 sm:mb-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-tracking-green mr-1 sm:mr-2"></div>
            <span className="text-xs">Delivery Point</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-tracking-orange mr-1 sm:mr-2"></div>
            <span className="text-xs">Driver Location</span>
          </div>
        </div>
        
        {/* Sample points (for demo purposes) */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-tracking-blue"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-tracking-green"></div>
        {driverLocation && (
          <div className="absolute top-1/2 left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-tracking-orange animate-pulse"></div>
        )}
        
        {/* Direction line (for demo purposes) */}
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[1px] bg-tracking-blue rotate-45 origin-left"></div>
      </div>
    </div>
  );
};

interface TrackingMapProps {
  pickup: LocationDetail;
  delivery: LocationDetail;
  driver?: DriverInfo;
}

const TrackingMap: React.FC<TrackingMapProps> = ({ pickup, delivery, driver }) => {
  const isMobile = useIsMobile();
  // In a real app, you'd get the driver's location from an API
  const [driverLocation, setDriverLocation] = useState(
    driver ? { lat: 40.712776, lng: -74.005974 } : undefined
  );
  
  // Simulate driver movement for demo purposes
  useEffect(() => {
    if (!driver) return;
    
    const interval = setInterval(() => {
      setDriverLocation(prev => {
        if (!prev) return prev;
        return {
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001
        };
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [driver]);

  const handleCallDriver = () => {
    if (driver?.phone) {
      window.location.href = `tel:${driver.phone}`;
    }
  };

  return (
    <Card className="overflow-hidden border border-border animate-fade-in">
      <div className="p-3 sm:p-4 border-b">
        <h3 className="text-base sm:text-lg font-semibold">Tracking Map</h3>
      </div>
      
      <Map 
        pickup={pickup}
        delivery={delivery}
        driverLocation={driverLocation}
      />
      
      {driver && (
        <div className="p-3 sm:p-4 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2 sm:mr-3">
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-tracking-blue" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium">{driver.name}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{driver.vehicleInfo}</p>
            </div>
          </div>
          
          <Button 
            variant="default" 
            onClick={handleCallDriver}
            className="bg-tracking-green hover:bg-tracking-green/90 text-xs sm:text-sm w-full sm:w-auto mt-2 sm:mt-0"
            size={isMobile ? "sm" : "default"}
          >
            <PhoneIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Call Driver
          </Button>
        </div>
      )}
    </Card>
  );
};

export default TrackingMap;
