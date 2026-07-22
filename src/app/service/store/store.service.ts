import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreateStoreProfile, StoreProfile, UpdateStoreProfile, ManagerOption, AddressOption, UserOption } from '../../model/store.model';
export type { CreateStoreProfile, StoreProfile, UpdateStoreProfile, ManagerOption, AddressOption, UserOption };

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private baseUrl = 'https://localhost:7271/api';

  constructor(private http: HttpClient) {}

  getStores(): Observable<StoreProfile[]> {
    return this.http.get<StoreProfile[]>(`${this.baseUrl}/findall`);
  }

  findStore(id: number): Observable<StoreProfile> {
    return this.http.get<StoreProfile>(`${this.baseUrl}/find/${id}`);
  }

  filterStores(name: string): Observable<StoreProfile[]> {
    return this.http.post<StoreProfile[]>(`${this.baseUrl}/filter`, { StoreName: name });
  }

  addStore(store: CreateStoreProfile): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/insert`, store);
  }

  updateStore(id: number, store: UpdateStoreProfile): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/update/${id}`, store);
  }

  deleteStore(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getManagers(): Observable<ManagerOption[]> {
    return this.http.get<ManagerOption[]>(`${this.baseUrl}/managers`);
  }

  getAddresses(): Observable<AddressOption[]> {
    return this.http.get<AddressOption[]>(`${this.baseUrl}/addresses`);
  }

  getUsers(): Observable<UserOption[]> {
    return this.http.get<UserOption[]>(`${this.baseUrl}/users`);
  }
}