import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService, StockLevel } from '../../../service/inventory/inventory.service';
import { PageHeaderComponent } from '../../../common/component/page-header/page-header.component';
import { LoaderComponent } from '../../../common/component/loader/loader.component';

@Component({
  selector: 'app-inventory-dashboard-page',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoaderComponent],
  templateUrl: './inventory-dashboard-page.component.html',
  styleUrl: './inventory-dashboard-page.component.scss'
})
export class InventoryDashboardPageComponent implements OnInit {
  loading = false;
  stock: StockLevel[] = [];
  totalQuantity = 0;
  totalValue = 0;

  private inventoryService = inject(InventoryService);

  ngOnInit(): void {
    this.loadStock();
  }

  loadStock(): void {
    this.loading = true;
    this.inventoryService.getStockLevels().subscribe({
      next: (res) => {
        this.stock = res;
        this.calculateMetrics();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  private calculateMetrics(): void {
    this.totalQuantity = this.stock.reduce((acc, item) => acc + (item.quantity ?? item.onHandQuantity), 0);
    // Supposing unit price is roughly $15.5 for value calculation
    this.totalValue = this.stock.reduce((acc, item) => acc + ((item.quantity ?? item.onHandQuantity) * 15.5), 0);
  }
}
