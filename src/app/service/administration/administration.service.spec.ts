import { TestBed } from '@angular/core/testing';
import { AdministrationService } from './administration.service';

describe('AdministrationService', () => {
  let service: AdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return system users', (done) => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return security audit logs', (done) => {
    service.getSecurityLogs().subscribe(logs => {
      expect(logs.length).toBeGreaterThan(0);
      done();
    });
  });
});
