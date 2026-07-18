import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UpdateSupplierComponent } from './update-supplier.component';

describe('UpdateSupplierComponent', () => {
  let component: UpdateSupplierComponent;
  let fixture: ComponentFixture<UpdateSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSupplierComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
