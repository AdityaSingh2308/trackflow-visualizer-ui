
import { TrackingData } from "@/types/tracking";

// Mock service - in a real app, this would fetch data from an API
export const getTrackingInfo = async (trackingId: string): Promise<TrackingData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        trackingNumber: "TRK293847562",
        status: "out-for-delivery",
        eta: "Today, Apr 9, 2025 • 2:30PM - 5:30PM",
        pickup: {
          address: "123 Warehouse St",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90001",
          notes: "Distribution Center #5"
        },
        delivery: {
          address: "456 Main Ave",
          city: "Pasadena",
          state: "CA",
          zipCode: "91106",
          notes: "Leave at the front door"
        },
        driver: {
          name: "Michael Johnson",
          phone: "555-123-4567",
          vehicleInfo: "White Ford Transit • XYZ-1234"
        },
        packageDetails: {
          weight: 5.2,
          weightUnit: "lb",
          dimensions: "12\" × 8\" × 6\"",
          type: "Standard Box",
          items: [
            { name: "Wireless Headphones", quantity: 1 },
            { name: "Phone Case", quantity: 2 }
          ]
        }
      });
    }, 1000);
  });
};

// Mock function to cancel an order
export const cancelOrder = async (trackingId: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would actually cancel the order in the database
      resolve(true);
    }, 1500);
  });
};

// Mock function to attempt delivery again
export const attemptDelivery = async (trackingId: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would schedule a new delivery attempt
      resolve(true);
    }, 1500);
  });
};
