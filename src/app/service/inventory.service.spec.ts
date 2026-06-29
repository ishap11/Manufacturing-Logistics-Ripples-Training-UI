import { TestBed } from '@angular/core/testing';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return stock levels', (done) => {
    service.getStockLevels().subscribe(stock => {
      expect(stock.length).toBeGreaterThan(0);
      done();
    });
  });
});
