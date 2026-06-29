import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    
    // Clear localStorage simulation
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with logged-out state', () => {
    expect(service.isLoggedIn).toBeFalse();
  });

  it('should login with correct admin credentials', (done) => {
    service.login('admin', 'admin').subscribe(success => {
      expect(success).toBeTrue();
      expect(service.isLoggedIn).toBeTrue();
      expect(service.getCurrentUser()).toBe('admin');
      done();
    });
  });

  it('should logout and clear session state', (done) => {
    service.login('admin', 'admin').subscribe(() => {
      service.logout();
      expect(service.isLoggedIn).toBeFalse();
      expect(service.getCurrentUser()).toBe('Guest User');
      done();
    });
  });
});
