
export type PackageStatusType = 'pending' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'failed';

export interface LocationDetail {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  notes?: string;
}

export interface DriverInfo {
  name: string;
  phone: string;
  vehicleInfo: string;
}

export interface PackageItem {
  name: string;
  quantity: number;
}

export interface Package {
  weight: number;
  weightUnit: string;
  dimensions: string;
  type: string;
  items: PackageItem[];
}

export interface TrackingData {
  trackingNumber: string;
  status: PackageStatusType;
  eta?: string;
  pickup: LocationDetail;
  delivery: LocationDetail;
  driver?: DriverInfo;
  packageDetails: Package;
}
