import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Supplier } from '../../../../model/supplier.model';
import { SupplierService } from '../../../../service/supplier/supplier.service';

@Component({
  selector: 'mlp-find-supplier-withid',
  imports: [CommonModule, FormsModule],
  templateUrl: './find-supplier-withid.html',
  styleUrl: './find-supplier-withid.scss',
})
export class FindSupplierWithid {
  supplierId: number | null = null;
  supplier?: Supplier;
  searched = false;
  isLoading = false;
  errorMessage = '';

  constructor(private supplierService: SupplierService) {}

  fetchSupplier(): void {
    if (this.supplierId === null) {
      this.supplier = undefined;
      this.searched = false;
      return;
    }

    const enteredId = this.supplierId;
    this.isLoading = true;
    this.errorMessage = '';
    this.supplier = undefined;
    this.searched = false;

    this.supplierService.getSupplierById(enteredId).subscribe({
      next: supplier => {
        this.supplier = supplier;
        this.searched = true;
        this.isLoading = false;
      },
      error: error => {
        this.supplier = undefined;
        this.searched = true;
        this.isLoading = false;
        if (!error.isServerError) {
          this.errorMessage = `No supplier found with ID: ${enteredId}`;
        } else {
          this.errorMessage = error.message;
        }
      }
    });
  }
}
