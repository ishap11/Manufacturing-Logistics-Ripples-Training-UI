import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchDispatchByIdComponent } from './fetch-dispatch-by-id.component';

describe('FetchDispatchByIdComponent', () => {
  let component: FetchDispatchByIdComponent;
  let fixture: ComponentFixture<FetchDispatchByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchDispatchByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchDispatchByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
