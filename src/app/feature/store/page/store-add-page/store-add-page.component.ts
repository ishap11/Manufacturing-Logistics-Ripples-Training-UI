import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { CreateStoreProfile, ManagerOption, AddressOption, UserOption, StoreService } from '../../../../service/store/store.service';

@Component({
  selector: 'mlp-store-add-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './store-add-page.component.html',
  styleUrl: './store-add-page.component.scss'
})
export class StoreAddPageComponent implements OnInit {
  saving = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  managers: ManagerOption[] = [];
  addresses: AddressOption[] = [];
  users: UserOption[] = [];

  loadingManagers = false;
  loadingAddresses = false;
  loadingUsers = false;

  storeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService
  ) {
    this.storeForm = this.formBuilder.group({
      StoreName: ['', [Validators.required, Validators.maxLength(100)]],
      ManagersIdFk: [null as number | null, Validators.required],
      AddressIdFk: [null as number | null, Validators.required],
      StoreStatusIdFk: [null as number | null],
      CreatedByUserIdFk: [null as number | null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadManagers();
    this.loadAddresses();
    this.loadUsers();
  }

  loadManagers(): void {
    this.loadingManagers = true;
    this.storeService.getManagers().subscribe({
      next: (managers) => {
        this.managers = managers;
        this.loadingManagers = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load managers list.';
        this.loadingManagers = false;
      }
    });
  }

  loadAddresses(): void {
    this.loadingAddresses = true;
    this.storeService.getAddresses().subscribe({
      next: (addresses) => {
        this.addresses = addresses;
        this.loadingAddresses = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load addresses list.';
        this.loadingAddresses = false;
      }
    });
  }

  loadUsers(): void {
    this.loadingUsers = true;
    this.storeService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loadingUsers = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load users list.';
        this.loadingUsers = false;
      }
    });
  }

  addStore(): void {
    if (this.storeForm.invalid) {
      this.storeForm.markAllAsTouched();
      return;
    }

    const payload: CreateStoreProfile = {
      StoreName: this.storeForm.controls['StoreName'].value?.trim() ?? '',
      ManagersIdFk: this.storeForm.controls['ManagersIdFk'].value,
      AddressIdFk: this.storeForm.controls['AddressIdFk'].value,
      StoreStatusIdFk: this.storeForm.controls['StoreStatusIdFk'].value,
      CreatedByUserIdFk: this.storeForm.controls['CreatedByUserIdFk'].value
    };

    this.saving = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.storeService.addStore(payload).subscribe({
      next: (res) => {
        this.successMessage = res?.message ?? 'Store Added Successfully';
        this.storeForm.reset();
        this.saving = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.error ?? err?.error?.message ?? 'Failed to add store.';
        this.saving = false;
      }
    });
  }
}