import { Injectable } from '@angular/core';
import { PlayMode } from '../models/ec.model';
import { studies } from '../data/studies-database';
import { getTreeTemplates } from '../data/tree-templates';

@Injectable({ providedIn: 'root' })
export class TreeCalculatorService {

    calculate(theorems: number, mode: PlayMode): string {
        const tt = Math.max(theorems, 0);
        const templates = getTreeTemplates(mode);

        for (const template of templates) {
            if (tt >= template.requirement) {
                const affordable = this.getAffordableStudies(template.ts, tt);
                return `${affordable.join(',')}|0`;
            }
        }
        return '';
    }

    private getAffordableStudies(list: number[], theorems: number): number[] {
        let remaining = theorems;
        const affordable: number[] = [];

        for (const studyId of list) {
            const study = studies[`${studyId}`];
            if (!study) continue;
            if (study.cost <= remaining) {
                if (study.id === 11 || study.prerequisites.some(p => affordable.includes(p))) {
                    affordable.push(studyId);
                    remaining -= study.cost;
                }
            }
        }
        return affordable;
    }
}
