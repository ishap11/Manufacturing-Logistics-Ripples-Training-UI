import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-rate-cards-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-rate-cards-page.component.html',
  styleUrl: './supplier-rate-cards-page.component.scss'
})
export class SupplierRateCardsPageComponent {
  title = 'Supplier Rate Cards';
  description = 'Review and manage pricing rate cards negotiated with each supplier.';
}
