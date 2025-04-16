
export interface SeizureType {
  id: string;
  name: string;
  description: string;
  commonDrugs: string[];
  probabilityThreshold: number; // How strongly this seizure type correlates with given symptoms
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

export interface GeneticMutation {
  id: string;
  name: string;
  associatedSeizureTypes: string[];
}

export interface Comorbidity {
  id: string;
  name: string;
  description: string;
  impact: 'low' | 'moderate' | 'high';
}

export interface SeizureTrigger {
  id: string;
  name: string;
  description: string;
}

export const seizureTypes: SeizureType[] = [
  {
    id: 'focal',
    name: 'Focal (Partial)',
    description: 'Seizures that begin in one area of the brain. May or may not involve impaired awareness.',
    commonDrugs: ['carbamazepine', 'oxcarbazepine', 'lamotrigine', 'levetiracetam'],
    probabilityThreshold: 0.65
  },
  {
    id: 'generalized-tonic-clonic',
    name: 'Generalized (Tonic-Clonic)',
    description: 'Seizures affecting the entire brain, causing muscle rigidity followed by convulsions and loss of consciousness.',
    commonDrugs: ['valproate', 'levetiracetam', 'lamotrigine'],
    probabilityThreshold: 0.70
  },
  {
    id: 'generalized-absence',
    name: 'Generalized (Absence)',
    description: 'Brief lapses of awareness, often with staring spells, typically lasting less than 30 seconds.',
    commonDrugs: ['ethosuximide', 'valproate', 'lamotrigine'],
    probabilityThreshold: 0.60
  },
  {
    id: 'generalized-myoclonic',
    name: 'Generalized (Myoclonic)',
    description: 'Brief, shock-like jerks of muscles, often in the arms or upper body.',
    commonDrugs: ['valproate', 'levetiracetam', 'clonazepam'],
    probabilityThreshold: 0.65
  },
  {
    id: 'juvenile-myoclonic',
    name: 'Juvenile Myoclonic Epilepsy',
    description: 'Characterized by myoclonic jerks upon awakening, often with tonic-clonic seizures. Usually begins in adolescence.',
    commonDrugs: ['valproate', 'levetiracetam', 'topiramate'],
    probabilityThreshold: 0.75
  },
  {
    id: 'lennox-gastaut',
    name: 'Lennox-Gastaut Syndrome',
    description: 'Severe form of epilepsy with multiple types of seizures, developmental delays, and abnormal EEG.',
    commonDrugs: ['rufinamide', 'clobazam', 'felbamate'],
    probabilityThreshold: 0.80
  },
  {
    id: 'temporal-lobe',
    name: 'Temporal Lobe Epilepsy',
    description: 'Focal seizures originating in the temporal lobe, often with altered awareness and automatisms.',
    commonDrugs: ['carbamazepine', 'lamotrigine', 'levetiracetam'],
    probabilityThreshold: 0.70
  },
  {
    id: 'mixed',
    name: 'Mixed / Unknown',
    description: 'Multiple seizure types or undetermined seizure types.',
    commonDrugs: ['valproate', 'lamotrigine', 'levetiracetam'],
    probabilityThreshold: 0.55
  },
];

export const drugInformation: DrugInfo[] = [
  {
    id: 'carbamazepine',
    name: 'Carbamazepine',
    brandNames: ['Tegretol', 'Carbatrol', 'Epitol'],
    dosageRange: 'Adults: 400-1200 mg/day in divided doses; Children: 10-20 mg/kg/day',
    forSeizureTypes: ['focal', 'temporal-lobe', 'mixed'],
    sideEffects: ['Dizziness', 'Drowsiness', 'Nausea', 'Vision changes', 'Rash', 'Hyponatremia', 'Bone marrow suppression (rare)'],
    contraindications: ['Bone marrow depression', 'MAOIs within 14 days', 'Pregnancy'],
  },
  {
    id: 'lamotrigine',
    name: 'Lamotrigine',
    brandNames: ['Lamictal'],
    dosageRange: 'Adults: 100-400 mg/day; Children: 1-15 mg/kg/day',
    forSeizureTypes: ['focal', 'generalized-tonic-clonic', 'generalized-absence', 'mixed'],
    sideEffects: ['Rash', 'Dizziness', 'Headache', 'Blurred vision', 'Nausea', 'Stevens-Johnson syndrome (rare)'],
    contraindications: ['Previous hypersensitivity to lamotrigine'],
  },
  {
    id: 'levetiracetam',
    name: 'Levetiracetam',
    brandNames: ['Keppra', 'Levroxa'],
    dosageRange: 'Adults: 1000-3000 mg/day in 2 doses; Children: 10-60 mg/kg/day',
    forSeizureTypes: ['focal', 'generalized-tonic-clonic', 'generalized-myoclonic', 'juvenile-myoclonic'],
    sideEffects: ['Somnolence', 'Fatigue', 'Irritability', 'Dizziness', 'Behavioral changes', 'Depression', 'Anxiety'],
    contraindications: ['Severe kidney problems'],
  },
  {
    id: 'valproate',
    name: 'Valproate',
    brandNames: ['Depakote', 'Depakene', 'Epilim'],
    dosageRange: 'Adults: 15-60 mg/kg/day; Children: 15-60 mg/kg/day',
    forSeizureTypes: ['generalized-tonic-clonic', 'generalized-absence', 'generalized-myoclonic', 'juvenile-myoclonic', 'mixed'],
    sideEffects: ['Nausea', 'Sedation', 'Weight gain', 'Tremor', 'Hair loss', 'Liver toxicity', 'Pancreatitis (rare)'],
    contraindications: ['Liver disease', 'Urea cycle disorders', 'Pregnancy'],
  },
  {
    id: 'ethosuximide',
    name: 'Ethosuximide',
    brandNames: ['Zarontin'],
    dosageRange: 'Adults: 500-1500 mg/day; Children: 20-40 mg/kg/day',
    forSeizureTypes: ['generalized-absence'],
    sideEffects: ['Nausea', 'Vomiting', 'Drowsiness', 'Hiccups', 'Headache', 'Rash', 'Blood disorders (rare)'],
    contraindications: ['Hypersensitivity to succinimides'],
  },
  {
    id: 'oxcarbazepine',
    name: 'Oxcarbazepine',
    brandNames: ['Trileptal', 'Oxtellar XR'],
    dosageRange: 'Adults: 600-2400 mg/day; Children: 8-60 mg/kg/day',
    forSeizureTypes: ['focal', 'temporal-lobe'],
    sideEffects: ['Dizziness', 'Drowsiness', 'Nausea', 'Vomiting', 'Low sodium levels', 'Allergic reactions'],
    contraindications: ['Hypersensitivity to oxcarbazepine or carbamazepine'],
  },
  {
    id: 'topiramate',
    name: 'Topiramate',
    brandNames: ['Topamax', 'Trokendi XR'],
    dosageRange: 'Adults: 200-400 mg/day; Children: 5-9 mg/kg/day',
    forSeizureTypes: ['focal', 'generalized-tonic-clonic', 'lennox-gastaut'],
    sideEffects: ['Cognitive slowing', 'Word-finding difficulty', 'Paresthesias', 'Kidney stones', 'Weight loss', 'Glaucoma'],
    contraindications: ['Metabolic acidosis', 'Glaucoma'],
  },
  {
    id: 'clobazam',
    name: 'Clobazam',
    brandNames: ['Onfi', 'Sympazan'],
    dosageRange: 'Adults: 10-40 mg/day; Children: 0.1-1 mg/kg/day',
    forSeizureTypes: ['lennox-gastaut', 'mixed'],
    sideEffects: ['Drowsiness', 'Fatigue', 'Ataxia', 'Dependence', 'Respiratory depression', 'Cognitive impairment'],
    contraindications: ['Severe respiratory insufficiency', 'Sleep apnea', 'Myasthenia gravis'],
  },
  {
    id: 'rufinamide',
    name: 'Rufinamide',
    brandNames: ['Banzel'],
    dosageRange: 'Adults: 1600-3200 mg/day; Children: 10-45 mg/kg/day',
    forSeizureTypes: ['lennox-gastaut'],
    sideEffects: ['Headache', 'Dizziness', 'Fatigue', 'Nausea', 'QT shortening', 'Coordination problems'],
    contraindications: ['Familial Short QT syndrome'],
  },
];

export const comorbidities: Comorbidity[] = [
  { id: 'intellectual-disability', name: 'Intellectual Disability', description: 'Limitations in intellectual functioning and adaptive behavior', impact: 'high' },
  { id: 'adhd', name: 'ADHD', description: 'Attention-deficit/hyperactivity disorder', impact: 'moderate' },
  { id: 'autism', name: 'Autism Spectrum Disorder', description: 'Neurodevelopmental disorder affecting social interaction and communication', impact: 'moderate' },
  { id: 'depression', name: 'Depression', description: 'Mood disorder characterized by persistent feelings of sadness', impact: 'moderate' },
  { id: 'anxiety', name: 'Anxiety', description: 'Excessive worry or fear that interferes with daily activities', impact: 'moderate' },
  { id: 'migraine', name: 'Migraine', description: 'Recurrent headaches that can cause throbbing pain', impact: 'moderate' },
];

export const seizureTriggers: SeizureTrigger[] = [
  { id: 'flashing-lights', name: 'Flashing lights/screens', description: 'Visual stimuli like flashing lights or patterns' },
  { id: 'loud-noise', name: 'Loud noise', description: 'Sudden or loud auditory stimuli' },
  { id: 'hot-water', name: 'Hot water/shower', description: 'Exposure to hot water or steam' },
  { id: 'stress', name: 'Stressful emotional events', description: 'Periods of high emotional stress' },
  { id: 'missing-meals', name: 'Missing meals', description: 'Skipping meals leading to low blood sugar' },
];

export const geneticMutations: GeneticMutation[] = [
  { id: 'scn1a', name: 'SCN1A', associatedSeizureTypes: ['generalized-tonic-clonic', 'lennox-gastaut'] },
  { id: 'kcnq2', name: 'KCNQ2', associatedSeizureTypes: ['focal'] },
  { id: 'scn2a', name: 'SCN2A', associatedSeizureTypes: ['focal', 'generalized-tonic-clonic'] },
  { id: 'tsc1-tsc2', name: 'TSC1/TSC2', associatedSeizureTypes: ['mixed'] },
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
