import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DispatchTracking } from '../../model/dispatch.model';
export type { DispatchTracking };

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  private dispatches: DispatchTracking[] = [
    { id: 1, dispatchNumber: 'DIS-99201', destination: 'Store #04 - Downtown', carrier: 'DHL Express', method: 'Road', shipmentWeightKg: 14.5, status: 'Delivered', estimatedDelivery: '2026-06-26' },
    { id: 2, dispatchNumber: 'DIS-99202', destination: 'Store #12 - Galleria Mall', carrier: 'FedEx Freight', method: 'Road', shipmentWeightKg: 78.0, status: 'In Transit', estimatedDelivery: '2026-06-30' },
    { id: 3, dispatchNumber: 'DIS-99203', destination: 'Regional Hub East', carrier: 'Oceanic Carriers', method: 'Sea', shipmentWeightKg: 1420.0, status: 'Manifested', estimatedDelivery: '2026-07-15' },
    { id: 4, dispatchNumber: 'DIS-99204', destination: 'Store #01 - Northside Outlet', carrier: 'Apex Air Freight', method: 'Air', shipmentWeightKg: 85.0, status: 'In Transit', estimatedDelivery: '2026-07-01' }
  ];

  getDispatches(): Observable<DispatchTracking[]> {
    return of([...this.dispatches]).pipe(delay(400));
  }
}
