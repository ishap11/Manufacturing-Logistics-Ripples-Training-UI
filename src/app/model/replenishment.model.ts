export interface ReplenishmentRequest {
  id: number;
  requestNumber: string;
  replenishNumber?: string; // added
  storeName: string;
  sku: string;
  productName: string;
  quantityRequested: number;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'Approved' | 'Shipped' | 'Cancelled';
  date: string;
  orderDate?: string; // added
}
