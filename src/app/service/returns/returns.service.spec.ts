import { TestBed } from '@angular/core/testing';
import { ReturnsService } from './returns.service';

describe('ReturnsService', () => {
  let service: ReturnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return store returns', (done) => {
    service.getReturns().subscribe(ret => {
      expect(ret.length).toBeGreaterThan(0);
      done();
    });
  });
});
