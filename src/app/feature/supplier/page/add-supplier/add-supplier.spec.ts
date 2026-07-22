import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddSupplier } from './add-supplier';

describe('AddSupplier', () => {
  let component: AddSupplier;
  let fixture: ComponentFixture<AddSupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSupplier],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupplier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
