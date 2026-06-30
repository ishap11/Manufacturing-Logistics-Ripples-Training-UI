import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-categories-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-categories-page.component.html',
  styleUrl: './supplier-categories-page.component.scss'
})
export class SupplierCategoriesPageComponent {
  title = 'Supplier Categories';
  description = 'Manage and view all supplier classification categories and groupings.';
}
