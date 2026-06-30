import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierListPageComponent } from './supplier-list-page.component';
import { provideRouter } from '@angular/router';

describe('SupplierListPageComponent', () => {
  let component: SupplierListPageComponent;
  let fixture: ComponentFixture<SupplierListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierListPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
