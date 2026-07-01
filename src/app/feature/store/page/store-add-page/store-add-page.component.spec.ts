import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAddPageComponent } from './store-add-page.component';

describe('StoreAddPageComponent', () => {
  let component: StoreAddPageComponent;
  let fixture: ComponentFixture<StoreAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreAddPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
