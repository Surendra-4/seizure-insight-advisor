
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AssessmentResult } from '@/utils/epilepsyUtils';
import { AlertCircle, CheckCircle, Info, Pill, Brain, Stethoscope, ShieldAlert, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResultsSummaryProps {
  result: AssessmentResult;
  patientDetails: {
    seizureType?: string;
    age: number;
    weight: number;
    medication?: string;
    gender?: string;
  };
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ result, patientDetails }) => {
  const { 
    epilepsyProbability, 
    seizureType, 
    seizureTypeDescription,
    seizureRisk, 
    suggestedDosage, 
    lifestyleSuggestions, 
    emergencyWarning,
    confidenceLevel
  } = result;
  
  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getConfidenceColor = (level: string) => {
    switch(level) {
      case 'high': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'moderate': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'low': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Early return if probability is below 60%
  if (epilepsyProbability < 60) {
    return (
      <div className="mt-8 space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Assessment Results</CardTitle>
              <Badge className="bg-gray-100 text-gray-800 border border-gray-300">
                <Info className="h-3.5 w-3.5 mr-1" />
                Low Epilepsy Probability
              </Badge>
            </div>
            <CardDescription>
              Based on the information you provided, we've assessed your condition.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-500" />
                Epilepsy Probability Assessment
              </h3>
              
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Epilepsy Probability</span>
                  <span className="font-bold">{epilepsyProbability.toFixed(1)}%</span>
                </div>
                <Progress value={epilepsyProbability} className="h-2 mb-4" />
                
                <p className="text-sm text-gray-700 mt-3">
                  Based on the information provided, the probability that your symptoms indicate epilepsy is below the threshold for a definitive assessment.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
                <h4 className="font-medium text-blue-900 mb-2">Recommendations:</h4>
                <ul className="space-y-2">
                  {lifestyleSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-blue-800 text-sm">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4">
              <Badge className={getConfidenceColor(confidenceLevel)}>
                <Info className="h-3.5 w-3.5 mr-1" />
                {confidenceLevel.charAt(0).toUpperCase() + confidenceLevel.slice(1)} Confidence Assessment
              </Badge>
              
              <p className="text-sm text-gray-600 mt-2">
                This assessment has a {confidenceLevel} confidence level based on the information provided. For a more accurate assessment, please consult with a healthcare provider.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Separator className="mb-4" />
            <p className="text-sm text-gray-500">
              <strong>Disclaimer:</strong> This assessment is not a substitute for professional medical advice.
              Always consult with your healthcare provider for proper diagnosis and treatment.
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Assessment Results</CardTitle>
            <Badge className={getRiskColor(seizureRisk)}>
              {seizureRisk === 'high' ? (
                <AlertCircle className="h-3.5 w-3.5 mr-1" />
              ) : seizureRisk === 'moderate' ? (
                <Info className="h-3.5 w-3.5 mr-1" />
              ) : (
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
              )}
              {seizureRisk.charAt(0).toUpperCase() + seizureRisk.slice(1)} Seizure Risk
            </Badge>
          </div>
          <CardDescription>
            Based on the information you provided, we've assessed your epilepsy status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {emergencyWarning && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700">{emergencyWarning}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-500" />
              Epilepsy Assessment
            </h3>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Epilepsy Probability</span>
                <span className="font-bold">{epilepsyProbability.toFixed(1)}%</span>
              </div>
              <Progress value={epilepsyProbability} className="h-2 mb-4" />
              
              {seizureType && (
                <div className="mt-4">
                  <h4 className="font-medium">Detected Seizure Type:</h4>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                      <Brain className="h-3.5 w-3.5 mr-1" />
                      {seizureType}
                    </Badge>
                  </div>
                  {seizureTypeDescription && (
                    <p className="text-sm text-gray-700 mt-3">
                      {seizureTypeDescription}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-blue-500" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="p-3 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-500">Age</span>
                <p className="font-medium">{patientDetails.age} years</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-500">Weight</span>
                <p className="font-medium">{patientDetails.weight} kg</p>
              </div>
              {patientDetails.gender && patientDetails.gender !== 'not-specified' && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <span className="text-sm text-gray-500">Gender</span>
                  <p className="font-medium">{patientDetails.gender.charAt(0).toUpperCase() + patientDetails.gender.slice(1)}</p>
                </div>
              )}
              {patientDetails.medication && (
                <div className="p-3 bg-gray-50 rounded-md md:col-span-2">
                  <span className="text-sm text-gray-500">Current Medication</span>
                  <p className="font-medium">{patientDetails.medication}</p>
                </div>
              )}
            </div>
          </div>
          
          {suggestedDosage && (
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Pill className="h-5 w-5 text-blue-500" />
                Medication Guidance
              </h3>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="font-medium text-blue-900">
                  {suggestedDosage.drug}: {suggestedDosage.dosage}
                </p>
                {suggestedDosage.warning && (
                  <p className="text-sm text-red-600 mt-2">{suggestedDosage.warning}</p>
                )}
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-blue-900">Potential Side Effects:</h4>
                  <ul className="text-sm text-blue-800 mt-1 space-y-1 pl-5 list-disc">
                    {suggestedDosage.sideEffects.map((effect, i) => (
                      <li key={i}>{effect}</li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-sm text-blue-700 mt-3">
                  Note: This is general guidance based on typical dosing ranges. 
                  Always follow your doctor's specific prescription.
                </p>
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-blue-500" />
              Lifestyle Recommendations
            </h3>
            <ul className="space-y-2">
              {lifestyleSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>{suggestion}</p>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4">
            <Badge className={getConfidenceColor(confidenceLevel)}>
              <Info className="h-3.5 w-3.5 mr-1" />
              {confidenceLevel.charAt(0).toUpperCase() + confidenceLevel.slice(1)} Confidence Assessment
            </Badge>
            
            <p className="text-sm text-gray-600 mt-2">
              This assessment has a {confidenceLevel} confidence level based on the information provided. 
              The accuracy of this prediction is based on the given inputs and the available data. 
              Please seek professional medical help for a complete diagnosis and treatment plan.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Separator className="mb-4" />
          <p className="text-sm text-gray-500">
            <strong>Disclaimer:</strong> This assessment is not a substitute for professional medical advice.
            Always consult with your healthcare provider before making any changes to your treatment plan.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsSummary;
