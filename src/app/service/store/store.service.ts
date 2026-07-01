import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CreateStoreProfile, StoreProfile } from '../../model/store.model';
export type { CreateStoreProfile, StoreProfile };

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private stores: StoreProfile[] = [
    
  ];

  getStores(): Observable<StoreProfile[]> {
    return of([...this.stores]).pipe(delay(350));
  }

  findStore(query: string): Observable<StoreProfile | undefined> {
    const normalized = query.trim().toLowerCase();
    const store = this.stores.find(s =>
      s.Store_Id_PK.toString() === normalized ||
      s.Store_Code.toLowerCase() === normalized ||
      s.Store_Name.toLowerCase().includes(normalized)
    );

    return of(store).pipe(delay(250));
  }

  filterStores(status: string, region: string): Observable<StoreProfile[]> {
    const filtered = this.stores.filter(s => {
      const statusMatch = !status || s.status === status;
      const regionMatch = !region || s.region === region;
      return statusMatch && regionMatch;
    });

    return of(filtered).pipe(delay(300));
  }

  addStore(store: CreateStoreProfile): Observable<StoreProfile> {
    const newStore: StoreProfile = {
      ...store,
      Store_Id_PK: this.stores.length > 0 ? Math.max(...this.stores.map(s => s.Store_Id_PK)) + 1 : 1
    };

    this.stores.unshift(newStore);
    return of(newStore).pipe(delay(400));
  }

  updateStore(storeId: number, changes: Partial<StoreProfile>): Observable<StoreProfile | null> {
    const index = this.stores.findIndex(s => s.Store_Id_PK === storeId);
    if (index === -1) return of(null).pipe(delay(250));

    this.stores[index] = {
      ...this.stores[index],
      ...changes,
      Updated_DateTime: this.getCurrentDateTime()
    };

    return of(this.stores[index]).pipe(delay(350));
  }

  getCurrentDateTime(): string {
    const date = new Date();
    const pad = (value: number) => value.toString().padStart(2, '0');

    return [
      date.getFullYear(),
      pad(date.getMonth() + 1),
      pad(date.getDate())
    ].join('-') + ' ' + [
      pad(date.getHours()),
      pad(date.getMinutes()),
      pad(date.getSeconds())
    ].join(':');
  }
}
