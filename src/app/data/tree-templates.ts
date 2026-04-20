import { TREE_CONSTANTS } from './studies-database';
import { PlayMode } from '../models/ec.model';

export interface TreeTemplate {
    requirement: number;
    ts: number[];
}

export function getTreeTemplates(path: PlayMode): TreeTemplate[] {
    let realPath: number[];
    switch (path) {
        case 'active': realPath = TREE_CONSTANTS.ACTIVE; break;
        case 'passive': realPath = TREE_CONSTANTS.PASSIVE; break;
        case 'idle': realPath = TREE_CONSTANTS.IDLE; break;
        default: realPath = TREE_CONSTANTS.ACTIVE; break;
    }

    const BASE = [
        ...TREE_CONSTANTS.PRE_SPLIT,
        ...TREE_CONSTANTS.TIME,
        111,
        ...TREE_CONSTANTS.ACTIVE,
        ...TREE_CONSTANTS.POST_SPLIT,
        ...TREE_CONSTANTS.EXTRA,
    ];

    return [
        { requirement: 12900, ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_CONSTANTS.INFINITY, 193, 214, 228, 234, 213, 226) },
        { requirement: 12750, ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_CONSTANTS.INFINITY, 193, 214, 228, 234, 213, 226) },
        { requirement: 4945, ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_CONSTANTS.INFINITY, 193, 214, 228, 234, 213, 226) },
        { requirement: 3925, ts: BASE.concat(191, 212, 223, 232, 192, 201, ...TREE_CONSTANTS.INFINITY, 211, 193, 214, 213) },
        { requirement: 3712, ts: BASE.concat(191, 211, 222, 212, 224, 232, 193, 214) },
        { requirement: 3542, ts: BASE.concat(191, 211, 212, 223, 232, 192, 193, 214) },
        { requirement: 2692, ts: BASE.concat(191, 212, 223, 232, 193, 214, 211, 213) },
        { requirement: 2272, ts: BASE.concat(191, 212, 223, 232, 211) },
        { requirement: 2142, ts: BASE.concat(193, 214, 228, 234) },
        { requirement: 1292, ts: BASE.concat(191, 212, 193, 214, 211, 213) },
        { requirement: 318, ts: BASE.concat(191, 212, 211) },
        { requirement: 147, ts: [...BASE] },
        { requirement: 123, ts: [...BASE.filter(s => s !== 62)] },
        { requirement: 100, ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.TIME, 111, ...realPath, 151, 161, 171, 162, ...TREE_CONSTANTS.EXTRA] },
        { requirement: 66, ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.INFINITY, 111, ...realPath, 151, 161, 162, 21, 33, 31] },
        { requirement: 54, ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.ANTIMATTER, 111, ...realPath, 21, 31] },
        { requirement: 52, ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.INFINITY, 111] },
        { requirement: 45, ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.ANTIMATTER, 111, 21, 33, 31] },
        { requirement: 40, ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.INFINITY, 21, 33, 31] },
        { requirement: 11, ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.ANTIMATTER, 21, 33] },
        { requirement: 0, ts: [...TREE_CONSTANTS.PRE_SPLIT_EARLY] },
    ];
}
