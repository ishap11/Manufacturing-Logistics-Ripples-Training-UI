import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsPageComponent } from './reports-page.component';
import { provideRouter } from '@angular/router';

describe('ReportsPageComponent', () => {
  let component: ReportsPageComponent;
  let fixture: ComponentFixture<ReportsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
