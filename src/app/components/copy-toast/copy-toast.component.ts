import { Component, computed, inject } from '@angular/core';
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
    selector: 'app-copy-toast',
    standalone: true,
    template: `
    @if (notification(); as n) {
      <div class="toast">
        <div class="toast__header">
          <span class="toast__check">&#10003;</span>
          <span class="toast__label">Copied {{ n.label }}</span>
        </div>
        <div class="toast__body">
          @for (token of tokens(); track $index) {
            <span [class]="token.cssClass">{{ token.text }}</span>
          }
        </div>
      </div>
    }
  `,
    styleUrl: './copy-toast.component.scss',
})
export class CopyToastComponent {
    private svc = inject(CopyNotificationService);
    notification = this.svc.notification;

    tokens = computed<StudyToken[]>(() => {
        const n = this.notification();
        if (!n) return [];

        const parts = n.studyString.split(',');
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
}
