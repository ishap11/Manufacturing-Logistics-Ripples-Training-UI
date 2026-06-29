import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-returns-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './returns-page.component.html',
  styleUrl: './returns-page.component.scss'
})
export class ReturnsPageComponent {
  title = 'Returns';
  description = 'Process and manage store and customer return requests with full audit trail.';
}
