import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService, StockLevel } from '../../../service/inventory/inventory.service';
import { PageHeaderComponent } from '../../../common/component/page-header/page-header.component';
import { SearchBoxComponent } from '../../../common/component/search-box/search-box.component';
import { StatusBadgeComponent } from '../../../common/component/status-badge/status-badge.component';
import { LoaderComponent } from '../../../common/component/loader/loader.component';
import { EmptyStateComponent } from '../../../common/component/empty-state/empty-state.component';

@Component({
  selector: 'app-stock-list-page',
  standalone: true,
  imports: [
    CommonModule, 
    PageHeaderComponent, 
    SearchBoxComponent, 
    StatusBadgeComponent, 
    LoaderComponent, 
    EmptyStateComponent
  ],
  templateUrl: './stock-list-page.component.html',
  styleUrl: './stock-list-page.component.scss'
})
export class StockListPageComponent implements OnInit {
  loading = false;
  stock: StockLevel[] = [];
  filteredStock: StockLevel[] = [];
  searchQuery: string = '';

  private inventoryService = inject(InventoryService);

  ngOnInit(): void {
    this.loadStock();
  }

  loadStock(): void {
    this.loading = true;
    this.inventoryService.getStockLevels().subscribe({
      next: (res) => {
        this.stock = res;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredStock = this.stock.filter(s => {
      return !this.searchQuery ||
        s.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.sku.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.binLocation?.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
}
