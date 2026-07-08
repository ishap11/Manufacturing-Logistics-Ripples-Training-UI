import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DispatchTracking,AddDispatch  } from '../../model/dispatch.model';
export type { DispatchTracking };

@Injectable({
  providedIn: 'root'
})
export class DispatchService {
   private baseUrl = 'https://localhost:7030/api/DispatchApi';

  constructor(private http: HttpClient) { }
   getDispatches(): Observable<DispatchTracking[]> {
    return this.http.get<DispatchTracking[]>(
      `${this.baseUrl}/FetchAllDispatches`
    );
  }
  getDispatchById(id: number): Observable<DispatchTracking> {

  return this.http.get<DispatchTracking>(
    `${this.baseUrl}/FetchDispatchById/${id}`
  );

}

filterByDcId(dcId: number): Observable<DispatchTracking[]> {
  return this.http.get<DispatchTracking[]>(
    `${this.baseUrl}/FilterByDcId/${dcId}`
  );
}

getDispatchesUsingEagerLoading(): Observable<DispatchTracking[]> {

  return this.http.get<DispatchTracking[]>(
    `${this.baseUrl}/FetchDispatchUsingEagerLoading`
  );

}

addDispatch(dispatch: AddDispatch): Observable<string> {

  return this.http.post(
    `${this.baseUrl}/AddDispatch`,
    dispatch,
    { responseType: 'text' }
  );

}
}
