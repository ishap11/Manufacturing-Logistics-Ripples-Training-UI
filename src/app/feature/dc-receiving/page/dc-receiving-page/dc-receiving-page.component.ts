import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../common/component/status-badge/status-badge.component';
import { LoaderComponent } from '../../../../common/component/loader/loader.component';
import { EmptyStateComponent } from '../../../../common/component/empty-state/empty-state.component';
import { ConfirmationModalComponent } from '../../../../common/component/confirmation-modal/confirmation-modal.component';
import { DataTableComponent } from '../../component/data-table/data-table.component';
import { TableCellDirective } from '../../directive/table-cell.directive';
import { ReceivingService } from '../../service/receiving.service';
import { Receiving, ReceivingItem, Shipment, Warehouse, TableConfig, AvailableProduct } from '../../model/receiving.model';

export function rowValidator(group: AbstractControl): ValidationErrors | null {
  const orderedQty = group.get('orderedQty')?.value ?? 0;
  const receivedQty = group.get('receivedQty')?.value ?? 0;
  const damagedQty = group.get('damagedQty')?.value ?? 0;

  const errors: ValidationErrors = {};

  if (receivedQty > orderedQty) {
    errors['receivedExceedsOrdered'] = true;
  }
  if (damagedQty > receivedQty) {
    errors['damagedExceedsReceived'] = true;
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

@Component({
  selector: 'app-dc-receiving-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    StatusBadgeComponent,
    LoaderComponent,
    EmptyStateComponent,
    ConfirmationModalComponent,
    DataTableComponent,
    TableCellDirective
  ],
  templateUrl: './dc-receiving-page.component.html',
  styleUrl: './dc-receiving-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DcReceivingPageComponent implements OnInit {
  private receivingService = inject(ReceivingService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  loading = false;
  submitted = false;

  receivings: Receiving[] = [];
  filteredReceivings: Receiving[] = [];
  shipments: Shipment[] = [];
  warehouses: Warehouse[] = [];

  searchQuery = '';
  statusFilter = 'All';

  // Table configuration
  tableConfig: TableConfig = {
    columns: [
      { key: 'receivingId', label: 'Receiving ID' },
      { key: 'shipment', label: 'Shipment Name' },
      { key: 'warehouse', label: 'DC Inventory' },
      { key: 'totalProducts', label: 'Total Products' },
      { key: 'totalQuantity', label: 'Total Quantity' },
      { key: 'status', label: 'Status' },
      { key: 'createdDate', label: 'Created Date' }
    ],
    searchable: true,
    searchPlaceholder: 'Search by Receiving ID, Shipment Name, Product Name, or Warehouse...',
    filterable: true,
    filterOptions: [
      { label: 'All', value: 'All' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Completed', value: 'Completed' },
      { label: 'Cancelled', value: 'Cancelled' }
    ],
    filterDefaultValue: 'All',
    showAddButton: true,
    addButtonLabel: 'Receive Shipment',
    showActions: true,
    actions: ['view', 'edit', 'delete']
  };

  // Modal control
  isModalOpen = false;
  modalMode: 'add' | 'edit' | 'view' = 'add';
  modalStep = 1; // 1: Select shipment, 2: Fill quantities/warehouse
  selectedReceiving: Receiving | null = null;
  receivingForm!: FormGroup;

  // Confirmation Modal
  isDeleteModalOpen = false;
  receivingToDelete: Receiving | null = null;

  // Options — populated from API (Catalog / Product tables)
  statusOptions: string[] = ['All'];
  qcStatusOptions: string[] = [];
  availableProducts: AvailableProduct[] = [];

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.receivingForm = this.fb.group({
      receivingId: [''],
      shipment: ['', Validators.required],
      warehouse: ['', Validators.required],
      items: this.fb.array([])
    });
  }

  get itemsFormArray(): FormArray {
    return this.receivingForm.get('items') as FormArray;
  }

  createProductRow(
    productId = '',
    orderedQty = 0,
    receivedQty = 0,
    damagedQty = 0,
    qcStatus = 'Pending',
    isManual = false
  ): FormGroup {
    return this.fb.group(
      {
        productId: [productId, Validators.required],
        orderedQty: [orderedQty, [Validators.required, Validators.min(0)]],
        receivedQty: [receivedQty, [Validators.required, Validators.min(0)]],
        damagedQty: [damagedQty, [Validators.required, Validators.min(0)]],
        qcStatus: [qcStatus, Validators.required],
        isManual: [isManual]
      },
      { validators: rowValidator }
    );
  }

  loadData(): void {
    this.loading = true;
    this.cdr.markForCheck();

    // Fetch lists from API
    this.receivingService.getShipments().subscribe(res => {
      this.shipments = res;
      this.cdr.markForCheck();
    });

    this.receivingService.getWarehouses().subscribe(res => {
      this.warehouses = res;
      this.cdr.markForCheck();
    });

    this.receivingService.getProducts().subscribe(res => {
      this.availableProducts = res;
      this.cdr.markForCheck();
    });

    this.receivingService.getReceivingStatuses().subscribe(res => {
      this.statusOptions = ['All', ...res];
      // Also update the table filter options dynamically
      this.tableConfig = {
        ...this.tableConfig,
        filterOptions: this.statusOptions.map(s => ({ label: s, value: s }))
      };
      this.cdr.markForCheck();
    });

    this.receivingService.getQcStatuses().subscribe(res => {
      this.qcStatusOptions = res;
      this.cdr.markForCheck();
    });

    this.loadReceivings();
  }

  loadReceivings(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.receivingService.search(this.searchQuery).subscribe({
      next: data => {
        if (this.statusFilter && this.statusFilter.toLowerCase() !== 'all') {
          this.filteredReceivings = data.filter(
            r => r.status.toLowerCase() === this.statusFilter.toLowerCase()
          );
        } else {
          this.filteredReceivings = data;
        }
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.loadReceivings();
  }

  onFilterChange(status: string): void {
    this.statusFilter = status;
    this.loadReceivings();
  }

  openAddModal(): void {
    this.modalMode = 'add';
    this.modalStep = 1;
    this.submitted = false;
    this.selectedReceiving = null;

    this.receivingForm.reset({
      receivingId: '',
      shipment: '',
      warehouse: '',
      items: []
    });

    this.receivingForm.get('shipment')?.enable();
    this.receivingForm.get('warehouse')?.enable();
    this.itemsFormArray.clear();

    this.isModalOpen = true;
    this.cdr.markForCheck();
  }

  onShipmentSelected(shipmentId: string): void {
    const shipment = this.shipments.find(s => s.shipmentId === shipmentId);
    const itemsArray = this.itemsFormArray;
    itemsArray.clear();
    if (shipment) {
      shipment.products.forEach(p => {
        itemsArray.push(this.createProductRow(p.productId, p.orderedQty, p.orderedQty, 0, 'Pending'));
      });
    }
    this.cdr.markForCheck();
  }

  startReceiving(): void {
    const shipmentVal = this.receivingForm.get('shipment')?.value;
    if (shipmentVal) {
      this.modalStep = 2;
      this.cdr.markForCheck();
    }
  }

  openEditModal(record: Receiving): void {
    this.modalMode = 'edit';
    this.modalStep = 2;
    this.submitted = false;
    this.selectedReceiving = record;

    this.receivingForm.reset();
    this.receivingForm.patchValue({
      receivingId: record.receivingId,
      shipment: record.shipment,
      warehouse: record.warehouse
    });

    const itemsArray = this.itemsFormArray;
    itemsArray.clear();
    record.items.forEach(item => {
      itemsArray.push(
        this.createProductRow(
          item.productId,
          item.orderedQty,
          item.receivedQty,
          item.damagedQty,
          item.qcStatus
        )
      );
    });

    // shipment is immutable during edit
    this.receivingForm.get('shipment')?.disable();
    this.receivingForm.get('warehouse')?.enable();

    this.isModalOpen = true;
    this.cdr.markForCheck();
  }

  openViewModal(record: Receiving): void {
    this.modalMode = 'view';
    this.modalStep = 2;
    this.submitted = false;
    this.selectedReceiving = record;

    this.receivingForm.reset();
    this.receivingForm.patchValue({
      receivingId: record.receivingId,
      shipment: record.shipment,
      warehouse: record.warehouse
    });

    const itemsArray = this.itemsFormArray;
    itemsArray.clear();
    record.items.forEach(item => {
      itemsArray.push(
        this.createProductRow(
          item.productId,
          item.orderedQty,
          item.receivedQty,
          item.damagedQty,
          item.qcStatus
        )
      );
    });

    this.receivingForm.disable();

    this.isModalOpen = true;
    this.cdr.markForCheck();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.cdr.markForCheck();
  }

  addProductRow(): void {
    this.itemsFormArray.push(this.createProductRow('', 0, 0, 0, 'Pending', true));
    this.cdr.markForCheck();
  }

  removeProductRow(index: number): void {
    this.itemsFormArray.removeAt(index);
    this.cdr.markForCheck();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.receivingForm.invalid) {
      return;
    }

    const formVal = this.receivingForm.getRawValue();
    const items = formVal.items as ReceivingItem[];

    // Calculate aggregations
    const totalProducts = items.length;
    const totalQuantity = items.reduce((sum, item) => sum + (item.receivedQty || 0), 0);

    const record: Receiving = {
      receivingId: formVal.receivingId || this.generateReceivingId(),
      shipment: formVal.shipment,
      warehouse: formVal.warehouse,
      totalProducts,
      totalQuantity,
      status: this.modalMode === 'add' ? 'Completed' : (this.selectedReceiving?.status || 'Completed'),
      createdDate: this.modalMode === 'add' ? this.getCurrentDateString() : (this.selectedReceiving?.createdDate || this.getCurrentDateString()),
      items
    };

    const action = this.modalMode === 'add'
      ? this.receivingService.addReceiving(record)
      : this.receivingService.updateReceiving(record);

    this.loading = true;
    this.cdr.markForCheck();

    action.subscribe({
      next: () => {
        this.isModalOpen = false;
        this.loadReceivings();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  confirmDelete(record: Receiving): void {
    this.receivingToDelete = record;
    this.isDeleteModalOpen = true;
    this.cdr.markForCheck();
  }

  onDeleteConfirmed(): void {
    if (this.receivingToDelete) {
      this.loading = true;
      this.cdr.markForCheck();

      this.receivingService.deleteReceiving(this.receivingToDelete.receivingId).subscribe({
        next: () => {
          this.isDeleteModalOpen = false;
          this.receivingToDelete = null;
          this.loadReceivings();
        },
        error: () => {
          this.loading = false;
          this.isDeleteModalOpen = false;
          this.receivingToDelete = null;
          this.cdr.markForCheck();
        }
      });
    }
  }

  onDeleteCancelled(): void {
    this.isDeleteModalOpen = false;
    this.receivingToDelete = null;
    this.cdr.markForCheck();
  }

  generateReceivingId(): string {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `RCV-${randomNum}`;
  }

  getCurrentDateString(): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // TrackBy helpers
  trackByRowIndex(index: number): number {
    return index;
  }

  trackByShipmentId(index: number, item: Shipment): string {
    return item.shipmentId;
  }

  trackByWarehouseId(index: number, item: Warehouse): string {
    return item.code;
  }
}
