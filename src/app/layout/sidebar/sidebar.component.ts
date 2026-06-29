import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  hasChildren?: boolean;
}

export interface SidebarGroup {
  name: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed: boolean = false;
  
  @Output() toggleCollapse = new EventEmitter<void>();
  @Output() moduleSelect = new EventEmitter<string>();

  private router = inject(Router);

  groups: SidebarGroup[] = [
    {
      name: 'Operations',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie', route: '/dashboard' }
      ]
    },
    {
      name: 'Master Data',
      items: [
        { id: 'supplier', label: 'Suppliers', icon: 'fa-truck', route: '/supplier', hasChildren: true },
        { id: 'product-master', label: 'Product Master', icon: 'fa-boxes-packing', route: '/product-master' },
        { id: 'store', label: 'Stores', icon: 'fa-store', route: '/store' }
      ]
    },
    {
      name: 'Procurement',
      items: [
        { id: 'procurement', label: 'Purchase Orders', icon: 'fa-file-invoice-dollar', route: '/procurement' },
        { id: 'inbound-shipment', label: 'Inbound Shipments', icon: 'fa-truck-ramp-box', route: '/inbound-shipment' },
        { id: 'dc-receiving', label: 'Receiving & QC', icon: 'fa-clipboard-check', route: '/dc-receiving' }
      ]
    },
    {
      name: 'Warehouse',
      items: [
        { id: 'inventory', label: 'DC Inventory', icon: 'fa-warehouse', route: '/inventory', hasChildren: true }
      ]
    },
    {
      name: 'Outbound',
      items: [
        { id: 'replenishment', label: 'Store Replenishment', icon: 'fa-truck-arrow-right', route: '/replenishment' },
        { id: 'dispatch', label: 'Dispatch Tracking', icon: 'fa-shipping-fast', route: '/dispatch' },
        { id: 'returns', label: 'Store Returns', icon: 'fa-rotate-left', route: '/returns' }
      ]
    },
    {
      name: 'System',
      items: [
        { id: 'reports', label: 'Reports', icon: 'fa-file-chart-column', route: '/reports' },
        { id: 'administration', label: 'Administration', icon: 'fa-sliders-h', route: '/administration' }
      ]
    }
  ];

  onToggleCollapse(): void {
    this.toggleCollapse.emit();
  }

  onItemClick(item: SidebarItem, event: Event): void {
    this.moduleSelect.emit(item.id);
    
    if (item.hasChildren) {
      this.moduleSelect.emit(item.id);
    }
  }
}
