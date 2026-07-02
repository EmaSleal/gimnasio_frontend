import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditUserComponent } from './edit-user.component';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  const mockUser = {
    id: '1',
    username: 'testuser',
    email: 'test@test.com',
    role: 'ADMIN',
    enabled: true,
    createdAt: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserComponent],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        { provide: DynamicDialogConfig, useValue: { data: { user: mockUser } } },
        { provide: DynamicDialogRef, useValue: { close: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
