import { TestBed } from '@angular/core/testing';
import { DispatchService } from './dispatch.service';

describe('DispatchService', () => {
  let service: DispatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return active dispatches', (done) => {
    service.getDispatches().subscribe(disp => {
      expect(disp.length).toBeGreaterThan(0);
      done();
    });
  });
});
