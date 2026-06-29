import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dispatch-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dispatch-page.component.html',
  styleUrl: './dispatch-page.component.scss'
})
export class DispatchPageComponent {
  title = 'Dispatch';
  description = 'Monitor outbound dispatch operations, carrier assignments and shipment tracking.';
}
