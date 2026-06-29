import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SubSidebarComponent } from '../sub-sidebar/sub-sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HeaderComponent, 
    SidebarComponent, 
    SubSidebarComponent, 
    FooterComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isSidebarCollapsed: boolean = true;
  activeModule: string = 'dashboard';
  hasSubSidebar: boolean = false;
  isMobileOpen: boolean = false;
  
  private router = inject(Router);
  private routerSubscription!: Subscription;

  ngOnInit(): void {
    this.detectActiveModule(this.router.url);
    
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.detectActiveModule(event.urlAfterRedirects || event.url);
      this.closeMobileSidebar();
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleSidebarCollapse(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleMobileSidebar(): void {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMobileSidebar(): void {
    this.isMobileOpen = false;
  }

  onModuleSelected(moduleId: string): void {
    this.activeModule = moduleId;
    this.checkSubSidebarState();
  }

  private detectActiveModule(url: string): void {
    const segments = url.split('/').filter(x => x);
    if (segments.length > 0) {
      const firstSegment = segments[0].toLowerCase();
      this.activeModule = firstSegment;
    } else {
      this.activeModule = 'dashboard';
    }
    this.checkSubSidebarState();
  }

  private checkSubSidebarState(): void {
    const subSidebarModules = ['supplier', 'inventory'];
    this.hasSubSidebar = subSidebarModules.includes(this.activeModule.toLowerCase());
  }
}
