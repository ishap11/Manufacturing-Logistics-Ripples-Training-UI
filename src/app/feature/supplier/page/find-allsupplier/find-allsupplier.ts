import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Supplier } from '../../../../model/supplier.model';
import { SupplierService } from '../../../../service/supplier/supplier.service';

@Component({
  selector: 'mlp-find-allsupplier',
  imports: [CommonModule],
  templateUrl: './find-allsupplier.html',
  styleUrl: './find-allsupplier.scss',
})
export class FindAllsupplier implements OnInit {
  suppliers: Supplier[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe({ next: suppliers => {
      this.suppliers = suppliers; this.isLoading = false;
    }, error: error => {
      this.errorMessage = error.message; this.isLoading = false;
    }});
  }

}
