import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService, StockAdjustment } from '../../../service/inventory/inventory.service';
import { PageHeaderComponent } from '../../../common/component/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../common/component/status-badge/status-badge.component';
import { LoaderComponent } from '../../../common/component/loader/loader.component';
import { EmptyStateComponent } from '../../../common/component/empty-state/empty-state.component';

@Component({
  selector: 'app-adjustments-page',
  standalone: true,
  imports: [
    CommonModule, 
    PageHeaderComponent, 
    StatusBadgeComponent, 
    LoaderComponent, 
    EmptyStateComponent
  ],
  templateUrl: './adjustments-page.component.html',
  styleUrl: './adjustments-page.component.scss'
})
export class AdjustmentsPageComponent implements OnInit {
  loading = false;
  adjustments: StockAdjustment[] = [];

  private inventoryService = inject(InventoryService);

  ngOnInit(): void {
    this.loadAdjustments();
  }

  loadAdjustments(): void {
    this.loading = true;
    this.inventoryService.getAdjustments().subscribe({
      next: (res) => {
        this.adjustments = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
