import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-list-page.component.html',
  styleUrl: './supplier-list-page.component.scss'
})
export class SupplierListPageComponent {
  title = 'Supplier List';
  description = 'Browse and manage the registered supplier catalogue for the enterprise.';
}
