import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { EcStep } from '../../models/ec.model';

@Component({
  selector: 'app-ec-timeline',
  standalone: true,
  templateUrl: './ec-timeline.component.html',
  styleUrl: './ec-timeline.component.scss',
})
export class EcTimelineComponent {
  steps = input.required<EcStep[]>();
  currentIndex = input.required<number>();
  completedSteps = input.required<Set<string>>();

  jumpTo = output<number>();

  private static readonly WINDOW = 3;

  visibleSteps = computed(() => {
    const all = this.steps();
    const completed = this.completedSteps();
    const current = this.currentIndex();
    const len = all.length;
    const w = EcTimelineComponent.WINDOW;
    const size = w * 2 + 1;

    let start = current - w;
    let end = current + w;

    if (start < 0) {
      start = 0;
      end = Math.min(size - 1, len - 1);
    }
    if (end >= len) {
      end = len - 1;
      start = Math.max(0, len - size);
    }

    const items = [];
    for (let i = start; i <= end; i++) {
      const step = all[i];
      items.push({
        step,
        index: i,
        isCurrent: i === current,
        isCompleted: i < current || completed.has(`${step.ecId}-${step.completion}`),
      });
    }
    return items;
  });

  onBubbleClick(index: number): void {
    this.jumpTo.emit(index);
  }
}
