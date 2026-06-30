import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchUsingEagerloadingComponent } from './fetch-using-eagerloading.component';

describe('FetchUsingEagerloadingComponent', () => {
  let component: FetchUsingEagerloadingComponent;
  let fixture: ComponentFixture<FetchUsingEagerloadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchUsingEagerloadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchUsingEagerloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
