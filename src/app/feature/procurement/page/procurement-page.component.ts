import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPurchaseOrderComponent } from '../components/add-purchase-order/add-purchase-order.component';
import { FindPurchaseOrderByIdComponent } from '../components/find-purchase-order-by-id/find-purchase-order-by-id.component';
import { FindAllPurchaseOrdersComponent } from '../components/find-all-purchase-orders/find-all-purchase-orders.component';
import { FetchUsingLazyLoadingComponent } from '../components/fetch-using-lazy-loading/fetch-using-lazy-loading.component';
import { AddPurchaseOrderWithItemsComponent } from '../components/add-purchase-order-with-items/add-purchase-order-with-items.component';

@Component({
  selector: 'app-procurement-page',
  standalone: true,
  imports: [CommonModule,
    AddPurchaseOrderComponent,
    FindPurchaseOrderByIdComponent,
    FindAllPurchaseOrdersComponent,
    FetchUsingLazyLoadingComponent,
    AddPurchaseOrderWithItemsComponent],
  templateUrl: './procurement-page.component.html',
  styleUrl: './procurement-page.component.scss'
})
export class ProcurementPageComponent {
  title = 'Procurement';
  description = 'Manage purchase orders, vendor negotiations and procurement workflows.';
  selectedTab = 'add';
}
