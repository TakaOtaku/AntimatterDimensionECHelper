import { Component, computed, inject, input, signal } from '@angular/core';
import { PlayMode } from '../../models/ec.model';
import { TreeCalculatorService } from '../../services/tree-calculator.service';
import { CopyNotificationService } from '../../services/copy-notification.service';

const ACTIVE_STUDIES = new Set(['121', '131', '141']);
const PASSIVE_STUDIES = new Set(['122', '132', '142']);
const IDLE_STUDIES = new Set(['123', '133', '143']);
const ANTIMATTER_DIMS = new Set(['71', '81', '91', '101']);
const INFINITY_DIMS = new Set(['72', '82', '92', '102']);
const TIME_DIMS = new Set(['73', '83', '93', '103']);

interface StudyToken {
    text: string;
    cssClass: string;
}

@Component({
    selector: 'app-tree-calculator',
    standalone: true,
    templateUrl: './tree-calculator.component.html',
    styleUrl: './tree-calculator.component.scss',
})
export class TreeCalculatorComponent {
    private calc = inject(TreeCalculatorService);
    private notify = inject(CopyNotificationService);

    mode = input.required<PlayMode>();

    ttInput = signal<number | null>(null);
    copied = signal(false);

    treeString = computed(() => {
        const tt = this.ttInput();
        if (tt === null || tt < 0) return '';
        return this.calc.calculate(tt, this.mode());
    });

    tokens = computed<StudyToken[]>(() => {
        const str = this.treeString();
        if (!str) return [];
        const parts = str.split(',');
        const result: StudyToken[] = [];
        for (let i = 0; i < parts.length; i++) {
            const id = parts[i].trim();
            let cssClass = 'study';
            if (ACTIVE_STUDIES.has(id)) cssClass = 'study study--active';
            else if (PASSIVE_STUDIES.has(id)) cssClass = 'study study--passive';
            else if (IDLE_STUDIES.has(id)) cssClass = 'study study--idle';
            else if (ANTIMATTER_DIMS.has(id)) cssClass = 'study study--antimatter';
            else if (INFINITY_DIMS.has(id)) cssClass = 'study study--infinity';
            else if (TIME_DIMS.has(id)) cssClass = 'study study--time';
            result.push({ text: id, cssClass });
            if (i < parts.length - 1) {
                result.push({ text: ', ', cssClass: 'sep' });
            }
        }
        return result;
    });

    onInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        const parsed = parseInt(value, 10);
        this.ttInput.set(isNaN(parsed) ? null : parsed);
    }

    async copyTree(): Promise<void> {
        const str = this.treeString();
        if (!str) return;
        await navigator.clipboard.writeText(str);
        this.copied.set(true);
        this.notify.show(`Tree for ${this.ttInput()} TT`, str);
        setTimeout(() => this.copied.set(false), 1500);
    }
}
