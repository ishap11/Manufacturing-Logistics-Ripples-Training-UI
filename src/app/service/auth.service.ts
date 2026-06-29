import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.checkInitialAuth());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor() {}

  private checkInitialAuth(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }

  public get isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  login(username: string, password: string): Observable<boolean> {
    // Simulating a successful login with dummy data
    const success = (username === 'admin' && password === 'admin') || (username.length > 2 && password.length > 2);
    
    return of(success).pipe(
      delay(800), // simulate network delay
      tap(result => {
        if (result) {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
          }
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
    }
    this.loggedInSubject.next(false);
  }

  getCurrentUser(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('currentUser') || 'Guest User';
    }
    return 'Guest User';
  }
}
