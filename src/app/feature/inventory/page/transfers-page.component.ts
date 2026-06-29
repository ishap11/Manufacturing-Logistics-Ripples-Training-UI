import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService, StockTransfer } from '../../../service/inventory/inventory.service';
import { PageHeaderComponent } from '../../../common/component/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../common/component/status-badge/status-badge.component';
import { LoaderComponent } from '../../../common/component/loader/loader.component';
import { EmptyStateComponent } from '../../../common/component/empty-state/empty-state.component';

@Component({
  selector: 'app-transfers-page',
  standalone: true,
  imports: [
    CommonModule, 
    PageHeaderComponent, 
    StatusBadgeComponent, 
    LoaderComponent, 
    EmptyStateComponent
  ],
  templateUrl: './transfers-page.component.html',
  styleUrl: './transfers-page.component.scss'
})
export class TransfersPageComponent implements OnInit {
  loading = false;
  transfers: StockTransfer[] = [];

  private inventoryService = inject(InventoryService);

  ngOnInit(): void {
    this.loadTransfers();
  }

  loadTransfers(): void {
    this.loading = true;
    this.inventoryService.getTransfers().subscribe({
      next: (res) => {
        this.transfers = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  simulateTransfer(): void {
    const sku = prompt('Enter SKU to move:', 'SKU-WIDG-4309');
    if (!sku) return;
    const sourceBin = prompt('Enter Source Bin Location:', 'A-12-04');
    if (!sourceBin) return;
    const destBin = prompt('Enter Destination Bin Location:', 'B-02-11');
    if (!destBin) return;
    const qty = +(prompt('Enter Quantity to move:', '50') || 0);
    if (!qty || qty <= 0) return;

    const newTransfer: StockTransfer = {
      id: Date.now(),
      transferNumber: `TRF-${Date.now()}`,
      sku,
      sourceBin,
      sourceLocation: sourceBin,
      destBin,
      destLocation: destBin,
      quantity: qty,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'Completed'
    };

    this.loading = true;
    this.inventoryService.addTransfer(newTransfer).subscribe({
      next: (t) => {
        this.transfers.unshift(t);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
