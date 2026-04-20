export interface EcCompletion {
  completion: number;
  ttRequired: string;
  avgTime: string;
  tip: string;
  studyString: string;
}

export interface EternityChallenge {
  id: number;
  description: string;
  reward: string;
  completions: EcCompletion[];
}

export interface FarmEntry {
  label: string;
  studyString: string;
}

export interface EcStep {
  ecId: number;
  completion: number;
  label: string;
  ttRequired: string;
  studyString: string;
}

export type PlayMode = 'active' | 'passive' | 'idle';
