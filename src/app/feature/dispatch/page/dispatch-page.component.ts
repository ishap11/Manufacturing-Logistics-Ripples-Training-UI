import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDispatchComponent } from '../components/add-dispatch/add-dispatch.component';
import { FetchAllDispatchComponent } from '../components/fetch-all-dispatch/fetch-all-dispatch.component';
import { FetchDispatchByIdComponent } from '../components/fetch-dispatch-by-id/fetch-dispatch-by-id.component';
import { FilterByDcIdComponent } from '../components/filter-by-dc-id/filter-by-dc-id.component';
import { FetchUsingEagerloadingComponent } from '../components/fetch-using-eagerloading/fetch-using-eagerloading.component';

@Component({
  selector: 'app-dispatch-page',
  standalone: true,
  imports: [CommonModule,AddDispatchComponent,FetchAllDispatchComponent,
  FetchDispatchByIdComponent,
  FilterByDcIdComponent,
  FetchUsingEagerloadingComponent],
  templateUrl: './dispatch-page.component.html',
  styleUrl: './dispatch-page.component.scss'
})
export class DispatchPageComponent {
  title = 'Dispatch';
  description = 'Monitor outbound dispatch operations, carrier assignments and shipment tracking.';
  selectedTab = 'add';
}
