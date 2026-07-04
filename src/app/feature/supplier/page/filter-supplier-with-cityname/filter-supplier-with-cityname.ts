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

  constructor(private supplierService: SupplierService) {}

  filterByCity(): void {
    const city = this.cityName.trim();
    if (!city) {
      this.suppliers = [];
      this.searched = false;
      return;
    }

    this.supplierService.getSuppliersByCity(city).subscribe(suppliers => {
      this.suppliers = suppliers;
      this.searched = true;
    });
  }

}
