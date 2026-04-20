import { Component, inject, input, signal } from '@angular/core';
import { FarmEntry } from '../../models/ec.model';
import { CopyNotificationService } from '../../services/copy-notification.service';

@Component({
  selector: 'app-farm-card',
  standalone: true,
  templateUrl: './farm-card.component.html',
  styleUrl: './farm-card.component.scss',
})
export class FarmCardComponent {
  private notify = inject(CopyNotificationService);

  farm = input.required<FarmEntry>();

  copied = signal(false);

  async copyStudyString(): Promise<void> {
    const farm = this.farm();
    await navigator.clipboard.writeText(farm.studyString);
    this.copied.set(true);
    this.notify.show(farm.label, farm.studyString);
    setTimeout(() => this.copied.set(false), 1500);
  }
}
