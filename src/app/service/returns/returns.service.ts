import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { StoreReturn } from '../../model/returns.model';
export type { StoreReturn };

@Injectable({
  providedIn: 'root'
})
export class ReturnsService {

  private returns: StoreReturn[] = [
    { id: 1, returnNumber: 'RET-012', storeName: 'Store #04 - Downtown', sku: 'SKU-ELEC-9021', productName: 'Logitech Mouse', quantityReturned: 2, reason: 'Defective scroll wheel', refundStatus: 'Approved', date: '2026-06-22' },
    { id: 2, returnNumber: 'RET-013', storeName: 'Store #01 - Northside Outlet', sku: 'SKU-ELEC-5524', productName: 'Dell 27-inch 4K Monitor', quantityReturned: 1, reason: 'Broken screen on arrival', refundStatus: 'Pending', date: '2026-06-27' },
    { id: 3, returnNumber: 'RET-014', storeName: 'Store #09 - West Airport', sku: 'SKU-OFFC-2101', productName: 'Premium Mesh Chair', quantityReturned: 1, reason: 'Wrong model shipped', refundStatus: 'Rejected', date: '2026-06-28' }
  ];

  getReturns(): Observable<StoreReturn[]> {
    return of([...this.returns]).pipe(delay(400));
  }
}
