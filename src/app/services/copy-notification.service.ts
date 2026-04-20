import { Injectable, signal } from '@angular/core';

export interface CopyNotification {
    studyString: string;
    label: string;
}

@Injectable({ providedIn: 'root' })
export class CopyNotificationService {
    readonly notification = signal<CopyNotification | null>(null);
    private hideTimer: ReturnType<typeof setTimeout> | null = null;

    show(label: string, studyString: string): void {
        if (this.hideTimer) clearTimeout(this.hideTimer);
        this.notification.set({ label, studyString });
        this.hideTimer = setTimeout(() => this.notification.set(null), 3000);
    }
}
