import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { SupplierCreate } from '../../../../model/supplier.model';
import { SupplierApiError, SupplierService } from '../../../../service/supplier/supplier.service';
import { SupplierDropdownService } from '../../../../service/supplier/supplier-dropdown.service';

@Component({ selector: 'mlp-add-supplier', imports: [FormsModule], templateUrl: './add-supplier.html', styleUrl: './add-supplier.scss' })
export class AddSupplier implements OnInit {
  supplier: SupplierCreate = this.createEmptySupplier();
  message = '';
  errorMessage = '';
  fieldErrors: Record<string, string[]> = {};
  submitted = false;
  isLoading = false;

  supplierTypes: string[] = [];
  countries: string[] = [];
  states: string[] = [];
  cities: string[] = [];

  constructor(
    private readonly supplierService: SupplierService,
    private readonly dropdownService: SupplierDropdownService
  ) {}

  ngOnInit(): void {
    this.dropdownService.getSupplierTypes().subscribe(types => this.supplierTypes = types);
    this.dropdownService.getCountries().subscribe(countries => this.countries = countries);
  }

  onCountryChange(country: string): void {
    this.supplier.state = '';
    this.supplier.city = '';
    this.states = [];
    this.cities = [];
    if (country) {
      this.dropdownService.getStates(country).subscribe(states => this.states = states);
    }
    this.clearFieldError('country');
  }

  onStateChange(state: string): void {
    this.supplier.city = '';
    this.cities = [];
    if (state) {
      this.dropdownService.getCities(state).subscribe(cities => this.cities = cities);
    }
    this.clearFieldError('state');
  }

  onCityChange(city: string): void {
    this.clearFieldError('city');
  }

  addSupplier(form: NgForm): void {
    this.submitted = true;
    this.message = ''; this.errorMessage = ''; this.fieldErrors = {};
    if (form.invalid) { this.errorMessage = 'Please correct the highlighted fields.'; return; }

    this.isLoading = true;
    this.supplierService.addSupplier(this.supplier).subscribe({
      next: supplier => {
        this.message = `Supplier ${supplier.contactPerson} added successfully with ID ${supplier.supplierId}.`;
        this.isLoading = false; this.submitted = false; form.resetForm(); this.supplier = this.createEmptySupplier();
        this.states = [];
        this.cities = [];
      },
      error: (error: SupplierApiError) => this.setApiError(error)
    });
  }

  fieldMessage(control: NgModel, field: string): string | null {
    if (this.fieldErrors[field]?.length) return this.fieldErrors[field][0];
    if (!this.submitted || control.valid) return null;
    if (control.errors?.['required']) return `${this.fieldLabel(field)} is required.`;
    if (control.errors?.['email']) return 'Invalid Email format.';
    if (control.errors?.['pattern']) {
      if (field === 'pincode') return 'Invalid Pincode.';
      if (field === 'phone') return 'Invalid Phone Number.';
      if (field === 'contactPerson') return 'Contact Person name must contain only alphabetic characters.';
      return 'Invalid value.';
    }
    if (control.errors?.['minlength']) return `${this.fieldLabel(field)} must contain at least 3 characters.`;
    if (control.errors?.['min'] || control.errors?.['max']) return 'Age must be greater than 18 ';
    return 'Invalid value.';
  }

  clearFieldError(field: string): void {
    if (this.fieldErrors[field]) {
      delete this.fieldErrors[field];
    }
  }

  private setApiError(error: SupplierApiError): void { this.fieldErrors = error.fieldErrors ?? {}; this.errorMessage = error.message; this.isLoading = false; }
  private fieldLabel(field: string): string { return ({ companyName: 'Supplier Name', contactPerson: 'Contact Person', supplierType: 'Supplier Type', phone: 'Phone Number', pincode: 'Pincode', address: 'Address', city: 'City', state: 'State', country: 'Country' } as Record<string, string>)[field] ?? field[0].toUpperCase() + field.slice(1); }
  private createEmptySupplier(): SupplierCreate { return { companyName: '', contactPerson: '', age: 0, phone: '', email: '', supplierType: '', address: '', city: '', state: '', country: '', pincode: '' }; }
}
