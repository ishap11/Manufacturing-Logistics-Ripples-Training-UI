import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products catalog', (done) => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
      done();
    });
  });
});
