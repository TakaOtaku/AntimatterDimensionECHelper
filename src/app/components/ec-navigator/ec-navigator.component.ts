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
  resetNav = output<void>();

  currentIndex = signal(0);
  copied = signal(false);

  currentStep = computed(() => this.steps()[this.currentIndex()]);
  isFirst = computed(() => this.currentIndex() === 0);
  isLast = computed(() => this.currentIndex() === this.steps().length - 1);

  prev(): void {
    if (this.isFirst()) return;
    this.currentIndex.update(i => i - 1);
    const target = this.currentStep();
    this.retreat.emit(target);
    this.stepChanged.emit(target);
  }

  next(): void {
    if (this.isLast()) return;
    const current = this.currentStep();
    this.advance.emit(current);
    this.currentIndex.update(i => i + 1);
    this.stepChanged.emit(this.currentStep());
  }

  async copyCurrentString(): Promise<void> {
    const step = this.currentStep();
    await navigator.clipboard.writeText(step.studyString);
    this.copied.set(true);
    this.notify.show(step.label, step.studyString);
    setTimeout(() => this.copied.set(false), 1500);
  }

  resetToFirst(): void {
    if (this.isFirst()) return;
    this.currentIndex.set(0);
    this.resetNav.emit();
    this.stepChanged.emit(this.currentStep());
  }

  jumpTo(index: number): void {
    const len = this.steps().length;
    if (index < 0 || index >= len) return;
    this.currentIndex.set(index);
    this.stepChanged.emit(this.currentStep());
  }
}
