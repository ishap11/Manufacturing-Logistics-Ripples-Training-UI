export interface DispatchTracking {
  id: number;
  dispatchNumber: string;
  destination: string;
  carrier: string;
  method: 'Air' | 'Sea' | 'Road';
  shipmentWeightKg: number;
  status: string; // expanded to string for flex mock inputs
  estimatedDelivery: string;
}
