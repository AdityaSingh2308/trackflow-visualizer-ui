
import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { LocationDetail } from '@/types/tracking';
import { useIsMobile } from '@/hooks/use-mobile';

interface LocationDetailsProps {
  pickup: LocationDetail;
  delivery: LocationDetail;
}

const LocationCard: React.FC<{
  title: string;
  location: LocationDetail;
  isDelivery?: boolean;
}> = ({ title, location, isDelivery }) => {
  return (
    <div className="mb-3 sm:mb-4">
      <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1.5 sm:mb-2">{title}</h3>
      
      <div className="flex items-start mb-2 sm:mb-3">
        <MapPinIcon className={`w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 ${isDelivery ? 'text-tracking-green' : 'text-tracking-blue'}`} />
        <div>
          <p className="text-sm sm:text-base font-medium">{location.address}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">{location.city}, {location.state} {location.zipCode}</p>
        </div>
      </div>

      {location.notes && (
        <p className="text-xs sm:text-sm text-muted-foreground ml-5 sm:ml-7">{location.notes}</p>
      )}
    </div>
  );
};

const LocationDetails: React.FC<LocationDetailsProps> = ({ pickup, delivery }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="animate-fade-in">
      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold mb-3 sm:mb-4`}>Location Details</h3>
      
      <LocationCard 
        title="PICKUP LOCATION"
        location={pickup}
      />
      
      <Separator className="my-3 sm:my-4" />
      
      <LocationCard 
        title="DELIVERY LOCATION"
        location={delivery}
        isDelivery
      />
    </div>
  );
};

export default LocationDetails;
