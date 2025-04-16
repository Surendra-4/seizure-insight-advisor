import { seizureTypes, drugInformation, lifestyleFactors, comorbidities, seizureTriggers } from '../data/epilepsyData';

export interface EpilepticAssessment {
  // Patient Medical History
  age: number;
  gender: string;
  weight: number;
  height?: number;
  seizureOnsetAge?: string;
  seizureFrequency?: string;
  hadStatusEpilepticus?: boolean;
  familyHistoryEpilepsy?: boolean;
  hadFebrileSeizures?: boolean;
  brainTraumaHistory?: boolean;
  surgicalIntervention?: string;
  
  // Medication Profile
  currentDrugs: string[];
  timeSinceLastDose?: string;
  missedDoses: boolean;
  drugResistance?: string;
  drugSideEffects?: string;
  
  // Genetic & Comorbidity
  geneticMutation?: boolean;
  comorbidities: string[];
  neurodevelopmentalCondition?: boolean;
  
  // Lifestyle & Environment
  sleepLast24H?: string;
  caffeineAlcoholLast24H?: boolean;
  stressLevel: number;
  seizureTriggers: string[];
  timeOfDay?: string;
  weatherConditions?: string;
  
  // Physiological Data
  heartRate?: number;
  bloodPressure?: string;
  bloodGlucose?: number;
  
  // Context & Behavior
  currentLocation?: string;
  isAlone?: boolean;
  hasHospitalAccess?: boolean;
  hadEpisodeLast48H?: boolean;
  postIctalSymptoms?: string[];
  
  // Advanced Data
  mriEegResults?: string;
  veegDiagnosis?: boolean;
  petSpectResults?: string;
  prolactinLevel?: string;
  
  // From previous model
  seizureTypeId?: string;
  currentDrugId?: string;
  currentDosage?: number;
  lightSensitivity?: boolean;
  sleepQuality?: number;
  recentAlcohol?: boolean;
  lastSeizureDate?: Date;
}

export interface AssessmentResult {
  epilepsyProbability: number;
  seizureType?: string;
  seizureTypeId?: string;
  seizureTypeDescription?: string;
  seizureRisk: 'low' | 'moderate' | 'high';
  suggestedDosage?: {
    drug: string;
    dosage: string;
    warning?: string;
    sideEffects: string[];
  };
  lifestyleSuggestions: string[];
  emergencyWarning?: string;
  confidenceLevel: 'low' | 'moderate' | 'high';
}

