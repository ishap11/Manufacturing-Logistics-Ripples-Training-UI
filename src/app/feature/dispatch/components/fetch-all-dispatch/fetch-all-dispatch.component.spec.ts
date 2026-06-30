import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchAllDispatchComponent } from './fetch-all-dispatch.component';

describe('FetchAllDispatchComponent', () => {
  let component: FetchAllDispatchComponent;
  let fixture: ComponentFixture<FetchAllDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchAllDispatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchAllDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
