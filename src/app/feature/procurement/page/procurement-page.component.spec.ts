import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcurementPageComponent } from './procurement-page.component';
import { provideRouter } from '@angular/router';

describe('ProcurementPageComponent', () => {
  let component: ProcurementPageComponent;
  let fixture: ComponentFixture<ProcurementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcurementPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcurementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
