import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryReportsPageComponent } from './inventory-reports-page.component';
import { provideRouter } from '@angular/router';

describe('InventoryReportsPageComponent', () => {
  let component: InventoryReportsPageComponent;
  let fixture: ComponentFixture<InventoryReportsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryReportsPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
