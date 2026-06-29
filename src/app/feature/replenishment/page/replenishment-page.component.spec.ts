import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplenishmentPageComponent } from './replenishment-page.component';
import { provideRouter } from '@angular/router';

describe('ReplenishmentPageComponent', () => {
  let component: ReplenishmentPageComponent;
  let fixture: ComponentFixture<ReplenishmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplenishmentPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ReplenishmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
