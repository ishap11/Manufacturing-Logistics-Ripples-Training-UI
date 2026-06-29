import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductMasterPageComponent } from './product-master-page.component';
import { provideRouter } from '@angular/router';

describe('ProductMasterPageComponent', () => {
  let component: ProductMasterPageComponent;
  let fixture: ComponentFixture<ProductMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductMasterPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
