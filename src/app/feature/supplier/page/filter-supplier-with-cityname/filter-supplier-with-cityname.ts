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

    const enteredCityName = city;
    this.isLoading = true;
    this.errorMessage = '';
    this.suppliers = [];
    this.searched = false;

    this.supplierService.getSuppliersByCity(enteredCityName).subscribe({
      next: suppliers => {
        this.suppliers = suppliers;
        this.searched = true;
        this.isLoading = false;
        if (this.suppliers.length === 0) {
          this.errorMessage = `No suppliers found for the city: ${enteredCityName}`;
        }
      },
      error: error => {
        this.suppliers = [];
        this.searched = true;
        this.isLoading = false;
        if (!error.isServerError) {
          this.errorMessage = `No suppliers found for the city: ${enteredCityName}`;
        } else {
          this.errorMessage = error.message;
        }
      }
    });
  }
}
