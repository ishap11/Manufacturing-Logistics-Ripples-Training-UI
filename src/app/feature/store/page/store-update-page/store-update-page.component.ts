import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { EmptyStateComponent } from '../../../../common/component/empty-state/empty-state.component';
import { LoaderComponent } from '../../../../common/component/loader/loader.component';
import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../common/component/search-box/search-box.component';
import { StatusBadgeComponent } from '../../../../common/component/status-badge/status-badge.component';
import { StoreProfile, StoreService } from '../../../../service/store/store.service';

@Component({
  selector: 'mlp-store-update-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    SearchBoxComponent,
    StatusBadgeComponent,
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
  updatedStore: StoreProfile | null = null;

  private formBuilder = inject(FormBuilder);
  private storeService = inject(StoreService);

  updateForm = this.formBuilder.group({
    Store_Name: ['', [Validators.required, Validators.maxLength(100)]],
    Store_Manager_Id_Fk: [null as number | null],
    Address_Id_FK: [null as number | null],
    Store_Status_Id_FK: [1, Validators.required],
    city: ['', Validators.required],
    region: ['', Validators.required],
    status: ['Active' as StoreProfile['status'], Validators.required],
    managerName: ['', Validators.required]
  });

  findStore(query: string): void {
    const trimmed = query.trim();
    if (!trimmed) return;

    this.loading = true;
    this.searched = true;
    this.updatedStore = null;
    this.storeService.findStore(trimmed).subscribe({
      next: (store) => {
        this.selectedStore = store ?? null;
        if (store) {
          this.updateForm.patchValue({
            Store_Name: store.Store_Name,
            Store_Manager_Id_Fk: store.Store_Manager_Id_Fk,
            Address_Id_FK: store.Address_Id_FK,
            Store_Status_Id_FK: store.Store_Status_Id_FK,
            city: store.city,
            region: store.region,
            status: store.status,
            managerName: store.managerName
          });
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updateStore(): void {
    if (!this.selectedStore || this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.storeService.updateStore(this.selectedStore.Store_Id_PK, {
      Store_Name: this.updateForm.controls.Store_Name.value?.trim() ?? '',
      Store_Manager_Id_Fk: this.updateForm.controls.Store_Manager_Id_Fk.value,
      Address_Id_FK: this.updateForm.controls.Address_Id_FK.value,
      Store_Status_Id_FK: this.updateForm.controls.Store_Status_Id_FK.value,
      city: this.updateForm.controls.city.value?.trim() ?? '',
      region: this.updateForm.controls.region.value?.trim() ?? '',
      status: this.updateForm.controls.status.value ?? 'Active',
      managerName: this.updateForm.controls.managerName.value?.trim() ?? ''
    }).subscribe({
      next: (store) => {
        this.updatedStore = store;
        this.selectedStore = store;
        this.saving = false;
      },
      error: () => {
        this.saving = false;
      }
    });
  }

}
