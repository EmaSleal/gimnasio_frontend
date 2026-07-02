import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStateComponent, NoopAnimationsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
    component.icon = 'pi pi-inbox';
    component.title = 'No exercises found';
    component.message = 'There are no exercises available';
  });

  it('should apply icon class to the icon element', () => {
    fixture.detectChanges();
    const iconEl = fixture.debugElement.query(By.css('.empty-icon'));
    expect(iconEl).toBeTruthy();
    expect(iconEl.nativeElement.classList.contains('pi')).toBeTrue();
    expect(iconEl.nativeElement.classList.contains('pi-inbox')).toBeTrue();
  });

  it('should render the title', () => {
    fixture.detectChanges();
    const h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3).toBeTruthy();
    expect(h3.nativeElement.textContent).toContain('No exercises found');
  });

  it('should render the message', () => {
    fixture.detectChanges();
    const p = fixture.debugElement.query(By.css('p'));
    expect(p).toBeTruthy();
    expect(p.nativeElement.textContent).toContain('There are no exercises available');
  });

  it('should render p-button when actionLabel is provided', () => {
    component.actionLabel = 'Get Started';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('p-button'));
    expect(button).toBeTruthy();
  });

  it('should NOT render p-button when actionLabel is not provided', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('p-button'));
    expect(button).toBeNull();
  });

  it('should emit action event when p-button onClick fires', () => {
    component.actionLabel = 'Get Started';
    fixture.detectChanges();
    let emitted = false;
    component.action.subscribe(() => (emitted = true));
    const button = fixture.debugElement.query(By.css('p-button'));
    button.triggerEventHandler('onClick', null);
    expect(emitted).toBeTrue();
  });
});
