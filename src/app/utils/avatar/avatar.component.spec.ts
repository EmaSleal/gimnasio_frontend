import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  it('should derive initials from first and last word of name', () => {
    component.name = 'John Doe';
    fixture.detectChanges();
    expect(component.initials).toBe('JD');
  });

  it('should derive initials correctly for a three-word name', () => {
    component.name = 'John Michael Doe';
    fixture.detectChanges();
    expect(component.initials).toBe('JD');
  });

  it('should render avatar-initials element when no imageUrl is provided', () => {
    component.name = 'Jane Smith';
    fixture.detectChanges();
    const initialsEl = fixture.debugElement.query(By.css('.avatar-initials'));
    expect(initialsEl).toBeTruthy();
  });

  it('should NOT render img when no imageUrl is provided', () => {
    component.name = 'Jane Smith';
    fixture.detectChanges();
    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl).toBeNull();
  });

  it('should render img element when imageUrl is provided', () => {
    component.name = 'John Doe';
    component.imageUrl = 'https://example.com/avatar.jpg';
    fixture.detectChanges();
    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl).toBeTruthy();
    expect(imgEl.nativeElement.getAttribute('src')).toContain('example.com/avatar.jpg');
  });

  it('should apply sm class to host element for size="sm"', () => {
    component.name = 'John Doe';
    component.size = 'sm';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('sm')).toBeTrue();
  });

  it('should apply md class to host element for default size', () => {
    component.name = 'John Doe';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('md')).toBeTrue();
  });

  it('should apply lg class to host element for size="lg"', () => {
    component.name = 'John Doe';
    component.size = 'lg';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('lg')).toBeTrue();
  });
});
