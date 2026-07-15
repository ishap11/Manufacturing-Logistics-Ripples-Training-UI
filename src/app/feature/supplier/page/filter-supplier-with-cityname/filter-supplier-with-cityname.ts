import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Supplier } from '../../../../model/supplier.model';
import { SupplierService } from '../../../../service/supplier/supplier.service';

@Component({
  selector: 'mlp-filter-supplier-with-cityname',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-supplier-with-cityname.html',
  styleUrl: './filter-supplier-with-cityname.scss',
})
export class FilterSupplierWithCityname {
  cityName = '';
  suppliers: Supplier[] = [];
  searched = false;
  isLoading = false;
  errorMessage = '';

  constructor(private supplierService: SupplierService) {}

  filterByCity(): void {
    const city = this.cityName.trim();
    if (!city) {
      this.suppliers = [];
      this.searched = false;
      return;
    }

    this.isLoading = true; this.errorMessage = '';
    this.supplierService.getSuppliersByCity(city).subscribe({ next: suppliers => {
      this.suppliers = suppliers; this.searched = true; this.isLoading = false;
    }, error: error => {
      this.suppliers = []; this.searched = true; this.errorMessage = error.message; this.isLoading = false;
    }});
  }

}
