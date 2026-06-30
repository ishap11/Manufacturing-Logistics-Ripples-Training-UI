import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-dashboard-page.component.html',
  styleUrl: './supplier-dashboard-page.component.scss'
})
export class SupplierDashboardPageComponent {
  title = 'Supplier Dashboard';
  description = 'Overview of manufacturer supplier metrics and status summary.';
}
