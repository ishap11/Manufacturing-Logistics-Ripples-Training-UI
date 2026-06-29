import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubSidebarComponent } from './sub-sidebar.component';
import { provideRouter } from '@angular/router';

describe('SubSidebarComponent', () => {
  let component: SubSidebarComponent;
  let fixture: ComponentFixture<SubSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSidebarComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SubSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
