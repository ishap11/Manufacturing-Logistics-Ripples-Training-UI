import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFindallPageComponent } from './store-findall-page.component';

describe('StoreFindallPageComponent', () => {
  let component: StoreFindallPageComponent;
  let fixture: ComponentFixture<StoreFindallPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreFindallPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreFindallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
