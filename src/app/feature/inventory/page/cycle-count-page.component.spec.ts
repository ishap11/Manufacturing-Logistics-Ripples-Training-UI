import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CycleCountPageComponent } from './cycle-count-page.component';
import { provideRouter } from '@angular/router';

describe('CycleCountPageComponent', () => {
  let component: CycleCountPageComponent;
  let fixture: ComponentFixture<CycleCountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleCountPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CycleCountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
