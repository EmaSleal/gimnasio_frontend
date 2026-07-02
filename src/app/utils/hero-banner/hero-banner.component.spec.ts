import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroBannerComponent } from './hero-banner.component';

describe('HeroBannerComponent', () => {
  let component: HeroBannerComponent;
  let fixture: ComponentFixture<HeroBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBannerComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(HeroBannerComponent);
    component = fixture.componentInstance;
  });

  it('should render title in the DOM', () => {
    component.title = 'My Training Plan';
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1).toBeTruthy();
    expect(h1.nativeElement.textContent).toContain('My Training Plan');
  });

  it('should render subtitle element when subtitle input is provided', () => {
    component.title = 'Plan';
    component.subtitle = 'Your daily workout';
    fixture.detectChanges();
    const p = fixture.debugElement.query(By.css('p'));
    expect(p).toBeTruthy();
    expect(p.nativeElement.textContent).toContain('Your daily workout');
  });

  it('should NOT render subtitle element when subtitle is not provided', () => {
    component.title = 'Plan';
    fixture.detectChanges();
    const p = fixture.debugElement.query(By.css('p'));
    expect(p).toBeNull();
  });
});
