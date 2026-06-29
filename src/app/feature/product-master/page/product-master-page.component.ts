import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-master-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-master-page.component.html',
  styleUrl: './product-master-page.component.scss'
})
export class ProductMasterPageComponent {
  title = 'Product Master';
  description = 'Centralized repository of all product definitions, SKUs and master data.';
}
