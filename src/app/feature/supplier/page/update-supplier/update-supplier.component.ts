import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { SupplierUpdate } from '../../../../model/supplier.model';
import { SupplierApiError, SupplierService } from '../../../../service/supplier/supplier.service';
import { SupplierDropdownService } from '../../../../service/supplier/supplier-dropdown.service';

@Component({ standalone: true, selector: 'mlp-update-supplier', imports: [FormsModule], templateUrl: './update-supplier.component.html', styleUrl: './update-supplier.component.scss' })
export class UpdateSupplierComponent implements OnInit {
  supplierId: number | null = null;
  supplier = this.createEmptySupplier();
  message = ''; errorMessage = ''; fieldErrors: Record<string, string[]> = {}; submitted = false; isLoading = false;

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

  loadSupplier(): void {
    if (!this.supplierId || this.supplierId < 1) { this.errorMessage = 'Enter a valid supplier ID.'; return; }
    this.isLoading = true; this.errorMessage = ''; this.fieldErrors = {};
    this.supplierService.getSupplierById(this.supplierId).subscribe({
      next: supplier => {
        this.supplier = supplier;
        this.isLoading = false;
        // Populate cascading dropdown options based on the loaded supplier
        if (this.supplier.country) {
          this.dropdownService.getStates(this.supplier.country).subscribe(states => this.states = states);
        } else {
          this.states = [];
        }
        if (this.supplier.state) {
          this.dropdownService.getCities(this.supplier.state).subscribe(cities => this.cities = cities);
        } else {
          this.cities = [];
        }
      },
      error: (error: SupplierApiError) => this.setApiError(error)
    });
  }

  updateSupplier(form: NgForm): void {
    this.submitted = true; this.message = ''; this.errorMessage = ''; this.fieldErrors = {};
    if (!this.supplierId) { this.errorMessage = 'Load a supplier before saving.'; return; }
    if (form.invalid) { this.errorMessage = 'Please correct the highlighted fields.'; return; }
    this.isLoading = true;
    this.supplierService.updateSupplier(this.supplierId, { ...this.supplier, supplierId: this.supplierId }).subscribe({ next: supplier => { this.supplier = supplier; this.message = `Supplier ${supplier.contactPerson} updated successfully.`; this.isLoading = false; }, error: (error: SupplierApiError) => this.setApiError(error) });
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
    if (control.errors?.['min'] || control.errors?.['max']) return 'Age must be between 18 and 70.';
    return 'Invalid value.';
  }

  clearFieldError(field: string): void {
    if (this.fieldErrors[field]) {
      delete this.fieldErrors[field];
    }
  }

  private setApiError(error: SupplierApiError): void { this.fieldErrors = error.fieldErrors ?? {}; this.errorMessage = error.message; this.isLoading = false; }
  private fieldLabel(field: string): string { return ({ companyName: 'Supplier Name', contactPerson: 'Contact Person', supplierType: 'Supplier Type', phone: 'Phone Number', pincode: 'Pincode', address: 'Address', city: 'City', state: 'State', country: 'Country' } as Record<string, string>)[field] ?? field[0].toUpperCase() + field.slice(1); }
  private createEmptySupplier(): SupplierUpdate { return { supplierId: 0, companyName: '', contactPerson: '', age: 18, phone: '', email: '', supplierType: '', address: '', city: '', state: '', country: '', pincode: '' }; }
}
