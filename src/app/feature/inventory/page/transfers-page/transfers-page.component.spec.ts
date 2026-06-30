import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransfersPageComponent } from './transfers-page.component';
import { provideRouter } from '@angular/router';

describe('TransfersPageComponent', () => {
  let component: TransfersPageComponent;
  let fixture: ComponentFixture<TransfersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
