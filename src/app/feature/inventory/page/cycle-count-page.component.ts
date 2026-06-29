import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService, CycleCount } from '../../../service/inventory/inventory.service';
import { PageHeaderComponent } from '../../../common/component/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../common/component/status-badge/status-badge.component';
import { LoaderComponent } from '../../../common/component/loader/loader.component';
import { EmptyStateComponent } from '../../../common/component/empty-state/empty-state.component';

@Component({
  selector: 'app-cycle-count-page',
  standalone: true,
  imports: [
    CommonModule, 
    PageHeaderComponent, 
    StatusBadgeComponent, 
    LoaderComponent, 
    EmptyStateComponent
  ],
  templateUrl: './cycle-count-page.component.html',
  styleUrl: './cycle-count-page.component.scss'
})
export class CycleCountPageComponent implements OnInit {
  loading = false;
  cycles: CycleCount[] = [];

  private inventoryService = inject(InventoryService);

  ngOnInit(): void {
    this.loadCycles();
  }

  loadCycles(): void {
    this.loading = true;
    this.inventoryService.getCycles().subscribe({
      next: (res) => {
        this.cycles = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
