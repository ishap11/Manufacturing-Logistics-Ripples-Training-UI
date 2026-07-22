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

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }

}
