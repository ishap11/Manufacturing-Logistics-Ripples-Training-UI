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

  constructor(private supplierService: SupplierService) {}

  fetchSupplier(): void {
    if (this.supplierId === null) {
      this.supplier = undefined;
      this.searched = false;
      return;
    }

    this.supplierService.getSupplierById(this.supplierId).subscribe(supplier => {
      this.supplier = supplier;
      this.searched = true;
    });
  }

}
