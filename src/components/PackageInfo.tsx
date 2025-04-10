
import React from 'react';
import { Package } from '@/types/tracking';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

interface PackageInfoProps {
  packageDetails: Package;
}

const PackageInfo: React.FC<PackageInfoProps> = ({ packageDetails }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="animate-fade-in">
      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold mb-3 sm:mb-4`}>Package Information</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Weight</p>
          <p className="text-sm sm:text-base font-medium">{packageDetails.weight} {packageDetails.weightUnit}</p>
        </div>
        
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Dimensions</p>
          <p className="text-sm sm:text-base font-medium">{packageDetails.dimensions}</p>
        </div>
        
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Package Type</p>
          <p className="text-sm sm:text-base font-medium">{packageDetails.type}</p>
        </div>
      </div>
      
      <Separator className="my-3 sm:my-4" />
      
      <div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">Items</p>
        <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm mt-1 sm:mt-2">
          {packageDetails.items.map((item, index) => (
            <li key={index} className="mb-0.5 sm:mb-1">
              {item.quantity}x {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageInfo;
