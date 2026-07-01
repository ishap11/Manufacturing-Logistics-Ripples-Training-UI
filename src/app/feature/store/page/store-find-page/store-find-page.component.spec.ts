import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFindPageComponent } from './store-find-page.component';

describe('StoreFindPageComponent', () => {
  let component: StoreFindPageComponent;
  let fixture: ComponentFixture<StoreFindPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreFindPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreFindPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
