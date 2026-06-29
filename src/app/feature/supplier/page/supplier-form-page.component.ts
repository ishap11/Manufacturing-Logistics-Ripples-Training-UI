import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-form-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-form-page.component.html',
  styleUrl: './supplier-form-page.component.scss'
})
export class SupplierFormPageComponent {
  title = 'Supplier Form';
  description = 'Create or update supplier information and onboarding details.';
}
