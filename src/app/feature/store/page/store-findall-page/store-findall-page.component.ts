import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { EmptyStateComponent } from '../../../../common/component/empty-state/empty-state.component';
import { LoaderComponent } from '../../../../common/component/loader/loader.component';
import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../common/component/search-box/search-box.component';
import { StoreProfile, StoreService } from '../../../../service/store/store.service';

@Component({
  selector: 'mlp-store-findall-page',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, SearchBoxComponent, LoaderComponent, EmptyStateComponent],
  templateUrl: './store-findall-page.component.html',
  styleUrl: './store-findall-page.component.scss'
})
export class StoreFindallPageComponent implements OnInit {
  loading = false;
  stores: StoreProfile[] = [];
  filteredStores: StoreProfile[] = [];
  searchQuery = '';

  
  constructor(
  private storeService: StoreService
) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.loading = true;
    this.storeService.getStores().subscribe({
      next: (res) => {
        this.stores = res;
        this.applySearch();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applySearch();
  }

  applySearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredStores = this.stores.filter(store =>
      !query ||
      store.storeCode.toLowerCase().includes(query) ||
      store.storeName.toLowerCase().includes(query)
    );
  }
}