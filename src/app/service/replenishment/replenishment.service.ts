import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class ReplenishmentService {

  private requests: ReplenishmentRequest[] = [
    { id: 1, requestNumber: 'REQ-REP-401', replenishNumber: 'REQ-REP-401', storeName: 'Store #04 - Downtown', sku: 'SKU-ELEC-9021', productName: 'Logitech Mouse', quantityRequested: 25, urgency: 'High', status: 'Shipped', date: '2026-06-25', orderDate: '2026-06-25' },
    { id: 2, requestNumber: 'REQ-REP-402', replenishNumber: 'REQ-REP-402', storeName: 'Store #12 - Galleria Mall', sku: 'SKU-OFFC-2101', productName: 'Premium Mesh Chair', quantityRequested: 4, urgency: 'Medium', status: 'Approved', date: '2026-06-27', orderDate: '2026-06-27' },
    { id: 3, requestNumber: 'REQ-REP-403', replenishNumber: 'REQ-REP-403', storeName: 'Store #01 - Northside Outlet', sku: 'SKU-ELEC-5524', productName: 'Dell 27-inch 4K Monitor', quantityRequested: 10, urgency: 'Critical', status: 'Pending', date: '2026-06-28', orderDate: '2026-06-28' },
    { id: 4, requestNumber: 'REQ-REP-404', replenishNumber: 'REQ-REP-404', storeName: 'Store #09 - West Airport', sku: 'SKU-APPR-1021', productName: 'Safety Vest Orange L', quantityRequested: 50, urgency: 'Low', status: 'Pending', date: '2026-06-29', orderDate: '2026-06-29' }
  ];

  getReplenishments(): Observable<ReplenishmentRequest[]> {
    return of([...this.requests]).pipe(delay(400));
  }

  addReplenishment(req: Omit<ReplenishmentRequest, 'id'>): Observable<ReplenishmentRequest> {
    const newReq = {
      ...req,
      id: this.requests.length > 0 ? Math.max(...this.requests.map(r => r.id)) + 1 : 1
    };
    this.requests.unshift(newReq);
    return of(newReq).pipe(delay(400));
  }
}
