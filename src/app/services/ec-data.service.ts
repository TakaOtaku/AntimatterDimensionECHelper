import { Injectable, signal, computed } from '@angular/core';
import { EcStep, EternityChallenge, FarmEntry, PlayMode } from '../models/ec.model';

const FIXED_MODE_ECS: Partial<Record<number, PlayMode>> = {
  4: 'idle',
  6: 'active',
  8: 'idle',
};

const MODE_TRIO: Record<PlayMode, [string, string, string]> = {
  active: ['121', '131', '141'],
  passive: ['122', '132', '142'],
  idle: ['123', '133', '143'],
};

function applyMode(studyString: string, mode: PlayMode, ecId: number): string {
  if (FIXED_MODE_ECS[ecId]) return studyString;
  const [t1, t2, t3] = MODE_TRIO[mode];
  return studyString
    .replace(/\b12[123]\b/g, t1)
    .replace(/\b13[123]\b/g, t2)
    .replace(/\b14[123]\b/g, t3);
}

@Injectable({ providedIn: 'root' })
export class EcDataService {
  readonly mode = signal<PlayMode>('active');
  readonly completedSteps = signal<Set<string>>(new Set());

  readonly challenges = computed(() => {
    const m = this.mode();
    return EC_DATA.map(ec => ({
      ...ec,
      completions: ec.completions.map(c => ({
        ...c,
        studyString: applyMode(c.studyString, m, ec.id),
      })),
    }));
  });

  readonly farms = computed(() => {
    const m = this.mode();
    return FARM_DATA.map(f => ({
      ...f,
      studyString: applyMode(f.studyString, m, 0),
    }));
  });

  readonly ecSteps = computed(() => {
    const m = this.mode();
    return EC_STEPS.map(s => ({
      ...s,
      studyString: applyMode(s.studyString, m, s.ecId),
    }));
  });

  markCompleted(ecId: number, completion: number): void {
    this.completedSteps.update(set => {
      const next = new Set(set);
      next.add(`${ecId}-${completion}`);
      return next;
    });
  }
}

