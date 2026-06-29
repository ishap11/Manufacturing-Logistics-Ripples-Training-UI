import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierDashboardPageComponent } from './supplier-dashboard-page.component';
import { provideRouter } from '@angular/router';

describe('SupplierDashboardPageComponent', () => {
  let component: SupplierDashboardPageComponent;
  let fixture: ComponentFixture<SupplierDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierDashboardPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
