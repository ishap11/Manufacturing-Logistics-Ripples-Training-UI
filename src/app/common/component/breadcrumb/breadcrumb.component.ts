import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  url: string;
  active?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: BreadcrumbItem[] = [];

  private router = inject(Router);

  ngOnInit(): void {
    if (!this.items || this.items.length === 0) {
      this.generateBreadcrumbs();
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.generateBreadcrumbs();
      });
    }
  }

  private generateBreadcrumbs(): void {
    const url = this.router.url.split('?')[0];
    const segments = url.split('/').filter(x => x);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentUrl = '';
    segments.forEach((segment, index) => {
      if (segment === 'dashboard' && index === 0) return;
      
      currentUrl += `/${segment}`;
      
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        url: currentUrl
      });
    });

    this.items = breadcrumbs;
  }
}
