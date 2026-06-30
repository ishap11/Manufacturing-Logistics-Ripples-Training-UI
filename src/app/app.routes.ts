import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./feature/login/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./feature/dashboard/page/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
      },
      {
        path: 'supplier',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            loadComponent: () => import('./feature/supplier/page/supplier-dashboard-page/supplier-dashboard-page.component').then(m => m.SupplierDashboardPageComponent)
          },
          {
            path: 'list',
            loadComponent: () => import('./feature/supplier/page/supplier-list-page/supplier-list-page.component').then(m => m.SupplierListPageComponent)
          },
          {
            path: 'add',
            loadComponent: () => import('./feature/supplier/page/supplier-form-page/supplier-form-page.component').then(m => m.SupplierFormPageComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('./feature/supplier/page/supplier-form-page/supplier-form-page.component').then(m => m.SupplierFormPageComponent)
          },
          {
            path: 'categories',
            loadComponent: () => import('./feature/supplier/page/supplier-categories-page/supplier-categories-page.component').then(m => m.SupplierCategoriesPageComponent)
          },
          {
            path: 'countries',
            loadComponent: () => import('./feature/supplier/page/supplier-countries-page/supplier-countries-page.component').then(m => m.SupplierCountriesPageComponent)
          },
          {
            path: 'rate-cards',
            loadComponent: () => import('./feature/supplier/page/supplier-rate-cards-page/supplier-rate-cards-page.component').then(m => m.SupplierRateCardsPageComponent)
          }
        ]
      },
      {
        path: 'product-master',
        loadComponent: () => import('./feature/product-master/page/product-master-page.component').then(m => m.ProductMasterPageComponent)
      },
      {
        path: 'procurement',
        loadComponent: () => import('./feature/procurement/page/procurement-page.component').then(m => m.ProcurementPageComponent)
      },
      {
        path: 'inbound-shipment',
        loadComponent: () => import('./feature/inbound-shipment/page/inbound-shipment-page.component').then(m => m.InboundShipmentPageComponent)
      },
      {
        path: 'dc-receiving',
        loadComponent: () => import('./feature/dc-receiving/page/dc-receiving-page/dc-receiving-page.component').then(m => m.DcReceivingPageComponent)
      },
      {
        path: 'inventory',
        children: [
          {
            path: '',
            redirectTo: 'stock',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            loadComponent: () => import('./feature/inventory/page/inventory-dashboard-page/inventory-dashboard-page.component').then(m => m.InventoryDashboardPageComponent)
          },
          {
            path: 'stock',
            loadComponent: () => import('./feature/inventory/page/stock-list-page/stock-list-page.component').then(m => m.StockListPageComponent)
          },
          {
            path: 'transfers',
            loadComponent: () => import('./feature/inventory/page/transfers-page/transfers-page.component').then(m => m.TransfersPageComponent)
          },
          {
            path: 'adjustments',
            loadComponent: () => import('./feature/inventory/page/adjustments-page/adjustments-page.component').then(m => m.AdjustmentsPageComponent)
          },
          {
            path: 'cycle-count',
            loadComponent: () => import('./feature/inventory/page/cycle-count-page/cycle-count-page.component').then(m => m.CycleCountPageComponent)
          },
          {
            path: 'reports',
            loadComponent: () => import('./feature/inventory/page/inventory-reports-page/inventory-reports-page.component').then(m => m.InventoryReportsPageComponent)
          }
        ]
      },
      {
        path: 'store',
        loadComponent: () => import('./feature/store/page/store-page.component').then(m => m.StorePageComponent)
      },
      {
        path: 'replenishment',
        loadComponent: () => import('./feature/replenishment/page/replenishment-page.component').then(m => m.ReplenishmentPageComponent)
      },
      {
        path: 'dispatch',
        loadComponent: () => import('./feature/dispatch/page/dispatch-page.component').then(m => m.DispatchPageComponent)
      },
      {
        path: 'returns',
        loadComponent: () => import('./feature/returns/page/returns-page.component').then(m => m.ReturnsPageComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./feature/reports/page/reports-page.component').then(m => m.ReportsPageComponent)
      },
      {
        path: 'administration',
        loadComponent: () => import('./feature/administration/page/administration-page.component').then(m => m.AdministrationPageComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
