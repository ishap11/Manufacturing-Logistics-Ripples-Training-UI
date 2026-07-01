import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreUpdatePageComponent } from './store-update-page.component';

describe('StoreUpdatePageComponent', () => {
  let component: StoreUpdatePageComponent;
  let fixture: ComponentFixture<StoreUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreUpdatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
