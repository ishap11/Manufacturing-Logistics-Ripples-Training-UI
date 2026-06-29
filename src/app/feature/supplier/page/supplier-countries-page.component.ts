import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-countries-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-countries-page.component.html',
  styleUrl: './supplier-countries-page.component.scss'
})
export class SupplierCountriesPageComponent {
  title = 'Supplier Countries';
  description = 'View geographic distribution and country-level supplier statistics.';
}
