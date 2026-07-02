import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditMuscularGroupComponent } from './edit-muscular-group.component';

describe('EditMuscularGroupComponent', () => {
  let component: EditMuscularGroupComponent;
  let fixture: ComponentFixture<EditMuscularGroupComponent>;

  const mockMuscularGroup = { id: '1', name: 'Chest' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMuscularGroupComponent],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        { provide: DynamicDialogConfig, useValue: { data: { muscularGroup: mockMuscularGroup } } },
        { provide: DynamicDialogRef, useValue: { close: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditMuscularGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
