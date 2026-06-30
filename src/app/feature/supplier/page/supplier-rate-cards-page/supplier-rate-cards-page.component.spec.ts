import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierRateCardsPageComponent } from './supplier-rate-cards-page.component';
import { provideRouter } from '@angular/router';

describe('SupplierRateCardsPageComponent', () => {
  let component: SupplierRateCardsPageComponent;
  let fixture: ComponentFixture<SupplierRateCardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierRateCardsPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierRateCardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
