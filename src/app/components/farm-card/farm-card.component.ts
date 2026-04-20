import { Component, input, signal } from '@angular/core';
import { FarmEntry } from '../../models/ec.model';

@Component({
  selector: 'app-farm-card',
  standalone: true,
  templateUrl: './farm-card.component.html',
  styleUrl: './farm-card.component.scss',
})
export class FarmCardComponent {
  farm = input.required<FarmEntry>();

  copied = signal(false);

  async copyStudyString(): Promise<void> {
    await navigator.clipboard.writeText(this.farm().studyString);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }
}
