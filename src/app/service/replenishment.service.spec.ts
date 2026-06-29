import { TestBed } from '@angular/core/testing';
import { ReplenishmentService } from './replenishment.service';

describe('ReplenishmentService', () => {
  let service: ReplenishmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplenishmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return replenishment requests', (done) => {
    service.getReplenishments().subscribe(reqs => {
      expect(reqs.length).toBeGreaterThan(0);
      done();
    });
  });
});
