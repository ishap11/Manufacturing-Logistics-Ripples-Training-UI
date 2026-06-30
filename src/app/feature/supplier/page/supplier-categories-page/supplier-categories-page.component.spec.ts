import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierCategoriesPageComponent } from './supplier-categories-page.component';
import { provideRouter } from '@angular/router';

describe('SupplierCategoriesPageComponent', () => {
  let component: SupplierCategoriesPageComponent;
  let fixture: ComponentFixture<SupplierCategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierCategoriesPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
