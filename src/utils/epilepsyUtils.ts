
import { seizureTypes, drugInformation, lifestyleFactors } from '../data/epilepsyData';

export interface EpilepticAssessment {
  age: number;
  weight: number;
  seizureTypeId: string;
  currentDrugId: string;
  currentDosage: number;
  missedDoses: boolean;
  stressLevel: number;
  sleepQuality: number;
  recentAlcohol: boolean;
  lightSensitivity: boolean;
  lastSeizureDate?: Date;
  comorbidities: string[];
}

export interface AssessmentResult {
  seizureRisk: 'low' | 'moderate' | 'high';
  suggestedDosage?: {
    drug: string;
    dosage: string;
    warning?: string;
  };
  lifestyleSuggestions: string[];
  emergencyWarning?: string;
}

export const calculateAssessmentResult = (assessment: EpilepticAssessment): AssessmentResult => {
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
  
  // Sleep quality affects risk (0-10 scale, 10 being excellent)
  if (assessment.sleepQuality < 3) {
    riskScore += 3;
    lifestyleSuggestions.push("Your sleep quality is poor. Prioritize sleep hygiene and consistent sleep patterns.");
  } else if (assessment.sleepQuality < 6) {
    riskScore += 1;
    lifestyleSuggestions.push("Try to improve your sleep quality by maintaining consistent sleep times and creating a restful environment.");
  }
  
  // Recent alcohol consumption increases risk
  if (assessment.recentAlcohol) {
    riskScore += 2;
    lifestyleSuggestions.push("Alcohol can lower seizure threshold and interact with medications. Consider avoiding alcohol.");
  }
  
  // Light sensitivity
  if (assessment.lightSensitivity) {
    riskScore += 1;
    lifestyleSuggestions.push("For photosensitive epilepsy, avoid triggers like flashing lights and use blue light filters on screens.");
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

  // Find current drug
  const drug = drugInformation.find(d => d.id === assessment.currentDrugId);
  let suggestedDosage;
  
  if (drug) {
    // This is a simplistic dosage suggestion - in reality, this would require advanced medical algorithms
    const seizureType = assessment.seizureTypeId;
    const isAppropriate = drug.forSeizureTypes.includes(seizureType);
    
    suggestedDosage = {
      drug: drug.name,
      dosage: drug.dosageRange,
      warning: !isAppropriate ? 
        `Note: ${drug.name} is not typically a first-choice medication for your seizure type. Consult your doctor.` : 
        undefined
    };
  }
  
  // Generate emergency warning for high risk
  const emergencyWarning = seizureRisk === 'high' ? 
    "Your current risk factors suggest a high seizure risk. Consider contacting your healthcare provider." : 
    undefined;
  
  return {
    seizureRisk,
    suggestedDosage,
    lifestyleSuggestions,
    emergencyWarning,
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
