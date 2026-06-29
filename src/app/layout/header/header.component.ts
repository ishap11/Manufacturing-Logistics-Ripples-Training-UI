import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: { style: 'display:flex; width:100%; height:100%;' }
})
export class HeaderComponent implements OnInit {
  @Output() toggleMobile = new EventEmitter<void>();

  searchQuery: string = '';
  currentUser: string = 'Admin User';
  currentRole: string = 'Admin';
  isProfileDropdownOpen: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleMobileSidebar(): void {
    this.toggleMobile.emit();
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  triggerGlobalSearch(): void {
    if (this.searchQuery.trim()) {
      alert(`Simulating Global Search for: "${this.searchQuery}"`);
      this.searchQuery = '';
    }
  }

  performLogout(): void {
    this.authService.logout();
    this.isProfileDropdownOpen = false;
    this.router.navigate(['/login']);
  }
}
