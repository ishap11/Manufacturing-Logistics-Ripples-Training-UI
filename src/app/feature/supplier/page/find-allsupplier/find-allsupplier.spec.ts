import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAllsupplier } from './find-allsupplier';

describe('FindAllsupplier', () => {
  let component: FindAllsupplier;
  let fixture: ComponentFixture<FindAllsupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindAllsupplier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindAllsupplier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
