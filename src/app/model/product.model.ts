export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  barcode: string;
  unitOfMeasure: string;
  costPrice: number;
  retailPrice: number;
  minStockLevel: number;
  maxStockLevel: number;
  dimensions: string; // e.g. 10x15x5 cm
  weightKg: number;
  status: 'Active' | 'Inactive';
  unitPrice?: number; // optional backward compatibility helper
  qcStatus?: string; // optional backward compatibility helper
}
