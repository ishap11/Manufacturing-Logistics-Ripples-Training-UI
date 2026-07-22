import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmptyStateComponent } from '../../../../common/component/empty-state/empty-state.component';
import { LoaderComponent } from '../../../../common/component/loader/loader.component';
import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { StoreProfile, StoreService } from '../../../../service/store/store.service';

@Component({
  selector: 'mlp-store-filter-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoaderComponent, EmptyStateComponent],
  templateUrl: './store-filter-page.component.html',
  styleUrl: './store-filter-page.component.scss'
})
export class StoreFilterPageComponent {
  loading = false;
  stores: StoreProfile[] = [];
  nameFilter = '';
  errorMessage: string | null = null;
  searched = false;

  
  constructor(
  private storeService: StoreService
) {}

  applyFilters(): void {
    if (!this.nameFilter.trim()) {
      this.stores = [];
      this.searched = false;
      this.errorMessage = null;
      return;
    }

    this.loading = true;
    this.searched = true;
    this.errorMessage = null;

    this.storeService.filterStores(this.nameFilter.trim()).subscribe({
      next: (res) => {
        this.stores = res;
        this.loading = false;
      },
      error: (err) => {
        this.stores = [];
        this.errorMessage = err?.error?.error ?? 'No stores found.';
        this.loading = false;
      }
    });
  }
}