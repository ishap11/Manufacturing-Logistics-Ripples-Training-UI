import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';

@Component({
  selector: 'app-inventory-reports-page',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './inventory-reports-page.component.html',
  styleUrl: './inventory-reports-page.component.scss'
})
export class InventoryReportsPageComponent {
  simulateExport(name: string): void {
    alert(`Downloading Simulated PDF Report: "${name}"`);
  }
}
