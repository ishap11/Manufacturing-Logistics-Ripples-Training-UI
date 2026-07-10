/*import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { PurchaseOrder } from '../../model/procurement.model';
export type { PurchaseOrder };

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {

  private purchaseOrders: PurchaseOrder[] = [
    { id: 1, poNumber: 'PO-2026-0001', supplierName: 'ABC Industries', orderDate: '2026-06-01', deliveryDate: '2026-06-15', totalAmount: 14250.00, itemsCount: 450, status: 'Closed' },
    { id: 2, poNumber: 'PO-2026-0002', supplierName: 'XYZ Electronics Pvt Ltd', orderDate: '2026-06-10', deliveryDate: '2026-06-28', totalAmount: 48900.00, itemsCount: 120, status: 'Approved' },
    { id: 3, poNumber: 'PO-2026-0003', supplierName: 'Global Packaging Co.', orderDate: '2026-06-18', deliveryDate: '2026-07-02', totalAmount: 3820.00, itemsCount: 1500, status: 'Pending' },
    { id: 4, poNumber: 'PO-2026-0004', supplierName: 'Pacific Chemical Corp', orderDate: '2026-06-25', deliveryDate: '2026-07-10', totalAmount: 12400.00, itemsCount: 80, status: 'Draft' },
    { id: 5, poNumber: 'PO-2026-0005', supplierName: 'Apex Logistics Supply', orderDate: '2026-06-26', deliveryDate: '2026-07-05', totalAmount: 9400.00, itemsCount: 150, status: 'Pending' }
  ];

  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    return of([...this.purchaseOrders]).pipe(delay(400));
  }

  addPurchaseOrder(po: Omit<PurchaseOrder, 'id'>): Observable<PurchaseOrder> {
    const newPO = {
      ...po,
      id: this.purchaseOrders.length > 0 ? Math.max(...this.purchaseOrders.map(p => p.id)) + 1 : 1
    };
    this.purchaseOrders.unshift(newPO);
    return of(newPO).pipe(delay(400));
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { PurchaseOrder, ProcurementPurchaseOrder, PurchaseOrderProduct } from '../../model/procurement.model';
export type { PurchaseOrder };

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {

  private purchaseOrders: PurchaseOrder[] = [
    { id: 1, poNumber: 'PO-2026-0001', supplierName: 'ABC Industries', orderDate: '2026-06-01', deliveryDate: '2026-06-15', totalAmount: 14250.00, itemsCount: 450, status: 'Closed' },
    { id: 2, poNumber: 'PO-2026-0002', supplierName: 'XYZ Electronics Pvt Ltd', orderDate: '2026-06-10', deliveryDate: '2026-06-28', totalAmount: 48900.00, itemsCount: 120, status: 'Approved' },
    { id: 3, poNumber: 'PO-2026-0003', supplierName: 'Global Packaging Co.', orderDate: '2026-06-18', deliveryDate: '2026-07-02', totalAmount: 3820.00, itemsCount: 1500, status: 'Pending' },
    { id: 4, poNumber: 'PO-2026-0004', supplierName: 'Pacific Chemical Corp', orderDate: '2026-06-25', deliveryDate: '2026-07-10', totalAmount: 12400.00, itemsCount: 80, status: 'Draft' },
    { id: 5, poNumber: 'PO-2026-0005', supplierName: 'Apex Logistics Supply', orderDate: '2026-06-26', deliveryDate: '2026-07-05', totalAmount: 9400.00, itemsCount: 150, status: 'Pending' }
  ];

  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    return of([...this.purchaseOrders]).pipe(delay(400));
  }

  addPurchaseOrder(po: Omit<PurchaseOrder, 'id'>): Observable<PurchaseOrder> {
    const newPO = {
      ...po,
      id: this.purchaseOrders.length > 0 ? Math.max(...this.purchaseOrders.map(p => p.id)) + 1 : 1
    };
    this.purchaseOrders.unshift(newPO);
    return of(newPO).pipe(delay(400));
  }

  private baseUrl = 'https://localhost:7030/api/ProcurementOrderManagement';
  //private baseUrl = 'https://localhost:7134/api/ProcurementOrderManagement';

  constructor(private http: HttpClient) { }

  getAllPurchaseOrders(): Observable<ProcurementPurchaseOrder[]> {

  return this.http.get<ProcurementPurchaseOrder[]>(
    this.baseUrl + '/GetAllPurchaseOrders'
  );

}

getPurchaseOrderById(id: number): Observable<PurchaseOrderProduct[]> {

  return this.http.get<PurchaseOrderProduct[]>(
    this.baseUrl + '/GetPurchaseOrderByIdUsingJoins/' + id
  );

}

fetchUsingLazyLoading(): Observable<PurchaseOrderProduct[]> {

  return this.http.get<PurchaseOrderProduct[]>(
    this.baseUrl + '/FetchAllUsingLazyLoading'
  );

}

insertPurchaseOrder(
  purchaseOrder: ProcurementPurchaseOrder
): Observable<string> {

  return this.http.post(
    this.baseUrl + '/AddPurchaseOrder',
    purchaseOrder,
    {
      responseType: 'text'
    }
  );

}

insertPurchaseOrderWithItems(
  purchaseOrder: ProcurementPurchaseOrder
): Observable<string> {

  return this.http.post(
    this.baseUrl + '/InsertPurchaseOrderWithItems',
    purchaseOrder,
    {
      responseType: 'text'
    }
  );

}

}