const EC_DATA: EternityChallenge[] = [
  {
    id: 1,
    description: 'Time Dimensions are disabled.',
    reward: 'Time Dimension multiplier based on time spent this Eternity',
    completions: [
      { completion: 1, ttRequired: '130', avgTime: '6~10mins', tip: 'Start an IC at the beginning to get an achievement, exit IC and start EC1 again.', studyString: '11,22,32,42,51,61,72,82,92,102,111,122,132,142,151,161,171|1' },
      { completion: 2, ttRequired: '140', avgTime: '15~20mins', tip: '60000+ Eternities needed.', studyString: '11,21,22,32,42,51,61,72,82,92,102,111,122,132,142,151,161,162,171|1' },
      { completion: 3, ttRequired: '147', avgTime: '2mins', tip: 'TS62 is now unlocked and speeds up Replicanti.', studyString: '11,21,22,32,33,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|1' },
      { completion: 4, ttRequired: '163', avgTime: '2~3mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|1' },
      { completion: 5, ttRequired: '176', avgTime: '3~5mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|1' },
    ],
  },
  {
    id: 2,
    description: 'Infinity Dimensions are disabled.',
    reward: '1st Infinity Dimension multiplier based on Infinity Power',
    completions: [
      { completion: 1, ttRequired: '135', avgTime: '15~25mins', tip: 'Wait for Time Shards when crunches don\'t give more IP.', studyString: '11,22,32,42,51,61,73,83,93,103,111,122,132,142,151,161,171|2' },
      { completion: 2, ttRequired: '157', avgTime: '5~10mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|2' },
      { completion: 3, ttRequired: '182', avgTime: '3~5mins', tip: 'Do a normal Active EP run and buy this at the end.', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|2' },
      { completion: 4, ttRequired: '200', avgTime: '3~5mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|2' },
      { completion: 5, ttRequired: '240', avgTime: '3~6mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|2' },
    ],
  },
  {
    id: 3,
    description: 'Antimatter Dimensions 5-8 don\'t produce anything. Dimensional Sacrifice is disabled.',
    reward: 'Increase the multiplier for buying 10 Antimatter Dimensions',
    completions: [
      { completion: 1, ttRequired: '140', avgTime: '40mins~1hr', tip: 'Farm requirement with TS73 path then respec after buying EC3.', studyString: '11,22,32,42,51,61,71,81,91,101,111,122,132,142,151,161,162,171|3' },
      { completion: 2, ttRequired: '155', avgTime: '10~15mins', tip: 'Farm requirement with TS73 path then respec after buying EC3.', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171|3' },
      { completion: 3, ttRequired: '163', avgTime: '8~12mins', tip: 'Farm requirement with TS73 path then respec after buying EC3.', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|3' },
      { completion: 4, ttRequired: '182', avgTime: '3~5mins', tip: 'Farm to requirement with TS73 path then respec after buying EC3.', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|3' },
      { completion: 5, ttRequired: '200', avgTime: '4~6mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|3' },
    ],
  },
  {
    id: 4,
    description: 'All Infinity multipliers and generators are disabled. The goal must be reached within a certain number of Infinities or else you will fail the Challenge.',
    reward: 'Infinity Dimension multiplier based on unspent IP',
    completions: [
      { completion: 1, ttRequired: '142', avgTime: '20~30mins', tip: 'Fail once, 145TT allows for TS21 and makes this challenge easier.', studyString: '11,22,32,33,42,51,61,73,83,93,103,111,123,133,143|4' },
      { completion: 2, ttRequired: '170', avgTime: '15~25mins', tip: '172TT / 173TT allows for TS33 / TS62 and makes this challenge faster.', studyString: '11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,162,171|4' },
      { completion: 3, ttRequired: '175', avgTime: '15~20mins', tip: '', studyString: '11,22,32,33,42,51,61,62,73,83,93,103,111,123,133,143,151,162,171|4' },
      { completion: 4, ttRequired: '245', avgTime: '10~25mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171|4' },
      { completion: 5, ttRequired: '370', avgTime: '5sec', tip: 'Can be done with TS71 path 7TT earlier.', studyString: '11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,162,171,181|4' },
    ],
  },
  {
    id: 5,
    description: 'Antimatter Galaxy cost increase scaling starts immediately (normally at 100 Galaxies). Dimension Boost costs scaling is massively increased.',
    reward: 'Distant Galaxy cost scaling starts later',
    completions: [
      { completion: 1, ttRequired: '147', avgTime: '10~15mins', tip: '', studyString: '11,21,22,32,42,51|5' },
      { completion: 2, ttRequired: '182', avgTime: '2~4mins', tip: '', studyString: '11,22,32,42,51,61,72,82,92,102,111|5' },
      { completion: 3, ttRequired: '200', avgTime: '3~5mins', tip: '', studyString: '11,22,32,42,51,61,72,82,92,102,111,122,132,142|5' },
      { completion: 4, ttRequired: '215', avgTime: '1~3mins', tip: '214TT can work for EC5x4, 215TT is for EC7x3.', studyString: '11,21,22,32,42,51,61,62,72,82,92,102,111,122,132,142,151|5' },
      { completion: 5, ttRequired: '245', avgTime: '1~3mins', tip: '252TT can get TS31 + TS41 for full tree.', studyString: '11,21,22,32,33,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|5' },
    ],
  },
  {
    id: 6,
    description: 'You cannot gain Antimatter Galaxies normally. The cost of upgrading your max Replicanti Galaxies is massively reduced.',
    reward: 'Further reduce Antimatter Dimension cost multiplier growth',
    completions: [
      { completion: 1, ttRequired: '160', avgTime: '25~45mins', tip: '163TT allows for TS21 and makes this challenge easier.', studyString: '11,22,32,33,42,51,61,62,72,82,92,102,111,121,131,141|6' },
      { completion: 2, ttRequired: '176', avgTime: '12~20mins', tip: '', studyString: '11,21,22,32,42,51,61,62,72,82,92,102,111,121,131,141,151,162|6' },
      { completion: 3, ttRequired: '200', avgTime: '4~6mins', tip: '', studyString: '11,21,22,32,33,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6' },
      { completion: 4, ttRequired: '264', avgTime: '7~12mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6' },
      { completion: 5, ttRequired: '320+', avgTime: '4~6mins', tip: '1e40EP Eternity Upgrade required.', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6' },
    ],
  },
  {
    id: 7,
    description: '1st Time Dimensions produce 8th Infinity Dimensions and 1st Infinity Dimensions produce 7th Antimatter Dimensions. Tickspeed also directly applies to Infinity and Time Dimensions.',
    reward: '1st Time Dimension produces 8th Infinity Dimensions',
    completions: [
      { completion: 1, ttRequired: '166', avgTime: '2~3mins', tip: 'e500000 AM can be farmed with challenge setup.', studyString: '11,21,22,32,42,51,61,62,71,81,91,101,111|7' },
      { completion: 2, ttRequired: '193', avgTime: '1min', tip: 'Farm to requirement with TS73 path then respec after buying EC7.', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142|7' },
      { completion: 3, ttRequired: '215', avgTime: '30sec', tip: 'Farm to requirement with TS73 path then respec after buying EC7.', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162|7' },
      { completion: 4, ttRequired: '264', avgTime: '1~3mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171|7' },
      { completion: 5, ttRequired: '858', avgTime: '30sec', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,193,214|7' },
    ],
  },
  {
    id: 8,
    description: 'You can only upgrade Infinity Dimensions 50 times and Replicanti upgrades 40 times. Infinity Dimension and Replicanti upgrade autobuyers are disabled.',
    reward: 'Infinity Power strengthens Replicanti Galaxies',
    completions: [
      { completion: 1, ttRequired: '200', avgTime: '30sec', tip: 'Requirement farm: 7s autocrunch, at e3590 IP change autocrunch to 60s and add in TS133 + TS143, BUY EC8x1 then respec. 0 RG, 9% RG Chance, All ID into ID1.', studyString: '11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,162|8' },
      { completion: 2, ttRequired: '310', avgTime: '2~4mins', tip: '0 RG, 9% RG Chance, All ID into ID1.', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171|8' },
      { completion: 3, ttRequired: '450', avgTime: '15~20mins', tip: '4 RG, 9% RG Chance, All ID into ID1. Use EC8 trick of TS133.', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8' },
      { completion: 4, ttRequired: '600', avgTime: '15~20mins', tip: '4 RG, 9% RG Chance, All ID into ID1. Use EC8 trick of TS133.', studyString: '11,21,22,31,32,33,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8' },
      { completion: 5, ttRequired: '825', avgTime: '30sec', tip: '0 RG, 9% RG Chance, All ID into ID1.', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8' },
    ],
  },
  {
    id: 9,
    description: 'You cannot buy Tickspeed upgrades. Infinity Power instead multiplies Time Dimensions with greatly reduced effect.',
    reward: 'Infinity Dimension multiplier based on Time Shards',
    completions: [
      { completion: 1, ttRequired: '522', avgTime: '30~40mins', tip: 'Wait for Time Shards when crunches don\'t give more IP.', studyString: '11,22,32,42,51,61,73,83,93,103,111,122,132,142,151,161,162,171|9' },
      { completion: 2, ttRequired: '575', avgTime: '15~30mins', tip: 'Wait for Time Shards when crunches don\'t give more IP.', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|9' },
      { completion: 3, ttRequired: '660', avgTime: '12~20mins', tip: 'Wait for Time Shards when crunches don\'t give more IP.', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|9' },
      { completion: 4, ttRequired: '760', avgTime: '7~15mins', tip: 'Crunch a bit at the end for TS141.', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181|9' },
      { completion: 5, ttRequired: '830', avgTime: '8~15mins', tip: 'Crunch a bit at the end for TS141.', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181|9' },
    ],
  },
  {
    id: 10,
    description: 'Time Dimensions and Infinity Dimensions are disabled. You gain an immense boost from Infinities to Antimatter Dimensions (Infinities\u00D7950).',
    reward: 'Time Dimension multiplier based on Infinities',
    completions: [
      { completion: 1, ttRequired: '858', avgTime: '40~65mins', tip: 'Farm Infinities inside EC10.', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,171,181|10' },
      { completion: 2, ttRequired: '1820', avgTime: '1min', tip: 'Recommended to have 10M+ Infinities Banked.', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,171,181,191,193,211,214|10' },
      { completion: 3, ttRequired: '2050', avgTime: '5min', tip: 'Recommended to have 20M+ Infinities Banked.', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,171,181,192,193,214|10' },
      { completion: 4, ttRequired: '2740+', avgTime: '2~3mins', tip: 'Recommended to have 35M+ Infinities Banked.', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,171,181,191,192,193,211,213,214|10' },
      { completion: 5, ttRequired: '3615+', avgTime: '2~3mins', tip: 'Recommended to have 45M+ Infinities Banked.', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,171,181,192,193,213,214,225,233|10' },
    ],
  },
  {
    id: 11,
    description: 'All Dimension multipliers and powers are disabled except for the multipliers from Infinity Power and Dimension Boosts (to Antimatter Dimensions).',
    reward: 'Further reduce Tickspeed cost multiplier growth',
    completions: [
      { completion: 1, ttRequired: '2886+', avgTime: '2mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,191,193,211,212,213,222,231|11' },
      { completion: 2, ttRequired: '4870+', avgTime: '5mins', tip: '', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,191,192,193,211,213,222,225,231,233|11' },
      { completion: 3, ttRequired: '5950', avgTime: '7mins', tip: '', studyString: '11,21,22,31,32,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11' },
      { completion: 4, ttRequired: '5950', avgTime: '20~30mins', tip: '', studyString: '11,21,22,31,32,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11' },
      { completion: 5, ttRequired: '5950', avgTime: '\u00B11h45mins', tip: '', studyString: '11,21,22,31,32,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11' },
    ],
  },
  {
    id: 12,
    description: 'The game runs \u00D71,000 slower; all other game speed effects are disabled. The goal must be reached within a certain amount of time or you will fail the Challenge.',
    reward: 'Infinity Dimension cost multipliers are reduced',
    completions: [
      { completion: 1, ttRequired: '9800', avgTime: '1sec', tip: '', studyString: '11,21,22,31,32,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12' },
      { completion: 2, ttRequired: '9800', avgTime: '10~15sec', tip: '', studyString: '11,21,22,31,32,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12' },
      { completion: 3, ttRequired: '10750', avgTime: '80~100sec', tip: '', studyString: '11,21,22,31,32,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12' },
      { completion: 4, ttRequired: '11200', avgTime: '220~250sec', tip: '', studyString: '11,21,22,31,32,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12' },
      { completion: 5, ttRequired: '12350', avgTime: '190~198sec', tip: '', studyString: '11,21,22,31,32,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12' },
    ],
  },
];

const FARM_DATA: FarmEntry[] = [
  { label: 'Total 1092 TT', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,191,212,211|0' },
  { label: 'Total 1292 TT', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,191,193,212,214,211,213|0' },
  { label: 'Total 2142 TT', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,193,214,228,234|0' },
  { label: 'Total 2272 TT', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,191,212,223,232,211,193,214,213|0' },
  { label: 'Total 3542 TT', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,191,192,193,211,212,214,223,232|0' },
  { label: 'Total 3712 TT', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,191,193,211,212,214,222,224,232|0' },
  { label: 'Total 3925 TT', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,191,192,201,72,82,92,102,212,223,232,211,193,214,213|0' },
  { label: 'Total 4945 TT', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,191,192,201,72,82,92,102,211,212,222,224,232,193,214,213,228,234,226|0' },
];

const EC_STEPS: EcStep[] = [
  { ecId: 1, completion: 1, label: 'EC1x1', ttRequired: '130', studyString: '11,22,32,42,51,61,72,82,92,102,111,122,132,142,151,161,171|1' },
  { ecId: 2, completion: 1, label: 'EC2x1', ttRequired: '135', studyString: '11,22,32,42,51,61,73,83,93,103,111,122,132,142,151,161,171|2' },
  { ecId: 1, completion: 2, label: 'EC1x2', ttRequired: '140', studyString: '11,21,22,32,42,51,61,72,82,92,102,111,122,132,142,151,161,162,171|1' },
  { ecId: 3, completion: 1, label: 'EC3x1', ttRequired: '140', studyString: '11,22,32,42,51,61,71,81,91,101,111,122,132,142,151,161,162,171|3' },
  { ecId: 4, completion: 1, label: 'EC4x1', ttRequired: '142', studyString: '11,22,32,33,42,51,61,73,83,93,103,111,123,133,143|4' },
  { ecId: 5, completion: 1, label: 'EC5x1', ttRequired: '147', studyString: '11,21,22,32,42,51|5' },
  { ecId: 1, completion: 3, label: 'EC1x3', ttRequired: '147', studyString: '11,21,22,32,33,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|1' },
  { ecId: 3, completion: 2, label: 'EC3x2', ttRequired: '155', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171|3' },
  { ecId: 2, completion: 2, label: 'EC2x2', ttRequired: '157', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|2' },
  { ecId: 6, completion: 1, label: 'EC6x1', ttRequired: '160', studyString: '11,22,32,33,42,51,61,62,72,82,92,102,111,121,131,141|6' },
  { ecId: 1, completion: 4, label: 'EC1x4', ttRequired: '163', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|1' },
  { ecId: 3, completion: 3, label: 'EC3x3', ttRequired: '163', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|3' },
  { ecId: 7, completion: 1, label: 'EC7x1', ttRequired: '166', studyString: '11,21,22,32,42,51,61,62,71,81,91,101,111|7' },
  { ecId: 4, completion: 2, label: 'EC4x2', ttRequired: '170', studyString: '11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,162,171|4' },
  { ecId: 4, completion: 3, label: 'EC4x3', ttRequired: '175', studyString: '11,22,32,33,42,51,61,62,73,83,93,103,111,123,133,143,151,162,171|4' },
  { ecId: 6, completion: 2, label: 'EC6x2', ttRequired: '176', studyString: '11,21,22,32,42,51,61,62,72,82,92,102,111,121,131,141,151,162|6' },
  { ecId: 1, completion: 5, label: 'EC1x5', ttRequired: '176', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|1' },
  { ecId: 5, completion: 2, label: 'EC5x2', ttRequired: '182', studyString: '11,22,32,42,51,61,72,82,92,102,111|5' },
  { ecId: 2, completion: 3, label: 'EC2x3', ttRequired: '182', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|2' },
  { ecId: 3, completion: 4, label: 'EC3x4', ttRequired: '182', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|3' },
  { ecId: 7, completion: 2, label: 'EC7x2', ttRequired: '193', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142|7' },
  { ecId: 5, completion: 3, label: 'EC5x3', ttRequired: '200', studyString: '11,22,32,42,51,61,72,82,92,102,111,122,132,142|5' },
  { ecId: 8, completion: 1, label: 'EC8x1', ttRequired: '200', studyString: '11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,162|8' },
  { ecId: 3, completion: 5, label: 'EC3x5', ttRequired: '200', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|3' },
  { ecId: 6, completion: 3, label: 'EC6x3', ttRequired: '200', studyString: '11,21,22,32,33,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6' },
  { ecId: 2, completion: 4, label: 'EC2x4', ttRequired: '200', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|2' },
  { ecId: 5, completion: 4, label: 'EC5x4', ttRequired: '215', studyString: '11,21,22,32,42,51,61,62,72,82,92,102,111,122,132,142,151|5' },
  { ecId: 7, completion: 3, label: 'EC7x3', ttRequired: '215', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162|7' },
  { ecId: 2, completion: 5, label: 'EC2x5', ttRequired: '240', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|2' },
  { ecId: 5, completion: 5, label: 'EC5x5', ttRequired: '245', studyString: '11,21,22,32,33,42,51,61,62,72,82,92,102,111,122,132,142,151,161,162,171|5' },
  { ecId: 4, completion: 4, label: 'EC4x4', ttRequired: '245', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171|4' },
  { ecId: 6, completion: 4, label: 'EC6x4', ttRequired: '264', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6' },
  { ecId: 7, completion: 4, label: 'EC7x4', ttRequired: '264', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171|7' },
  { ecId: 8, completion: 2, label: 'EC8x2', ttRequired: '310', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171|8' },
  { ecId: 6, completion: 5, label: 'EC6x5', ttRequired: '320+', studyString: '11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6' },
  { ecId: 4, completion: 5, label: 'EC4x5', ttRequired: '370', studyString: '11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,162,171,181|4' },
  { ecId: 8, completion: 3, label: 'EC8x3', ttRequired: '450', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8' },
  { ecId: 9, completion: 1, label: 'EC9x1', ttRequired: '522', studyString: '11,22,32,42,51,61,73,83,93,103,111,122,132,142,151,161,162,171|9' },
  { ecId: 9, completion: 2, label: 'EC9x2', ttRequired: '575', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|9' },
  { ecId: 8, completion: 4, label: 'EC8x4', ttRequired: '600', studyString: '11,21,22,31,32,33,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8' },
  { ecId: 9, completion: 3, label: 'EC9x3', ttRequired: '660', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171|9' },
  { ecId: 9, completion: 4, label: 'EC9x4', ttRequired: '760', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181|9' },
  { ecId: 8, completion: 5, label: 'EC8x5', ttRequired: '825', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8' },
  { ecId: 9, completion: 5, label: 'EC9x5', ttRequired: '830', studyString: '11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181|9' },
  { ecId: 10, completion: 1, label: 'EC10x1', ttRequired: '858', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,171,181|10' },
  { ecId: 7, completion: 5, label: 'EC7x5', ttRequired: '858', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,193,214|7' },
  { ecId: 10, completion: 2, label: 'EC10x2', ttRequired: '1820', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,171,181,191,193,211,214|10' },
  { ecId: 10, completion: 3, label: 'EC10x3', ttRequired: '2050', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,171,181,192,193,214|10' },
  { ecId: 10, completion: 4, label: 'EC10x4', ttRequired: '2740+', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,171,181,191,192,193,211,213,214|10' },
  { ecId: 11, completion: 1, label: 'EC11x1', ttRequired: '2886+', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,191,193,211,212,213,222,231|11' },
  { ecId: 10, completion: 5, label: 'EC10x5', ttRequired: '3615+', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,171,181,192,193,213,214,225,233|10' },
  { ecId: 11, completion: 2, label: 'EC11x2', ttRequired: '4870+', studyString: '11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,191,192,193,211,213,222,225,231,233|11' },
  { ecId: 11, completion: 3, label: 'EC11x3', ttRequired: '5950', studyString: '11,21,22,31,32,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11' },
  { ecId: 11, completion: 4, label: 'EC11x4', ttRequired: '5950', studyString: '11,21,22,31,32,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11' },
  { ecId: 11, completion: 5, label: 'EC11x5', ttRequired: '5950', studyString: '11,21,22,31,32,41,42,51,61,62,71,81,91,101,111,122,132,142,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11' },
  { ecId: 12, completion: 1, label: 'EC12x1', ttRequired: '9800', studyString: '11,21,22,31,32,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12' },
  { ecId: 12, completion: 2, label: 'EC12x2', ttRequired: '9800', studyString: '11,21,22,31,32,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12' },
  { ecId: 12, completion: 3, label: 'EC12x3', ttRequired: '10750', studyString: '11,21,22,31,32,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12' },
  { ecId: 12, completion: 4, label: 'EC12x4', ttRequired: '11200', studyString: '11,21,22,31,32,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12' },
  { ecId: 12, completion: 5, label: 'EC12x5', ttRequired: '12350', studyString: '11,21,22,31,32,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12' },
];
