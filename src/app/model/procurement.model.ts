export interface PurchaseOrder {
  id: number;
  poNumber: string;
  supplierName: string;
  orderDate: string;
  deliveryDate?: string;
  totalAmount: number;
  itemsCount?: number;
  status: string; // expanded to string for flex mock inputs
}
