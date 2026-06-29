import { TestBed } from '@angular/core/testing';
import { SupplierService } from './supplier.service';

describe('SupplierService', () => {
  let service: SupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return suppliers', (done) => {
    service.getSuppliers().subscribe(suppliers => {
      expect(suppliers.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should add a new supplier', (done) => {
    const mockSupplier = {
      supplierName: 'New Vendor',
      code: 'SUP-NEW-99',
      email: 'new@vendor.com',
      phone: '+1-555-9999',
      category: 'Raw Materials',
      city: 'Boston',
      country: 'United States',
      status: 'Active' as const,
      reliabilityScore: 99
    };

    service.addSupplier(mockSupplier).subscribe(supplier => {
      expect(supplier.id).toBeDefined();
      expect(supplier.supplierName).toBe('New Vendor');
      done();
    });
  });
});
