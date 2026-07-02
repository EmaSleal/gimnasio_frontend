import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateNotificationComponent } from './update-notification.component';
import { SwUpdate } from '@angular/service-worker';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

describe('UpdateNotificationComponent', () => {
  let fixture: ComponentFixture<UpdateNotificationComponent>;
  let swUpdate: jasmine.SpyObj<SwUpdate>;
  const versionUpdates$ = new Subject();

  beforeEach(async () => {
    swUpdate = jasmine.createSpyObj('SwUpdate', ['activateUpdate'], {
      isEnabled: true,
      versionUpdates: versionUpdates$.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [UpdateNotificationComponent],
      providers: [
        { provide: SwUpdate, useValue: swUpdate },
        MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNotificationComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should not subscribe when SW is not enabled', async () => {
    Object.defineProperty(swUpdate, 'isEnabled', { get: () => false });
    const comp = TestBed.createComponent(UpdateNotificationComponent);
    comp.componentInstance.ngOnInit();
    expect(swUpdate.activateUpdate).not.toHaveBeenCalled();
  });
});
