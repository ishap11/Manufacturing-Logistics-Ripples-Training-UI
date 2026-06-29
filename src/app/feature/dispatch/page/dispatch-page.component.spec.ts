import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DispatchPageComponent } from './dispatch-page.component';
import { provideRouter } from '@angular/router';

describe('DispatchPageComponent', () => {
  let component: DispatchPageComponent;
  let fixture: ComponentFixture<DispatchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispatchPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DispatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
