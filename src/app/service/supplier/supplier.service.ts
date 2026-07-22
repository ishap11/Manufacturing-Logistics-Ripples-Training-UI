import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Supplier, SupplierCategory, SupplierCountry, SupplierCreate, SupplierUpdate, RateCard } from '../../model/supplier.model';
export type { Supplier, SupplierCategory, SupplierCountry, SupplierCreate, SupplierUpdate, RateCard };

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}

export interface SupplierApiError {
  message: string;
  fieldErrors: Record<string, string[]>;
  isServerError: boolean;
}

@Injectable({ providedIn: 'root' })
export class SupplierService {
  // Program.cs enables HTTPS redirection and launchSettings.json exposes this API on 7030.
  // Calling the HTTP port would require a cross-origin redirect, which browsers can reject.
  private readonly apiUrl = 'https://localhost:7030/api/SupplierApi';

  constructor(private readonly http: HttpClient) {}

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<ApiResponse<Supplier[]>>(`${this.apiUrl}/FetchAllSuppliers`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error))
    );
  }

  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<ApiResponse<Supplier>>(`${this.apiUrl}/FetchSupplierById/${id}`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error))
    );
  }

  addSupplier(supplier: SupplierCreate): Observable<Supplier> {
    return this.http.post<ApiResponse<Supplier>>(`${this.apiUrl}/AddSupplier`, supplier).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error))
    );
  }

  updateSupplier(id: number, supplier: SupplierUpdate): Observable<Supplier> {
    return this.http.put<ApiResponse<Supplier>>(`${this.apiUrl}/UpdateSupplier/${id}`, supplier).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error))
    );
  }

  getSuppliersByCity(cityName: string): Observable<Supplier[]> {
    const params = new HttpParams().set('cityName', cityName);
    return this.http.get<ApiResponse<Supplier[]>>(`${this.apiUrl}/FetchSupplierWithCityName`, { params }).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const isServerError = error.status >= 500 || error.status === 0;
    const message = isServerError
      ? 'Unable to save the supplier right now. Please try again later.'
      : error.error?.message ?? 'Unable to process the supplier request.';
    const fieldErrors = error.error?.errors ?? {};
    return throwError((): SupplierApiError => ({ message, fieldErrors, isServerError }));
  }
}
