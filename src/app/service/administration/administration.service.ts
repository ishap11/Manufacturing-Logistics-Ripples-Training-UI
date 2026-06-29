import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface SystemUser {
  id: number;
  username: string;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface SecurityLog {
  id: number;
  timestamp: string;
  user: string;
  ipAddress: string;
  action: string;
  severity: 'Info' | 'Warning' | 'Critical';
}

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  private users: SystemUser[] = [
    { id: 1, username: 'admin', name: 'Vivek Admin', role: 'System Administrator', status: 'Active', lastLogin: '2026-06-29 22:30:15' },
    { id: 2, username: 'amercer', name: 'Alex Mercer', role: 'Warehouse Operator', status: 'Active', lastLogin: '2026-06-29 18:42:01' },
    { id: 3, username: 'sjenkins', name: 'Sarah Jenkins', role: 'Procurement Specialist', status: 'Active', lastLogin: '2026-06-29 15:10:44' },
    { id: 4, username: 'rgreen', name: 'Rachel Green', role: 'Store Return Agent', status: 'Inactive', lastLogin: '2026-06-20 09:22:11' }
  ];

  private logs: SecurityLog[] = [
    { id: 1, timestamp: '2026-06-29 22:31:04', user: 'admin', ipAddress: '192.168.1.45', action: 'Approved inventory transfers for SKU-ELEC-9021', severity: 'Info' },
    { id: 2, timestamp: '2026-06-29 22:15:22', user: 'amercer', ipAddress: '192.168.1.102', action: 'Failed login attempt - incorrect credentials', severity: 'Warning' },
    { id: 3, timestamp: '2026-06-29 18:30:00', user: 'system', ipAddress: '127.0.0.1', action: 'Automatic database backup completed successfully', severity: 'Info' },
    { id: 4, timestamp: '2026-06-28 04:00:12', user: 'intruder', ipAddress: '45.89.21.3', action: 'Unauthorized access attempt to secure route /administration', severity: 'Critical' }
  ];

  getUsers(): Observable<SystemUser[]> {
    return of(this.users).pipe(delay(400));
  }

  getSecurityLogs(): Observable<SecurityLog[]> {
    return of(this.logs).pipe(delay(400));
  }
}
