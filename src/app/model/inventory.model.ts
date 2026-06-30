export interface StockLevel {
  id: number;
  sku: string;
  productName: string;
  name?: string; // added to match .name in templates
  category: string;
  warehouseLocation: string; // e.g. A-12-04
  binLocation?: string; // added to match .binLocation in templates
  onHandQuantity: number;
  quantity?: number; // added to match .quantity in templates
  allocatedQuantity: number;
  availableQuantity: number;
  safetyStock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Available';
}

export interface InventoryTransfer {
  id: number;
  transferNumber: string;
  sourceLocation: string;
  sourceBin?: string; // added
  destLocation: string;
  destBin?: string; // added
  sku: string;
  productName?: string;
  quantity: number;
  status: string;
  date?: string;
  timestamp?: string; // added
}

export type StockTransfer = InventoryTransfer; // alias support

export interface StockAdjustment {
  id: number;
  adjustmentNumber: string;
  sku: string;
  productName?: string;
  quantityChange?: number;
  qtyAdjusted?: number; // added
  reason: string; // e.g. Damaged, Found, Expired
  approvedBy?: string;
  date?: string;
  timestamp?: string; // added
  status?: string; // added
}

export interface CycleCount {
  id: number;
  countNumber: string;
  auditRef?: string; // added
  location: string;
  category?: string; // added
  expectedSKUsCount?: number;
  status: string;
  dueDate?: string;
  scheduledDate?: string; // added
  auditor?: string; // added
  accuracyRate?: number;
}
