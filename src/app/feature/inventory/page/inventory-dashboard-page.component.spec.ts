import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryDashboardPageComponent } from './inventory-dashboard-page.component';
import { provideRouter } from '@angular/router';

describe('InventoryDashboardPageComponent', () => {
  let component: InventoryDashboardPageComponent;
  let fixture: ComponentFixture<InventoryDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryDashboardPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
