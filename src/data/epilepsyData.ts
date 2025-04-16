
export interface SeizureType {
  id: string;
  name: string;
  description: string;
  commonDrugs: string[];
}

export interface DrugInfo {
  id: string;
  name: string;
  brandNames: string[];
  dosageRange: string;
  forSeizureTypes: string[];
  sideEffects: string[];
  contraindications: string[];
}

export interface LifestyleFactor {
  id: string;
  name: string;
  description: string;
  impactLevel: 'low' | 'moderate' | 'high';
}

export const seizureTypes: SeizureType[] = [
  {
    id: 'focal',
    name: 'Focal (Partial)',
    description: 'Seizures that begin in one area of the brain.',
    commonDrugs: ['carbamazepine', 'oxcarbazepine', 'lamotrigine', 'levetiracetam'],
  },
  {
    id: 'generalized-tonic-clonic',
    name: 'Generalized (Tonic-Clonic)',
    description: 'Seizures affecting the entire brain, causing muscle rigidity followed by convulsions.',
    commonDrugs: ['valproate', 'levetiracetam', 'lamotrigine'],
  },
  {
    id: 'generalized-absence',
    name: 'Generalized (Absence)',
    description: 'Brief lapses of awareness, often with staring spells.',
    commonDrugs: ['ethosuximide', 'valproate', 'lamotrigine'],
  },
  {
    id: 'generalized-myoclonic',
    name: 'Generalized (Myoclonic)',
    description: 'Brief, shock-like jerks of muscles.',
    commonDrugs: ['valproate', 'levetiracetam', 'clonazepam'],
  },
  {
    id: 'mixed',
    name: 'Mixed / Unknown',
    description: 'Multiple seizure types or undetermined seizure types.',
    commonDrugs: ['valproate', 'lamotrigine', 'levetiracetam'],
  },
];

export const drugInformation: DrugInfo[] = [
  {
    id: 'carbamazepine',
    name: 'Carbamazepine',
    brandNames: ['Tegretol', 'Carbatrol', 'Epitol'],
    dosageRange: 'Adults: 400-1200 mg/day in divided doses; Children: 10-20 mg/kg/day',
    forSeizureTypes: ['focal', 'mixed'],
    sideEffects: ['Dizziness', 'Drowsiness', 'Nausea', 'Vision changes', 'Rash'],
    contraindications: ['Bone marrow depression', 'MAOIs within 14 days', 'Pregnancy'],
  },
  {
    id: 'lamotrigine',
    name: 'Lamotrigine',
    brandNames: ['Lamictal'],
    dosageRange: 'Adults: 100-400 mg/day; Children: 1-15 mg/kg/day',
    forSeizureTypes: ['focal', 'generalized-tonic-clonic', 'generalized-absence', 'mixed'],
    sideEffects: ['Rash', 'Dizziness', 'Headache', 'Blurred vision', 'Nausea'],
    contraindications: ['Previous hypersensitivity to lamotrigine'],
  },
  {
    id: 'levetiracetam',
    name: 'Levetiracetam',
    brandNames: ['Keppra', 'Levroxa'],
    dosageRange: 'Adults: 1000-3000 mg/day in 2 doses; Children: 10-60 mg/kg/day',
    forSeizureTypes: ['focal', 'generalized-tonic-clonic', 'generalized-myoclonic'],
    sideEffects: ['Somnolence', 'Fatigue', 'Irritability', 'Dizziness', 'Behavioral changes'],
    contraindications: ['Severe kidney problems'],
  },
  {
    id: 'valproate',
    name: 'Valproate',
    brandNames: ['Depakote', 'Depakene', 'Epilim'],
    dosageRange: 'Adults: 15-60 mg/kg/day; Children: 15-60 mg/kg/day',
    forSeizureTypes: ['generalized-tonic-clonic', 'generalized-absence', 'generalized-myoclonic', 'mixed'],
    sideEffects: ['Nausea', 'Sedation', 'Weight gain', 'Tremor', 'Hair loss'],
    contraindications: ['Liver disease', 'Urea cycle disorders', 'Pregnancy'],
  },
  {
    id: 'ethosuximide',
    name: 'Ethosuximide',
    brandNames: ['Zarontin'],
    dosageRange: 'Adults: 500-1500 mg/day; Children: 20-40 mg/kg/day',
    forSeizureTypes: ['generalized-absence'],
    sideEffects: ['Nausea', 'Vomiting', 'Drowsiness', 'Hiccups', 'Headache'],
    contraindications: ['Hypersensitivity to succinimides'],
  },
  {
    id: 'oxcarbazepine',
    name: 'Oxcarbazepine',
    brandNames: ['Trileptal', 'Oxtellar XR'],
    dosageRange: 'Adults: 600-2400 mg/day; Children: 8-60 mg/kg/day',
    forSeizureTypes: ['focal'],
    sideEffects: ['Dizziness', 'Drowsiness', 'Nausea', 'Vomiting', 'Low sodium levels'],
    contraindications: ['Hypersensitivity to oxcarbazepine or carbamazepine'],
  },
];

export const lifestyleFactors: LifestyleFactor[] = [
  {
    id: 'sleep',
    name: 'Sleep Deprivation',
    description: 'Inadequate or poor quality sleep can trigger seizures.',
    impactLevel: 'high',
  },
  {
    id: 'stress',
    name: 'Stress & Anxiety',
    description: 'High levels of stress or anxiety can increase seizure risk.',
    impactLevel: 'high',
  },
  {
    id: 'alcohol',
    name: 'Alcohol Consumption',
    description: 'Alcohol can lower seizure threshold and interact with medications.',
    impactLevel: 'high',
  },
  {
    id: 'missed-medication',
    name: 'Missed Medication',
    description: 'Missing medication doses can lead to breakthrough seizures.',
    impactLevel: 'high',
  },
  {
    id: 'light-sensitivity',
    name: 'Light Sensitivity',
    description: 'Flashing lights or certain visual patterns can trigger seizures in photosensitive individuals.',
    impactLevel: 'moderate',
  },
  {
    id: 'diet',
    name: 'Diet & Nutrition',
    description: 'Poor nutrition or specific dietary factors can influence seizure control.',
    impactLevel: 'moderate',
  },
  {
    id: 'exercise',
    name: 'Physical Exercise',
    description: 'Excessive exercise or dehydration can potentially trigger seizures in some people.',
    impactLevel: 'moderate',
  },
  {
    id: 'screen-time',
    name: 'Screen Time',
    description: 'Extended screen time may affect sleep quality and trigger seizures in some individuals.',
    impactLevel: 'low',
  },
];

export const emergencyGuidance = {
  title: "Emergency Response Guide for Epileptic Seizures",
  description: "Know what to do if someone is having a seizure:",
  steps: [
    "Stay calm and time the seizure",
    "Remove dangerous objects from the area",
    "Don't restrain the person or put anything in their mouth",
    "Gently roll them to their side if possible",
    "Stay with them until they are fully conscious",
    "Call emergency services (911) if:",
  ],
  callEmergencyIf: [
    "The seizure lasts longer than 5 minutes",
    "The person doesn't wake up after the seizure ends",
    "Another seizure starts before the person recovers",
    "The person has difficulty breathing after the seizure",
    "The person is injured during the seizure",
    "The person has never had a seizure before",
    "The person is pregnant or has diabetes"
  ],
  doNotDo: [
    "Do not hold the person down or try to stop their movements",
    "Do not put anything in the person's mouth",
    "Do not offer food or water until the person is fully alert",
    "Do not leave the person alone until they are fully recovered"
  ]
};
