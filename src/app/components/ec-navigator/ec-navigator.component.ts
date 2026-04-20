import { Component, computed, inject, input, output, signal } from '@angular/core';
import { EcStep } from '../../models/ec.model';
import { CopyNotificationService } from '../../services/copy-notification.service';

@Component({
  selector: 'app-ec-navigator',
  standalone: true,
  templateUrl: './ec-navigator.component.html',
  styleUrl: './ec-navigator.component.scss',
})
export class EcNavigatorComponent {
  private notify = inject(CopyNotificationService);

  steps = input.required<EcStep[]>();

  stepChanged = output<EcStep>();
  advance = output<EcStep>();
  retreat = output<EcStep>();

  currentIndex = signal(0);
  copied = signal(false);

  currentStep = computed(() => this.steps()[this.currentIndex()]);

  prev(): void {
    const len = this.steps().length;
    this.currentIndex.update(i => (i - 1 + len) % len);
    const target = this.currentStep();
    this.retreat.emit(target);
    this.stepChanged.emit(target);
  }

  next(): void {
    const current = this.currentStep();
    this.advance.emit(current);
    const len = this.steps().length;
    this.currentIndex.update(i => (i + 1) % len);
    this.stepChanged.emit(this.currentStep());
  }

  async copyCurrentString(): Promise<void> {
    const step = this.currentStep();
    await navigator.clipboard.writeText(step.studyString);
    this.copied.set(true);
    this.notify.show(step.label, step.studyString);
    setTimeout(() => this.copied.set(false), 1500);
  }
}
