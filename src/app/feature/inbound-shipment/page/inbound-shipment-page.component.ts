import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inbound-shipment-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inbound-shipment-page.component.html',
  styleUrl: './inbound-shipment-page.component.scss'
})
export class InboundShipmentPageComponent {
  title = 'Inbound Shipments';
  description = 'Track inbound shipment schedules, carrier details and expected arrival windows.';
}
