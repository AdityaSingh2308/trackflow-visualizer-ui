
import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { LocationDetail } from '@/types/tracking';

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
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-muted-foreground mb-2">{title}</h3>
      
      <div className="flex items-start mb-3">
        <MapPinIcon className={`w-5 h-5 mr-2 mt-1 ${isDelivery ? 'text-tracking-green' : 'text-tracking-blue'}`} />
        <div>
          <p className="font-medium">{location.address}</p>
          <p className="text-sm text-muted-foreground">{location.city}, {location.state} {location.zipCode}</p>
        </div>
      </div>

      {location.notes && (
        <p className="text-sm text-muted-foreground ml-7">{location.notes}</p>
      )}
    </div>
  );
};

const LocationDetails: React.FC<LocationDetailsProps> = ({ pickup, delivery }) => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Location Details</h3>
      
      <LocationCard 
        title="PICKUP LOCATION"
        location={pickup}
      />
      
      <Separator className="my-4" />
      
      <LocationCard 
        title="DELIVERY LOCATION"
        location={delivery}
        isDelivery
      />
    </div>
  );
};

export default LocationDetails;
