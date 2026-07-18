import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class SupplierDropdownService {
  private readonly apiUrl = 'https://localhost:7030/api/SupplierApi';

  constructor(private readonly http: HttpClient) {}

  getSupplierTypes(): Observable<string[]> {
    return this.http.get<ApiResponse<string[]>>(`${this.apiUrl}/FetchAllSupplierTypes`).pipe(
      map(response => response.data)
    );
  }

  getCountries(): Observable<string[]> {
    return this.http.get<ApiResponse<string[]>>(`${this.apiUrl}/FetchAllCountries`).pipe(
      map(response => response.data)
    );
  }

  getStates(country: string): Observable<string[]> {
    return this.http.get<ApiResponse<string[]>>(`${this.apiUrl}/FetchStatesByCountry?countryName=${encodeURIComponent(country)}`).pipe(
      map(response => response.data)
    );
  }

  getCities(state: string): Observable<string[]> {
    return this.http.get<ApiResponse<string[]>>(`${this.apiUrl}/FetchCitiesByState?stateName=${encodeURIComponent(state)}`).pipe(
      map(response => response.data)
    );
  }
}
