import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EmptyStateComponent } from '../../../../common/component/empty-state/empty-state.component';
import { LoaderComponent } from '../../../../common/component/loader/loader.component';
import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../common/component/search-box/search-box.component';
import { StoreProfile, UpdateStoreProfile, StoreService } from '../../../../service/store/store.service';

@Component({
  selector: 'mlp-store-update-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    SearchBoxComponent,
    LoaderComponent,
    EmptyStateComponent
  ],
  templateUrl: './store-update-page.component.html',
  styleUrl: './store-update-page.component.scss'
})
export class StoreUpdatePageComponent {
  loading = false;
  saving = false;
  searched = false;
  selectedStore: StoreProfile | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService
  ) {
    this.updateForm = this.formBuilder.group({
      StoreName: ['', [Validators.required, Validators.maxLength(100)]],
      ManagersIdFk: [null as number | null],
      StoreStatusIdFk: [null as number | null],
      UpdatedByUserIdFk: [null as number | null]
    });
  }

  findStore(query: string): void {
    const trimmed = query.trim();
    if (!trimmed) return;

    const id = Number(trimmed);
    if (isNaN(id)) {
      alert('Please enter a valid numeric Store ID.');
      return;
    }

    this.loading = true;
    this.searched = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.storeService.findStore(id).subscribe({
      next: (store) => {
        this.selectedStore = store ?? null;
        if (store) {
          this.updateForm.patchValue({
            StoreName: store.storeName,
            ManagersIdFk: store.managersIdFk,
            StoreStatusIdFk: store.storeStatusIdFk,
            UpdatedByUserIdFk: null
          });
        }
        this.loading = false;
      },
      error: () => {
        this.selectedStore = null;
        this.loading = false;
      }
    });
  }

  updateStore(): void {
    if (!this.selectedStore || this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const payload: UpdateStoreProfile = {
      StoreName: this.updateForm.controls['StoreName'].value?.trim() ?? '',
      ManagersIdFk: this.updateForm.controls['ManagersIdFk'].value,
      StoreStatusIdFk: this.updateForm.controls['StoreStatusIdFk'].value,
      UpdatedByUserIdFk: this.updateForm.controls['UpdatedByUserIdFk'].value
    };

    this.saving = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.storeService.updateStore(this.selectedStore.storeIdPk, payload).subscribe({
      next: (res) => {
        this.successMessage = res?.message ?? 'Store Updated Successfully';
        this.saving = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.error ?? 'Failed to update store.';
        this.saving = false;
      }
    });
  }
}