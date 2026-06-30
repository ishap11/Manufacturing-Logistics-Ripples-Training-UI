import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFilterPageComponent } from './store-filter-page.component';

describe('StoreFilterPageComponent', () => {
  let component: StoreFilterPageComponent;
  let fixture: ComponentFixture<StoreFilterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreFilterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreFilterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
