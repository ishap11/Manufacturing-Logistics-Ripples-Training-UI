import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Shipment, Warehouse, Receiving, AvailableProduct } from '../model/receiving.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/receiving`;

  findAll(): Observable<Receiving[]> {
    return this.http.get<Receiving[]>(this.apiUrl);
  }

  findByStatus(status: string): Observable<Receiving[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<Receiving[]>(this.apiUrl, { params });
  }

  search(keyword: string): Observable<Receiving[]> {
    const params = new HttpParams().set('search', keyword);
    return this.http.get<Receiving[]>(this.apiUrl, { params });
  }

  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.apiUrl}/shipments`);
  }

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`${this.apiUrl}/warehouses`);
  }

  getProducts(): Observable<AvailableProduct[]> {
    return this.http.get<AvailableProduct[]>(`${this.apiUrl}/products`);
  }

  getReceivingStatuses(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/receiving-statuses`);
  }

  getQcStatuses(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/qc-statuses`);
  }

  getById(receivingId: string): Observable<Receiving | undefined> {
    return this.http.get<Receiving>(`${this.apiUrl}/${receivingId}`).pipe(
      catchError(() => of(undefined))
    );
  }

  addReceiving(receiving: Receiving): Observable<Receiving> {
    return this.http.post<Receiving>(this.apiUrl, receiving);
  }

  updateReceiving(receiving: Receiving): Observable<Receiving> {
    return this.http.put<Receiving>(`${this.apiUrl}/${receiving.receivingId}`, receiving);
  }

  deleteReceiving(receivingId: string): Observable<boolean> {
    return this.http.delete<void>(`${this.apiUrl}/${receivingId}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
