
import React, { useState } from 'react';
import AssessmentForm from './AssessmentForm';
import ResultsSummary from './ResultsSummary';
import EmergencyGuidance from './EmergencyGuidance';
import { EpilepticAssessment as AssessmentType, calculateAssessmentResult } from '@/utils/epilepsyUtils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Printer } from 'lucide-react';

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
  
  const handlePrintResults = () => {
    window.print();
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {showResults && assessment ? (
        <>
          <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-1" 
              onClick={handleReset}
            >
              <ArrowLeft className="h-4 w-4" /> Start New Assessment
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={handlePrintResults}
              >
                <Printer className="h-4 w-4" /> Print Results
              </Button>
            </div>
          </div>
          
          <ResultsSummary 
            result={calculateAssessmentResult(assessment)}
            patientDetails={{
              seizureType: assessment.seizureTypeId ? undefined : undefined,
              age: assessment.age,
              weight: assessment.weight,
              medication: assessment.currentDrugs?.join(', ') || undefined,
              gender: assessment.gender
            }}
          />
          
          <div className="mt-8">
            <EmergencyGuidance />
          </div>
        </>
      ) : (
        <AssessmentForm onSubmit={handleAssessmentSubmit} />
      )}
    </div>
  );
};

export default EpilepticAssessment;
