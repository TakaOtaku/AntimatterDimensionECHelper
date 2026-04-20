import { Component, inject, signal, viewChild } from '@angular/core';
import { CopyToastComponent } from './components/copy-toast/copy-toast.component';
import { EcCardComponent } from './components/ec-card/ec-card.component';
import { EcNavigatorComponent } from './components/ec-navigator/ec-navigator.component';
import { EcTimelineComponent } from './components/ec-timeline/ec-timeline.component';
import { FarmCardComponent } from './components/farm-card/farm-card.component';
import { TreeCalculatorComponent } from './components/tree-calculator/tree-calculator.component';
import { EcDataService } from './services/ec-data.service';
import { EcStep, PlayMode } from './models/ec.model';

@Component({
  selector: 'app-root',
  imports: [CopyToastComponent, EcCardComponent, EcNavigatorComponent, EcTimelineComponent, FarmCardComponent, TreeCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private ecData = inject(EcDataService);
  private navigator = viewChild<EcNavigatorComponent>('ecNav');
  challenges = this.ecData.challenges;
  farms = this.ecData.farms;
  ecSteps = this.ecData.ecSteps;
  mode = this.ecData.mode;
  completedSteps = this.ecData.completedSteps;

  activeEcId = signal<number | null>(null);
  activeCompletion = signal<number | null>(null);
  currentNavIndex = signal(0);

  setMode(m: PlayMode): void {
    this.ecData.mode.set(m);
  }

  onStepChanged(step: EcStep): void {
    this.activeEcId.set(step.ecId);
    this.activeCompletion.set(step.completion);
    const steps = this.ecSteps();
    const idx = steps.findIndex(s => s.ecId === step.ecId && s.completion === step.completion);
    if (idx >= 0) this.currentNavIndex.set(idx);
  }

  onAdvance(step: EcStep): void {
    const steps = this.ecSteps();
    const idx = steps.findIndex(s => s.ecId === step.ecId && s.completion === step.completion);
    if (idx >= 0) this.ecData.setCompletedUpTo(steps, idx + 1);
  }

  onRetreat(step: EcStep): void {
    const steps = this.ecSteps();
    const idx = steps.findIndex(s => s.ecId === step.ecId && s.completion === step.completion);
    if (idx >= 0) this.ecData.setCompletedUpTo(steps, idx);
  }

  onReset(): void {
    this.ecData.clearCompleted();
    this.activeEcId.set(null);
    this.activeCompletion.set(null);
    this.currentNavIndex.set(0);
  }

  onTimelineJump(index: number): void {
    const nav = this.navigator();
    if (nav) {
      nav.jumpTo(index);
      this.currentNavIndex.set(index);
      const steps = this.ecSteps();
      this.ecData.setCompletedUpTo(steps, index);
    }
  }

  isCompleted(ecId: number, completion: number): boolean {
    return this.completedSteps().has(`${ecId}-${completion}`);
  }
}
