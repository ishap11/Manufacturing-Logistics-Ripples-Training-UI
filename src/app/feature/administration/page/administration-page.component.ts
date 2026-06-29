import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administration-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-page.component.html',
  styleUrl: './administration-page.component.scss'
})
export class AdministrationPageComponent {
  title = 'Administration';
  description = 'Manage system users, roles, access permissions and security audit logs.';
}
