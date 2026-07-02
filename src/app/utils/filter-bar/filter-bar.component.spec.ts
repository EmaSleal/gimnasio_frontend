import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterBarComponent } from './filter-bar.component';

describe('FilterBarComponent', () => {
  let component: FilterBarComponent;
  let fixture: ComponentFixture<FilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterBarComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(FilterBarComponent);
    component = fixture.componentInstance;
    component.filters = ['All', 'Chest', 'Back'];
    component.activeFilter = 'All';
  });

  it('should render one button per filter in the array', () => {
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(3);
  });

  it('should apply active class to the button matching activeFilter', () => {
    component.activeFilter = 'Chest';
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const chestBtn = buttons.find(b => b.nativeElement.textContent.trim() === 'Chest');
    expect(chestBtn?.nativeElement.classList.contains('active')).toBeTrue();
  });

  it('should NOT apply active class to buttons that do not match activeFilter', () => {
    component.activeFilter = 'All';
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const chestBtn = buttons.find(b => b.nativeElement.textContent.trim() === 'Chest');
    expect(chestBtn?.nativeElement.classList.contains('active')).toBeFalse();
  });

  it('should emit filterChange with the correct filter value on button click', () => {
    fixture.detectChanges();
    let emittedValue: string | undefined;
    component.filterChange.subscribe((val: string) => (emittedValue = val));
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[1].nativeElement.click(); // 'Chest'
    expect(emittedValue).toBe('Chest');
  });
});
