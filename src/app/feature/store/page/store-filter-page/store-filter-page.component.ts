import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmptyStateComponent } from '../../../../common/component/empty-state/empty-state.component';
import { LoaderComponent } from '../../../../common/component/loader/loader.component';
import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../common/component/status-badge/status-badge.component';
import { StoreProfile, StoreService } from '../../../../service/store/store.service';

@Component({
  selector: 'mlp-store-filter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    StatusBadgeComponent,
    LoaderComponent,
    EmptyStateComponent
  ],
  templateUrl: './store-filter-page.component.html',
  styleUrl: './store-filter-page.component.scss'
})
export class StoreFilterPageComponent implements OnInit {
  loading = false;
  stores: StoreProfile[] = [];
  statusFilter = '';
  regionFilter = '';

  private storeService = inject(StoreService);

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.loading = true;
    this.storeService.filterStores(this.statusFilter, this.regionFilter).subscribe({
      next: (res) => {
        this.stores = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

}