export const calculateAssessmentResult = (assessment: EpilepticAssessment): AssessmentResult => {
  // Calculate probability of epilepsy based on input factors
  let epilepsyProbabilityScore = 0;
  let possibleSeizureTypes: {id: string, score: number}[] = [];
  let confidenceFactors = 0;
  let maxConfidenceFactors = 0;
  
  // Base probability calculation
  
  // Medical history factors
  if (assessment.hadStatusEpilepticus) {
    epilepsyProbabilityScore += 15;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  if (assessment.familyHistoryEpilepsy) {
    epilepsyProbabilityScore += 10;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  if (assessment.hadFebrileSeizures) {
    epilepsyProbabilityScore += 8;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  if (assessment.brainTraumaHistory) {
    epilepsyProbabilityScore += 12;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  if (assessment.surgicalIntervention && assessment.surgicalIntervention !== 'none') {
    epilepsyProbabilityScore += 15;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  // Medication factors
  if (assessment.currentDrugs && assessment.currentDrugs.length > 0 && !assessment.currentDrugs.includes('none')) {
    epilepsyProbabilityScore += 20;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  if (assessment.missedDoses) {
    epilepsyProbabilityScore += 5;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  if (assessment.drugResistance === 'drug-resistant') {
    epilepsyProbabilityScore += 10;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  // Genetic factors
  if (assessment.geneticMutation) {
    epilepsyProbabilityScore += 12;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  if (assessment.comorbidities && assessment.comorbidities.length > 0) {
    epilepsyProbabilityScore += Math.min(assessment.comorbidities.length * 3, 12);
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  if (assessment.neurodevelopmentalCondition) {
    epilepsyProbabilityScore += 8;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  // Environmental and behavioral factors
  if (assessment.hadEpisodeLast48H) {
    epilepsyProbabilityScore += 15;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  if (assessment.postIctalSymptoms && assessment.postIctalSymptoms.length > 0) {
    epilepsyProbabilityScore += 10;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  // Advanced diagnostic data
  if (assessment.mriEegResults === 'abnormal') {
    epilepsyProbabilityScore += 20;
    confidenceFactors += 2; // More weight for diagnostic tests
  }
  maxConfidenceFactors += 2;
  
  if (assessment.veegDiagnosis) {
    epilepsyProbabilityScore += 25;
    confidenceFactors += 2; 
  }
  maxConfidenceFactors += 2;
  
  if (assessment.petSpectResults === 'abnormal glucose metabolism') {
    epilepsyProbabilityScore += 15;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  if (assessment.prolactinLevel === 'elevated') {
    epilepsyProbabilityScore += 10;
    confidenceFactors++;
  }
  maxConfidenceFactors++;
  
  // Calculate confidence level based on how many factors contributed
  const confidenceRatio = confidenceFactors / maxConfidenceFactors;
  let confidenceLevel: 'low' | 'moderate' | 'high' = 'low';
  
  if (confidenceRatio > 0.65) {
    confidenceLevel = 'high';
  } else if (confidenceRatio > 0.35) {
    confidenceLevel = 'moderate';
  }
  
  // Calculate epilepsy probability as percentage (capped at 98%)
  const normalizedProbability = Math.min(epilepsyProbabilityScore / 120, 0.98) * 100;
  
  // If probability too low, early exit
  if (normalizedProbability < 60) {
    return {
      epilepsyProbability: normalizedProbability,
      seizureRisk: 'low',
      lifestyleSuggestions: [
        "While your symptoms don't strongly suggest epilepsy, consider consulting a neurologist if you're experiencing concerning symptoms.",
        "Maintain a healthy sleep schedule and avoid known triggers like alcohol and excessive caffeine.",
        "Track any unusual episodes with notes on timing, duration, and symptoms."
      ],
      confidenceLevel: confidenceLevel
    };
  }
  
  // Determine seizure type
  // We'll analyze the symptoms and history to determine the most likely seizure type
  
  // Check for focal seizures
  if (assessment.postIctalSymptoms && 
      (assessment.postIctalSymptoms.includes('Aphasia') || 
       assessment.postIctalSymptoms.includes('Automatisms'))) {
    possibleSeizureTypes.push({id: 'focal', score: 20});
    possibleSeizureTypes.push({id: 'temporal-lobe', score: 15});
  }
  
  // Check for generalized seizures
  if (assessment.hadStatusEpilepticus || 
      (assessment.postIctalSymptoms && 
       (assessment.postIctalSymptoms.includes('Fatigue') || 
        assessment.postIctalSymptoms.includes('Confusion')))) {
    possibleSeizureTypes.push({id: 'generalized-tonic-clonic', score: 20});
  }
  
  // Check for absence seizures
  if (assessment.seizureFrequency === 'daily' && 
      assessment.seizureOnsetAge === 'childhood') {
    possibleSeizureTypes.push({id: 'generalized-absence', score: 15});
  }
  
  // Check for myoclonic seizures
  if (assessment.timeOfDay === 'morning') {
    possibleSeizureTypes.push({id: 'generalized-myoclonic', score: 10});
    possibleSeizureTypes.push({id: 'juvenile-myoclonic', score: assessment.seizureOnsetAge === 'adolescence' ? 20 : 5});
  }
  
  // Check for Lennox-Gastaut
  if (assessment.neurodevelopmentalCondition && 
      assessment.comorbidities.includes('intellectual-disability')) {
    possibleSeizureTypes.push({id: 'lennox-gastaut', score: 15});
  }
  
  // If we have a specific seizure type ID from previous input, use it directly
  if (assessment.seizureTypeId) {
    possibleSeizureTypes.push({id: assessment.seizureTypeId, score: 30});
  }
  
  // Sort by score and get highest
  possibleSeizureTypes.sort((a, b) => b.score - a.score);
  let seizureTypeId = possibleSeizureTypes.length > 0 ? possibleSeizureTypes[0].id : 'mixed';
  
  // Initialize risk factors
  let riskScore = 0;
  const lifestyleSuggestions: string[] = [];
  
  // Increase risk score based on missed doses
  if (assessment.missedDoses) {
    riskScore += 3;
    lifestyleSuggestions.push("Take medication as prescribed. Missing doses significantly increases seizure risk.");
  }
  
  // Stress level affects risk (0-10 scale)
  if (assessment.stressLevel > 7) {
    riskScore += 2;
    lifestyleSuggestions.push("Your stress level is high. Try stress reduction techniques like deep breathing, meditation, or gentle exercise.");
  } else if (assessment.stressLevel > 4) {
    riskScore += 1;
    lifestyleSuggestions.push("Consider incorporating stress management into your daily routine.");
  }
  
  // Sleep factors
  if (assessment.sleepLast24H === '<4h') {
    riskScore += 3;
    lifestyleSuggestions.push("Your sleep is severely inadequate. Sleep deprivation is a major seizure trigger. Prioritize improving your sleep schedule.");
  } else if (assessment.sleepLast24H === '4–6h') {
    riskScore += 2;
    lifestyleSuggestions.push("Try to improve your sleep quality by maintaining consistent sleep times and creating a restful environment.");
  }
  
  // Substance use
  if (assessment.caffeineAlcoholLast24H) {
    riskScore += 2;
    lifestyleSuggestions.push("Alcohol and excessive caffeine can lower seizure threshold and interact with medications. Consider reducing or avoiding these substances.");
  }
  
  // Recent episode increases risk of another
  if (assessment.hadEpisodeLast48H) {
    riskScore += 3;
    lifestyleSuggestions.push("You've had a recent seizure, which increases the risk of another. Take extra precautions and ensure you're not alone if possible.");
  }
  
  // Seizure triggers
  if (assessment.seizureTriggers && assessment.seizureTriggers.length > 0) {
    riskScore += Math.min(assessment.seizureTriggers.length, 3);
    lifestyleSuggestions.push("Avoid your identified seizure triggers when possible, especially during high-risk periods.");
  }
  
  // Safety based on location and company
  if (assessment.currentLocation === 'driving') {
    riskScore += 3;
    lifestyleSuggestions.push("URGENT: Driving with epilepsy can be dangerous and may be restricted based on your seizure control. Pull over and stop driving immediately.");
  }
  
  if (assessment.isAlone && riskScore > 3) {
    lifestyleSuggestions.push("Given your current risk level, try not to be alone for extended periods if possible.");
  }
  
  if (!assessment.hasHospitalAccess && riskScore > 4) {
    lifestyleSuggestions.push("Consider your access to emergency care given your current seizure risk. Have a plan for getting help if needed.");
  }
  
  // Add a general recommendation
  lifestyleSuggestions.push("Regular exercise, proper hydration, and balanced nutrition can help with seizure control.");
  
  // Determine seizure risk level based on score
  let seizureRisk: 'low' | 'moderate' | 'high' = 'low';
  if (riskScore >= 5) {
    seizureRisk = 'high';
  } else if (riskScore >= 2) {
    seizureRisk = 'moderate';
  }

  // Find the seizure type object
  const seizureType = seizureTypes.find(s => s.id === seizureTypeId);
  
  // Find appropriate medications
  let suggestedDosage;
  
  // If they're already on a medication, prioritize that
  if (assessment.currentDrugs && assessment.currentDrugs.length > 0 && !assessment.currentDrugs.includes('none')) {
    const currentDrugId = assessment.currentDrugs[0];
    const drug = drugInformation.find(d => d.id === currentDrugId);
    
    if (drug) {
      const isAppropriate = seizureTypeId ? drug.forSeizureTypes.includes(seizureTypeId) : true;
      
      suggestedDosage = {
        drug: drug.name,
        dosage: drug.dosageRange,
        warning: !isAppropriate ? 
          `Note: ${drug.name} is not typically a first-choice medication for your seizure type. Consult your doctor.` : 
          undefined,
        sideEffects: drug.sideEffects
      };
    }
  } 
  // Otherwise recommend based on seizure type
  else if (seizureType) {
    const recommendedDrugs = drugInformation.filter(d => d.forSeizureTypes.includes(seizureTypeId));
    if (recommendedDrugs.length > 0) {
      const primaryDrug = recommendedDrugs[0];
      suggestedDosage = {
        drug: primaryDrug.name,
        dosage: primaryDrug.dosageRange,
        sideEffects: primaryDrug.sideEffects
      };
    }
  }
  
  // Generate emergency warning for high risk
  const emergencyWarning = seizureRisk === 'high' ? 
    "Your current risk factors suggest a high seizure risk. Consider contacting your healthcare provider immediately." : 
    undefined;
  
  return {
    epilepsyProbability: normalizedProbability,
    seizureType: seizureType?.name,
    seizureTypeId: seizureTypeId,
    seizureTypeDescription: seizureType?.description,
    seizureRisk,
    suggestedDosage,
    lifestyleSuggestions,
    emergencyWarning,
    confidenceLevel
  };
};

export const getSeizureTypeById = (id: string): string => {
  const seizureType = seizureTypes.find(s => s.id === id);
  return seizureType ? seizureType.name : 'Unknown';
};

export const getDrugNameById = (id: string): string => {
  const drug = drugInformation.find(d => d.id === id);
  return drug ? drug.name : 'Unknown';
};

// Get appropriate medications for a seizure type
export const getAppropriatemedications = (seizureTypeId: string) => {
  const seizureType = seizureTypes.find(s => s.id === seizureTypeId);
  if (!seizureType) return [];
  
  return drugInformation.filter(drug => 
    drug.forSeizureTypes.includes(seizureTypeId)
  );
};

// Convert camelCase to Title Case for display
export const camelToTitleCase = (text: string): string => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};
