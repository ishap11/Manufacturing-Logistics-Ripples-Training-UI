import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByDcIdComponent } from './filter-by-dc-id.component';

describe('FilterByDcIdComponent', () => {
  let component: FilterByDcIdComponent;
  let fixture: ComponentFixture<FilterByDcIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterByDcIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByDcIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
