import { Component, computed, input, output, signal } from '@angular/core';
import { EcStep } from '../../models/ec.model';

@Component({
  selector: 'app-ec-navigator',
  standalone: true,
  templateUrl: './ec-navigator.component.html',
  styleUrl: './ec-navigator.component.scss',
})
export class EcNavigatorComponent {
  steps = input.required<EcStep[]>();

  stepChanged = output<EcStep>();
  advance = output<EcStep>();

  currentIndex = signal(0);
  copied = signal(false);

  currentStep = computed(() => this.steps()[this.currentIndex()]);

  prev(): void {
    const len = this.steps().length;
    this.currentIndex.update(i => (i - 1 + len) % len);
    this.stepChanged.emit(this.currentStep());
  }

  next(): void {
    const current = this.currentStep();
    this.advance.emit(current);
    const len = this.steps().length;
    this.currentIndex.update(i => (i + 1) % len);
    this.stepChanged.emit(this.currentStep());
  }

  async copyCurrentString(): Promise<void> {
    await navigator.clipboard.writeText(this.currentStep().studyString);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }
}
