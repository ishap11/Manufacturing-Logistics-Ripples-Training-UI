import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, sku: 'SKU-ELEC-9021', name: 'Logitech MX Master 3S Mouse', category: 'Electronics', barcode: '097855163455', unitOfMeasure: 'PCS', costPrice: 65.00, retailPrice: 99.99, unitPrice: 99.99, qcStatus: 'Approved', dimensions: '12.4x8.4x5.1 cm', weightKg: 0.14, minStockLevel: 20, maxStockLevel: 200, status: 'Active' },
    { id: 2, sku: 'SKU-OFFC-2101', name: 'Premium Ergo Mesh Desk Chair', category: 'Office Furniture', barcode: '49013010321', unitOfMeasure: 'PCS', costPrice: 120.00, retailPrice: 249.99, unitPrice: 249.99, qcStatus: 'Approved', dimensions: '68x68x120 cm', weightKg: 18.50, minStockLevel: 5, maxStockLevel: 50, status: 'Active' },
    { id: 3, sku: 'SKU-PACK-8802', name: 'Heavy Duty Double-Wall Box Size M', category: 'Packaging Material', barcode: '88010430022', unitOfMeasure: 'Pack of 10', costPrice: 14.50, retailPrice: 24.99, unitPrice: 24.99, qcStatus: 'Approved', dimensions: '40x30x30 cm', weightKg: 4.20, minStockLevel: 100, maxStockLevel: 1000, status: 'Active' },
    { id: 4, sku: 'SKU-ELEC-5524', name: 'UltraSharp 27-inch 4K Monitor', category: 'Electronics', barcode: '088411634001', unitOfMeasure: 'PCS', costPrice: 280.00, retailPrice: 429.99, unitPrice: 429.99, qcStatus: 'Approved', dimensions: '61.1x36.1x5.2 cm', weightKg: 6.40, minStockLevel: 10, maxStockLevel: 100, status: 'Active' },
    { id: 5, sku: 'SKU-APPR-1021', name: 'High-Visibility Safety Vest Orange L', category: 'Safety Wear', barcode: '7350024921', unitOfMeasure: 'PCS', costPrice: 3.20, retailPrice: 9.99, unitPrice: 9.99, qcStatus: 'Approved', dimensions: '30x25x2 cm', weightKg: 0.22, minStockLevel: 50, maxStockLevel: 500, status: 'Active' },
    { id: 6, sku: 'SKU-TOOL-0044', name: 'Industrial Heat Gun 2000W', category: 'Tools', barcode: '40072200044', unitOfMeasure: 'PCS', costPrice: 32.00, retailPrice: 59.99, unitPrice: 59.99, qcStatus: 'Pending', dimensions: '25x20x8 cm', weightKg: 1.10, minStockLevel: 10, maxStockLevel: 80, status: 'Inactive' }
  ];

  getProducts(): Observable<Product[]> {
    return of([...this.products]).pipe(delay(400));
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newProduct = {
      ...product,
      id: this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1
    };
    this.products.push(newProduct);
    return of(newProduct).pipe(delay(400));
  }

  deleteProduct(id: number): Observable<boolean> {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return of(false);
    this.products.splice(idx, 1);
    return of(true).pipe(delay(400));
  }
}
