import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DashboardMetricCard, RecentActivity, Announcement } from '../../model/dashboard.model';
export type { DashboardMetricCard, RecentActivity, Announcement };

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getMetrics(): Observable<DashboardMetricCard[]> {
    const metrics: DashboardMetricCard[] = [
      { id: 'suppliers', title: 'Total Suppliers', value: 24, icon: 'fa-truck', colorClass: 'primary', change: '+2 new this week', changeType: 'positive' },
      { id: 'products', title: 'Products (SKUs)', value: '1,420', icon: 'fa-boxes-packing', colorClass: 'info', change: '8 categories active', changeType: 'neutral' },
      { id: 'po', title: 'Purchase Orders', value: 89, icon: 'fa-file-invoice-dollar', colorClass: 'success', change: '12 pending signature', changeType: 'positive' },
      { id: 'shipments', title: 'Active Shipments', value: 14, icon: 'fa-truck-ramp-box', colorClass: 'warning', change: '4 in transit', changeType: 'positive' },
      { id: 'inventory', title: 'Available Units', value: '45,860', icon: 'fa-warehouse', colorClass: 'primary', change: '92% storage limit', changeType: 'neutral' },
      { id: 'stores', title: 'Active Stores', value: 42, icon: 'fa-store', colorClass: 'info', change: '2 new regions', changeType: 'positive' },
      { id: 'returns', title: 'Open Returns', value: 6, icon: 'fa-rotate-left', colorClass: 'danger', change: '-3% drop from last month', changeType: 'positive' },
      { id: 'revenue', title: 'Total Value ($)', value: '1.24M', icon: 'fa-dollar-sign', colorClass: 'success', change: '+14% YoY increase', changeType: 'positive' }
    ];
    return of(metrics).pipe(delay(400));
  }

  getRecentActivities(): Observable<RecentActivity[]> {
    const activities: RecentActivity[] = [
      { id: 1, time: '10 mins ago', module: 'Inventory', description: 'Stock adjustments approved for SKU-9021 (Electronics)', user: 'Alex Mercer', status: 'Success' },
      { id: 2, time: '24 mins ago', module: 'Procurement', description: 'PO #1042 created and dispatched to ABC Ltd', user: 'Sarah Jenkins', status: 'Pending' },
      { id: 3, time: '1 hour ago', module: 'Receiving', description: 'Receiving logs submitted for Inbound Shipment #8821', user: 'Michael Brown', status: 'Success' },
      { id: 4, time: '3 hours ago', module: 'Dispatch', description: 'Replenishment order dispatch #2411 cleared for Store #12', user: 'Alex Mercer', status: 'Success' },
      { id: 5, time: '5 hours ago', module: 'Returns', description: 'Defective item intake verified for customer return #RT-901', user: 'Rachel Green', status: 'Alert' }
    ];
    return of(activities).pipe(delay(400));
  }

  getAnnouncements(): Observable<Announcement[]> {
    const announcements: Announcement[] = [
      { id: 1, date: '2026-06-28', title: 'Quarterly Inventory Audit', content: 'The physical warehouse stock count begins this Friday. Normal receiving will be suspended.', priority: 'high' },
      { id: 2, date: '2026-06-25', title: 'System Maintenance Window', content: 'Database migration will occur on Sunday at 02:00 AM. Access will be offline for 30 minutes.', priority: 'normal' },
      { id: 3, date: '2026-06-22', title: 'New Supplier Routing Guides', content: 'Updated routing instructions are available under the Supplier Rate Cards module.', priority: 'low' }
    ];
    return of(announcements).pipe(delay(400));
  }
}
