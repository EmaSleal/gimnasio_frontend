import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update-notification',
  standalone: true,
  imports: [CommonModule, ToastModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
  template: `
    <p-toast position="bottom-right" key="update-toast">
      <ng-template let-message pTemplate="message">
        <div style="display:flex;align-items:center;gap:var(--space-3);flex:1">
          <i class="pi pi-info-circle" style="font-size:1.25rem;color:var(--color-info)"></i>
          <div style="flex:1">
            <div style="font-weight:var(--weight-semibold)">{{ message.summary }}</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary)">{{ message.detail }}</div>
          </div>
          <button
            (click)="reload()"
            style="padding:var(--space-2) var(--space-3);background:var(--color-accent);color:var(--color-bg-primary);border:none;border-radius:var(--radius-md);cursor:pointer;font-weight:var(--weight-medium);white-space:nowrap">
            Reload
          </button>
        </div>
      </ng-template>
    </p-toast>
  `
})
export class UpdateNotificationComponent implements OnInit {
  private swUpdate = inject(SwUpdate);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        this.messageService.add({
          key: 'update-toast',
          severity: 'info',
          summary: 'Update available',
          detail: 'A new version is available. Click to reload.',
          sticky: true
        });
      });
  }

  reload(): void {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
