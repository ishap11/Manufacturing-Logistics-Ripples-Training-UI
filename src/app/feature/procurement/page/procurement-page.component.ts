import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-procurement-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './procurement-page.component.html',
  styleUrl: './procurement-page.component.scss'
})
export class ProcurementPageComponent {
  title = 'Procurement';
  description = 'Manage purchase orders, vendor negotiations and procurement workflows.';
}
