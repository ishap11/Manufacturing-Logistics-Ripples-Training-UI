import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Shipment, Warehouse, Receiving } from '../model/receiving.model';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {
  private shipments: Shipment[] = [
    {
      id: 1,
      shipmentId: "SHP-0001",
      products: [
        {
          id: 1,
          productId: "PRD-001",
          productName: "Precision Drill Bit",
          orderedQty: 100
        },
        {
          id: 2,
          productId: "PRD-002",
          productName: "Steel Rod",
          orderedQty: 250
        }
      ]
    },
    {
      id: 2,
      shipmentId: "SHP-0002",
      products: [
        {
          id: 3,
          productId: "PRD-003",
          productName: "Bearing",
          orderedQty: 75
        }
      ]
    },
    {
      id: 3,
      shipmentId: "SHP-0003",
      products: [
        {
          id: 4,
          productId: "PRD-004",
          productName: "Hydraulic Pump",
          orderedQty: 20
        },
        {
          id: 5,
          productId: "PRD-005",
          productName: "Safety Gloves",
          orderedQty: 150
        }
      ]
    }
  ];

  private warehouses: Warehouse[] = [
    {
      id: 1,
      code: "IDC-001",
      name: "Delhi Warehouse"
    },
    {
      id: 2,
      code: "IDC-002",
      name: "Noida Warehouse"
    },
    {
      id: 3,
      code: "IDC-003",
      name: "Mumbai Warehouse"
    },
    {
      id: 4,
      code: "IDC-004",
      name: "Chennai Warehouse"
    }
  ];

  private receivings: Receiving[] = [
    {
      receivingId: "RCV-0001",
      shipment: "SHP-0001",
      warehouse: "IDC-001",
      totalProducts: 2,
      totalQuantity: 350,
      status: "Completed",
      createdDate: "30-Jun-2026",
      items: [
        {
          productName: "Precision Drill Bit",
          orderedQty: 100,
          receivedQty: 100,
          damagedQty: 0,
          qcStatus: "Passed"
        },
        {
          productName: "Steel Rod",
          orderedQty: 250,
          receivedQty: 250,
          damagedQty: 0,
          qcStatus: "Passed"
        }
      ]
    }
  ];

  findAll(): Observable<Receiving[]> {
    return of([...this.receivings]).pipe(delay(500));
  }

  findByStatus(status: string): Observable<Receiving[]> {
    if (!status || status.toLowerCase() === 'all') {
      return this.findAll();
    }
    const filtered = this.receivings.filter(
      r => r.status.toLowerCase() === status.toLowerCase()
    );
    return of(filtered).pipe(delay(500));
  }

  search(keyword: string): Observable<Receiving[]> {
    if (!keyword) {
      return this.findAll();
    }
    const key = keyword.toLowerCase();
    const filtered = this.receivings.filter(r => {
      const matchId = r.receivingId.toLowerCase().includes(key);
      const matchShipment = r.shipment.toLowerCase().includes(key);
      const matchWarehouse = r.warehouse.toLowerCase().includes(key);
      const matchProduct = r.items.some(
        item => item.productName.toLowerCase().includes(key)
      );
      return matchId || matchShipment || matchWarehouse || matchProduct;
    });
    return of(filtered).pipe(delay(500));
  }

  getShipments(): Observable<Shipment[]> {
    return of([...this.shipments]).pipe(delay(500));
  }

  getWarehouses(): Observable<Warehouse[]> {
    return of([...this.warehouses]).pipe(delay(500));
  }

  getById(receivingId: string): Observable<Receiving | undefined> {
    const item = this.receivings.find(r => r.receivingId === receivingId);
    return of(item ? { ...item } : undefined).pipe(delay(500));
  }

  addReceiving(receiving: Receiving): Observable<Receiving> {
    const newRecord = { ...receiving };
    this.receivings.unshift(newRecord);
    return of(newRecord).pipe(delay(500));
  }

  updateReceiving(receiving: Receiving): Observable<Receiving> {
    const idx = this.receivings.findIndex(r => r.receivingId === receiving.receivingId);
    if (idx !== -1) {
      this.receivings[idx] = { ...receiving };
    }
    return of(receiving).pipe(delay(500));
  }

  deleteReceiving(receivingId: string): Observable<boolean> {
    const initialLength = this.receivings.length;
    this.receivings = this.receivings.filter(r => r.receivingId !== receivingId);
    return of(this.receivings.length < initialLength).pipe(delay(500));
  }
}
