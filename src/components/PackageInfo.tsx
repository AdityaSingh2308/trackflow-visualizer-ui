
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package } from '@/types/tracking';
import { Separator } from '@/components/ui/separator';

interface PackageInfoProps {
  packageDetails: Package;
}

const PackageInfo: React.FC<PackageInfoProps> = ({ packageDetails }) => {
  return (
    <Card className="mb-6 animate-fade-in">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Package Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Weight</p>
            <p className="font-medium">{packageDetails.weight} {packageDetails.weightUnit}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Dimensions</p>
            <p className="font-medium">{packageDetails.dimensions}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Package Type</p>
            <p className="font-medium">{packageDetails.type}</p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Items</p>
          <ul className="list-disc pl-5 text-sm mt-2">
            {packageDetails.items.map((item, index) => (
              <li key={index} className="mb-1">
                {item.quantity}x {item.name}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageInfo;
