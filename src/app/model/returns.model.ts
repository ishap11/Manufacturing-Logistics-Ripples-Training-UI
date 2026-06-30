export interface StoreReturn {
  id: number;
  returnNumber: string;
  storeName: string;
  sku: string;
  productName: string;
  quantityReturned: number;
  reason: string;
  refundStatus: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}
