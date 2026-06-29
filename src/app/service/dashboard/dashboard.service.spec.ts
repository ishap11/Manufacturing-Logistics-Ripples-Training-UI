import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mock dashboard metrics', (done) => {
    service.getMetrics().subscribe(metrics => {
      expect(metrics.length).toBeGreaterThan(0);
      expect(metrics.find(m => m.id === 'suppliers')).toBeDefined();
      done();
    });
  });

  it('should return recent activities', (done) => {
    service.getRecentActivities().subscribe(activities => {
      expect(activities.length).toBeGreaterThan(0);
      done();
    });
  });
});
