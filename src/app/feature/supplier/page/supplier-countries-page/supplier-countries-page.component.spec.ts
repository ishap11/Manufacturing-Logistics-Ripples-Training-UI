import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierCountriesPageComponent } from './supplier-countries-page.component';
import { provideRouter } from '@angular/router';

describe('SupplierCountriesPageComponent', () => {
  let component: SupplierCountriesPageComponent;
  let fixture: ComponentFixture<SupplierCountriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierCountriesPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierCountriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
