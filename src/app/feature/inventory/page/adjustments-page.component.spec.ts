import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdjustmentsPageComponent } from './adjustments-page.component';
import { provideRouter } from '@angular/router';

describe('AdjustmentsPageComponent', () => {
  let component: AdjustmentsPageComponent;
  let fixture: ComponentFixture<AdjustmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustmentsPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AdjustmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
