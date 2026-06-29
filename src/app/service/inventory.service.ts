import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface StockLevel {
  id: number;
  sku: string;
  productName: string;
  category: string;
  warehouseLocation: string; // e.g. A-12-04
  onHandQuantity: number;
  allocatedQuantity: number;
  availableQuantity: number;
  safetyStock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface InventoryTransfer {
  id: number;
  transferNumber: string;
  sourceLocation: string;
  destLocation: string;
  sku: string;
  productName: string;
  quantity: number;
  status: 'Draft' | 'Transit' | 'Completed';
  date: string;
}

export interface StockAdjustment {
  id: number;
  adjustmentNumber: string;
  sku: string;
  productName: string;
  quantityChange: number; // positive or negative
  reason: string; // e.g. Damaged, Found, Expired
  approvedBy: string;
  date: string;
}

export interface CycleCount {
  id: number;
  countNumber: string;
  location: string;
  expectedSKUsCount: number;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  dueDate: string;
  accuracyRate?: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private stockLevels: StockLevel[] = [
    { id: 1, sku: 'SKU-ELEC-9021', productName: 'Logitech MX Master 3S Mouse', category: 'Electronics', warehouseLocation: 'A-02-04', onHandQuantity: 245, allocatedQuantity: 30, availableQuantity: 215, safetyStock: 50, status: 'In Stock' },
    { id: 2, sku: 'SKU-OFFC-2101', productName: 'Premium Ergo Mesh Desk Chair', category: 'Office Furniture', warehouseLocation: 'B-08-01', onHandQuantity: 15, allocatedQuantity: 12, availableQuantity: 3, safetyStock: 10, status: 'Low Stock' },
    { id: 3, sku: 'SKU-PACK-8802', productName: 'Heavy Duty Double-Wall Box Size M', category: 'Packaging Material', warehouseLocation: 'C-04-10', onHandQuantity: 850, allocatedQuantity: 100, availableQuantity: 750, safetyStock: 100, status: 'In Stock' },
    { id: 4, sku: 'SKU-ELEC-5524', productName: 'UltraSharp 27-inch 4K Monitor', category: 'Electronics', warehouseLocation: 'A-01-12', onHandQuantity: 8, allocatedQuantity: 8, availableQuantity: 0, safetyStock: 15, status: 'Out of Stock' },
    { id: 5, sku: 'SKU-APPR-1021', productName: 'High-Visibility Safety Vest Orange L', category: 'Safety Wear', warehouseLocation: 'D-02-02', onHandQuantity: 1200, allocatedQuantity: 200, availableQuantity: 1000, safetyStock: 200, status: 'In Stock' }
  ];

  private transfers: InventoryTransfer[] = [
    { id: 1, transferNumber: 'TRF-00124', sourceLocation: 'WH-East-A', destLocation: 'WH-West-B', sku: 'SKU-ELEC-9021', productName: 'Logitech Mouse', quantity: 50, status: 'Completed', date: '2026-06-20' },
    { id: 2, transferNumber: 'TRF-00125', sourceLocation: 'WH-Central', destLocation: 'WH-East-A', sku: 'SKU-APPR-1021', productName: 'Safety Vest', quantity: 200, status: 'Transit', date: '2026-06-27' },
    { id: 3, transferNumber: 'TRF-00126', sourceLocation: 'WH-West-B', destLocation: 'WH-Central', sku: 'SKU-OFFC-2101', productName: 'Mesh Desk Chair', quantity: 5, status: 'Draft', date: '2026-06-29' }
  ];

  private adjustments: StockAdjustment[] = [
    { id: 1, adjustmentNumber: 'ADJ-10492', sku: 'SKU-TOOL-0044', productName: 'Heat Gun 2000W', quantityChange: -2, reason: 'Damaged during forklift transit', approvedBy: 'Michael Brown', date: '2026-06-15' },
    { id: 2, adjustmentNumber: 'ADJ-10493', sku: 'SKU-PACK-8802', productName: 'Double-Wall Box Size M', quantityChange: 20, reason: 'Found stock during cycle count', approvedBy: 'Alex Mercer', date: '2026-06-22' }
  ];

  private cycleCounts: CycleCount[] = [
    { id: 1, countNumber: 'CC-2026-W25', location: 'Zone A (Electronics)', expectedSKUsCount: 14, status: 'Completed', dueDate: '2026-06-20', accuracyRate: 98.4 },
    { id: 2, countNumber: 'CC-2026-W26', location: 'Zone C (Packaging)', expectedSKUsCount: 8, status: 'In Progress', dueDate: '2026-06-28' },
    { id: 3, countNumber: 'CC-2026-W27', location: 'Zone B (Furniture)', expectedSKUsCount: 12, status: 'Scheduled', dueDate: '2026-07-04' }
  ];

  getStockLevels(): Observable<StockLevel[]> {
    return of([...this.stockLevels]).pipe(delay(400));
  }

  getTransfers(): Observable<InventoryTransfer[]> {
    return of([...this.transfers]).pipe(delay(400));
  }

  getAdjustments(): Observable<StockAdjustment[]> {
    return of([...this.adjustments]).pipe(delay(400));
  }

  getCycleCounts(): Observable<CycleCount[]> {
    return of([...this.cycleCounts]).pipe(delay(400));
  }

  addTransfer(t: Omit<InventoryTransfer, 'id'>): Observable<InventoryTransfer> {
    const newT = {
      ...t,
      id: this.transfers.length > 0 ? Math.max(...this.transfers.map(tr => tr.id)) + 1 : 1
    };
    this.transfers.unshift(newT);
    return of(newT).pipe(delay(400));
  }

  addAdjustment(adj: Omit<StockAdjustment, 'id'>): Observable<StockAdjustment> {
    const newA = {
      ...adj,
      id: this.adjustments.length > 0 ? Math.max(...this.adjustments.map(a => a.id)) + 1 : 1
    };
    this.adjustments.unshift(newA);
    return of(newA).pipe(delay(400));
  }
}
