import { TestBed } from '@angular/core/testing';
import { ProcurementService } from './procurement.service';

describe('ProcurementService', () => {
  let service: ProcurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return purchase orders', (done) => {
    service.getPurchaseOrders().subscribe(pos => {
      expect(pos.length).toBeGreaterThan(0);
      done();
    });
  });
});
