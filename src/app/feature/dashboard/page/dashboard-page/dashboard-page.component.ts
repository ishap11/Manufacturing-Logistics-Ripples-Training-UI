import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardMetricCard, RecentActivity, Announcement } from '../../../../service/dashboard/dashboard.service';
import { ProcurementService, PurchaseOrder } from '../../../../service/procurement/procurement.service';
import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { LoaderComponent } from '../../../../common/component/loader/loader.component';
import { StatusBadgeComponent } from '../../../../common/component/status-badge/status-badge.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule, 
    PageHeaderComponent, 
    LoaderComponent, 
    StatusBadgeComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
  loading = false;
  metrics: DashboardMetricCard[] = [];
  activities: RecentActivity[] = [];
  announcements: Announcement[] = [];
  recentPOs: PurchaseOrder[] = [];

  private dashboardService = inject(DashboardService);
  private procurementService = inject(ProcurementService);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    this.dashboardService.getMetrics().subscribe(res => {
      this.metrics = res;
    });

    this.dashboardService.getRecentActivities().subscribe(res => {
      this.activities = res;
    });

    this.dashboardService.getAnnouncements().subscribe(res => {
      this.announcements = res;
    });

    this.procurementService.getPurchaseOrders().subscribe({
      next: (res) => {
        this.recentPOs = res.slice(0, 4);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}
