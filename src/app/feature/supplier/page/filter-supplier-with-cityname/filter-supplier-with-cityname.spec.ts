import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FilterSupplierWithCityname } from './filter-supplier-with-cityname';

describe('FilterSupplierWithCityname', () => {
  let component: FilterSupplierWithCityname;
  let fixture: ComponentFixture<FilterSupplierWithCityname>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSupplierWithCityname],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSupplierWithCityname);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
