import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent {
  title = 'Store';
  description = 'Oversee store locations, stocking levels and retail fulfilment status.';
}
