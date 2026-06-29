import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent implements OnChanges {
  @Input() status: string = '';
  @Input() showIcon: boolean = false;

  badgeClass: string = 'badge-secondary';
  iconClass: string = '';

  ngOnChanges(): void {
    const s = this.status.trim().toLowerCase();
    
    if (['active', 'completed', 'approved', 'received', 'yes', 'success', 'delivered', 'available'].includes(s)) {
      this.badgeClass = 'badge-success';
      this.iconClass = 'fas fa-check-circle';
    } else if (['inactive', 'cancelled', 'voided', 'no', 'closed', 'draft', 'damaged'].includes(s)) {
      this.badgeClass = 'badge-secondary';
      this.iconClass = 'fas fa-times-circle';
    } else if (['pending', 'in progress', 'processing', 'reviewing', 'transit', 'low stock', 'expiring'].includes(s)) {
      this.badgeClass = 'badge-warning';
      this.iconClass = 'fas fa-exclamation-triangle';
    } else if (['danger', 'error', 'failed', 'rejected', 'alert', 'critical', 'out of stock'].includes(s)) {
      this.badgeClass = 'badge-danger';
      this.iconClass = 'fas fa-exclamation-circle';
    } else if (['info', 'new', 'shipped', 'ordered'].includes(s)) {
      this.badgeClass = 'badge-info';
      this.iconClass = 'fas fa-info-circle';
    } else {
      this.badgeClass = 'badge-secondary';
      this.iconClass = 'fas fa-question-circle';
    }
  }
}
