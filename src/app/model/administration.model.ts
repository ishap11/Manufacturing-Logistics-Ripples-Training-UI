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
