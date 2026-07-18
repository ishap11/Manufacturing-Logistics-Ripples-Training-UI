import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FindSupplierWithid } from './find-supplier-withid';

describe('FindSupplierWithid', () => {
  let component: FindSupplierWithid;
  let fixture: ComponentFixture<FindSupplierWithid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindSupplierWithid],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindSupplierWithid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
