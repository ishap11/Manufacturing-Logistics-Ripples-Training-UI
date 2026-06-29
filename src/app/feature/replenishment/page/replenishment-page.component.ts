import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-replenishment-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './replenishment-page.component.html',
  styleUrl: './replenishment-page.component.scss'
})
export class ReplenishmentPageComponent {
  title = 'Replenishment';
  description = 'Track and trigger stock replenishment requests across distribution centres.';
}
