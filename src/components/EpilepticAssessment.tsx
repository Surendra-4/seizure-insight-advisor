
import React, { useState } from 'react';
import AssessmentForm from './AssessmentForm';
import ResultsSummary from './ResultsSummary';
import EmergencyGuidance from './EmergencyGuidance';
import { EpilepticAssessment as AssessmentType, calculateAssessmentResult, getSeizureTypeById, getDrugNameById } from '@/utils/epilepsyUtils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EpilepticAssessment: React.FC = () => {
  const [assessment, setAssessment] = useState<AssessmentType | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  const handleAssessmentSubmit = (data: AssessmentType) => {
    setAssessment(data);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleReset = () => {
    setAssessment(null);
    setShowResults(false);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {showResults && assessment ? (
        <>
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-1" 
            onClick={handleReset}
          >
            <ArrowLeft className="h-4 w-4" /> Start New Assessment
          </Button>
          <ResultsSummary 
            result={calculateAssessmentResult(assessment)}
            patientDetails={{
              seizureType: getSeizureTypeById(assessment.seizureTypeId),
              age: assessment.age,
              weight: assessment.weight,
              medication: getDrugNameById(assessment.currentDrugId),
            }}
          />
          <EmergencyGuidance />
        </>
      ) : (
        <AssessmentForm onSubmit={handleAssessmentSubmit} />
      )}
    </div>
  );
};

export default EpilepticAssessment;
