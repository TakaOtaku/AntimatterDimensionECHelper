import { Component, input, signal } from '@angular/core';
import { EternityChallenge } from '../../models/ec.model';

@Component({
  selector: 'app-ec-card',
  standalone: true,
  templateUrl: './ec-card.component.html',
  styleUrl: './ec-card.component.scss',
})
export class EcCardComponent {
  ec = input.required<EternityChallenge>();
  activeCompletion = input<number | null>(null);
  completedSteps = input<Set<string>>(new Set());

  copiedIndex = signal<number | null>(null);

  isCompleted(completion: number): boolean {
    return this.completedSteps().has(`${this.ec().id}-${completion}`);
  }

  async copyStudyString(completion: number, studyString: string): Promise<void> {
    await navigator.clipboard.writeText(studyString);
    this.copiedIndex.set(completion);
    setTimeout(() => this.copiedIndex.set(null), 1500);
  }
}
