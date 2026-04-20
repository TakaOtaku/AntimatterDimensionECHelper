import { Component, inject, signal } from '@angular/core';
import { CopyToastComponent } from './components/copy-toast/copy-toast.component';
import { EcCardComponent } from './components/ec-card/ec-card.component';
import { EcNavigatorComponent } from './components/ec-navigator/ec-navigator.component';
import { FarmCardComponent } from './components/farm-card/farm-card.component';
import { TreeCalculatorComponent } from './components/tree-calculator/tree-calculator.component';
import { EcDataService } from './services/ec-data.service';
import { EcStep, PlayMode } from './models/ec.model';

@Component({
  selector: 'app-root',
  imports: [CopyToastComponent, EcCardComponent, EcNavigatorComponent, FarmCardComponent, TreeCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private ecData = inject(EcDataService);
  challenges = this.ecData.challenges;
  farms = this.ecData.farms;
  ecSteps = this.ecData.ecSteps;
  mode = this.ecData.mode;
  completedSteps = this.ecData.completedSteps;

  activeEcId = signal<number | null>(null);
  activeCompletion = signal<number | null>(null);

  setMode(m: PlayMode): void {
    this.ecData.mode.set(m);
  }

  onStepChanged(step: EcStep): void {
    this.activeEcId.set(step.ecId);
    this.activeCompletion.set(step.completion);
  }

  onAdvance(step: EcStep): void {
    this.ecData.markCompleted(step.ecId, step.completion);
  }

  onRetreat(step: EcStep): void {
    this.ecData.unmarkCompleted(step.ecId, step.completion);
  }

  isCompleted(ecId: number, completion: number): boolean {
    return this.completedSteps().has(`${ecId}-${completion}`);
  }
}
