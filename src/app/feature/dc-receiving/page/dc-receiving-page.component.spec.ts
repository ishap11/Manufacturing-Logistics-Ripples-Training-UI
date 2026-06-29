import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcReceivingPageComponent } from './dc-receiving-page.component';
import { provideRouter } from '@angular/router';

describe('DcReceivingPageComponent', () => {
  let component: DcReceivingPageComponent;
  let fixture: ComponentFixture<DcReceivingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcReceivingPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DcReceivingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
