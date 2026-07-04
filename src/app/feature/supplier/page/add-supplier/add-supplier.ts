import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { SupplierService } from '../../../../service/supplier/supplier.service';

@Component({
  selector: 'mlp-add-supplier',
  imports: [FormsModule],
  templateUrl: './add-supplier.html',
  styleUrl: './add-supplier.scss',
})
export class AddSupplier {
  supplier = {
    companyName: '',
    supplierName: '',
    age: null as number | null,
    phone: '',
    address: '',
    city: ''
  };

  message = '';

  constructor(private supplierService: SupplierService) {}

  addSupplier(form: NgForm): void {
    if (form.invalid || this.supplier.age === null) {
      this.message = 'Please enter all supplier details.';
      return;
    }

    this.supplierService.addSupplier({
      companyName: this.supplier.companyName,
      supplierName: this.supplier.supplierName,
      age: this.supplier.age,
      phone: this.supplier.phone,
      address: this.supplier.address,
      city: this.supplier.city,
      code: `SUP-${Date.now()}`,
      email: '',
      category: 'General',
      country: '',
      status: 'Active',
      reliabilityScore: 90
    }).subscribe(supplier => {
      this.message = `Supplier ${supplier.supplierName} added successfully with ID ${supplier.id}.`;
      window.alert(this.message);
      form.resetForm();
      this.supplier = {
        companyName: '',
        supplierName: '',
        age: null,
        phone: '',
        address: '',
        city: ''
      };
    });
  }

}
