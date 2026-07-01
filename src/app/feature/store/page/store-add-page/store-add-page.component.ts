import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../common/component/status-badge/status-badge.component';
import { CreateStoreProfile, StoreProfile, StoreService } from '../../../../service/store/store.service';

@Component({
  selector: 'mlp-store-add-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent, StatusBadgeComponent],
  templateUrl: './store-add-page.component.html',
  styleUrl: './store-add-page.component.scss'
})
export class StoreAddPageComponent {
  saving = false;
  createdStore: StoreProfile | null = null;

  private formBuilder = inject(FormBuilder);
  private storeService = inject(StoreService);

  storeForm = this.formBuilder.group({
    Store_Code: ['', [Validators.required, Validators.maxLength(20)]],
    Store_Name: ['', [Validators.required, Validators.maxLength(100)]],
    Store_Manager_Id_Fk: [null as number | null],
    Address_Id_FK: [null as number | null],
    Store_Status_Id_FK: [1, Validators.required],
    city: ['', Validators.required],
    region: ['', Validators.required],
    status: ['Active' as StoreProfile['status'], Validators.required],
    managerName: ['', Validators.required]
  });

  addStore(): void {
    if (this.storeForm.invalid) {
      this.storeForm.markAllAsTouched();
      return;
    }

    const now = this.storeService.getCurrentDateTime();
    const payload: CreateStoreProfile = {
      Store_Code: this.storeForm.controls.Store_Code.value?.trim() ?? '',
      Store_Name: this.storeForm.controls.Store_Name.value?.trim() ?? '',
      Store_Manager_Id_Fk: this.storeForm.controls.Store_Manager_Id_Fk.value,
      Address_Id_FK: this.storeForm.controls.Address_Id_FK.value,
      Store_Status_Id_FK: this.storeForm.controls.Store_Status_Id_FK.value,
      Created_DateTime: now,
      Updated_DateTime: now,
      city: this.storeForm.controls.city.value?.trim() ?? '',
      region: this.storeForm.controls.region.value?.trim() ?? '',
      status: this.storeForm.controls.status.value ?? 'Active',
      managerName: this.storeForm.controls.managerName.value?.trim() ?? ''
    };

    this.saving = true;
    this.storeService.addStore(payload).subscribe({
      next: (store) => {
        this.createdStore = store;
        this.storeForm.reset({ Store_Status_Id_FK: 1, status: 'Active' });
        this.saving = false;
      },
      error: () => {
        this.saving = false;
      }
    });
  }

}
