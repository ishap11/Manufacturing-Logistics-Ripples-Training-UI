import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SubSidebarLink } from '../../model/layout.model';

@Component({
  selector: 'app-sub-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sub-sidebar.component.html',
  styleUrl: './sub-sidebar.component.scss'
})
export class SubSidebarComponent implements OnChanges {
  @Input() activeModule: string = '';

  moduleTitle: string = '';
  links: SubSidebarLink[] = [];
  hasLinks: boolean = false;

  private subSidebarConfig: { [key: string]: { title: string; links: SubSidebarLink[] } } = {
    supplier: {
      title: 'Supplier Portal',
      links: [
        { label: 'Dashboard', route: '/supplier/dashboard', icon: 'fa-chart-pie' },
        { label: 'Supplier List', route: '/supplier/list', icon: 'fa-address-book' },
        { label: 'Add Supplier', route: '/supplier/add', icon: 'fa-user-plus' },
        { label: 'Categories', route: '/supplier/categories', icon: 'fa-tags' },
        { label: 'Countries', route: '/supplier/countries', icon: 'fa-globe' },
        { label: 'Rate Cards', route: '/supplier/rate-cards', icon: 'fa-dollar-sign' }
      ]
    },
    inventory: {
      title: 'Inventory Control',
      links: [
        { label: 'Dashboard', route: '/inventory/dashboard', icon: 'fa-chart-bar' },
        { label: 'Stock Levels', route: '/inventory/stock', icon: 'fa-boxes-stacked' },
        { label: 'Internal Transfers', route: '/inventory/transfers', icon: 'fa-exchange-alt' },
        { label: 'Stock Adjustments', route: '/inventory/adjustments', icon: 'fa-sliders-h' },
        { label: 'Cycle Counting', route: '/inventory/cycle-count', icon: 'fa-list-check' },
        { label: 'Inventory Reports', route: '/inventory/reports', icon: 'fa-file-alt' }
      ]
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeModule']) {
      this.loadModuleLinks();
    }
  }

  private loadModuleLinks(): void {
    const config = this.subSidebarConfig[this.activeModule.toLowerCase()];
    if (config) {
      this.moduleTitle = config.title;
      this.links = config.links;
      this.hasLinks = true;
    } else {
      this.moduleTitle = '';
      this.links = [];
      this.hasLinks = false;
    }
  }
}
