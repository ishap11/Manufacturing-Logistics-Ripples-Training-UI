import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrationPageComponent } from './administration-page.component';
import { provideRouter } from '@angular/router';

describe('AdministrationPageComponent', () => {
  let component: AdministrationPageComponent;
  let fixture: ComponentFixture<AdministrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrationPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
