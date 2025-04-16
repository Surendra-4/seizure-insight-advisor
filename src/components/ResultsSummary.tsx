
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AssessmentResult } from '@/utils/epilepsyUtils';
import { AlertCircle, CheckCircle, Info } from "lucide-react";

interface ResultsSummaryProps {
  result: AssessmentResult;
  patientDetails: {
    seizureType: string;
    age: number;
    weight: number;
    medication: string;
  };
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ result, patientDetails }) => {
  const { seizureRisk, suggestedDosage, lifestyleSuggestions, emergencyWarning } = result;
  
  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
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
              {seizureRisk.charAt(0).toUpperCase() + seizureRisk.slice(1)} Risk
            </Badge>
          </div>
          <CardDescription>
            Based on the information you provided, we've assessed your current epilepsy management status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {emergencyWarning && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700">{emergencyWarning}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-medium mb-2">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="p-3 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-500">Age</span>
                <p className="font-medium">{patientDetails.age} years</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-500">Weight</span>
                <p className="font-medium">{patientDetails.weight} kg</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md md:col-span-2">
                <span className="text-sm text-gray-500">Seizure Type</span>
                <p className="font-medium">{patientDetails.seizureType}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md md:col-span-2">
                <span className="text-sm text-gray-500">Current Medication</span>
                <p className="font-medium">{patientDetails.medication}</p>
              </div>
            </div>
          </div>
          
          {suggestedDosage && (
            <div>
              <h3 className="text-lg font-medium mb-2">Medication Guidance</h3>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="font-medium text-blue-900">
                  {suggestedDosage.drug}: {suggestedDosage.dosage}
                </p>
                {suggestedDosage.warning && (
                  <p className="text-sm text-red-600 mt-2">{suggestedDosage.warning}</p>
                )}
                <p className="text-sm text-blue-700 mt-2">
                  Note: This is general guidance based on typical dosing ranges. 
                  Always follow your doctor's specific prescription.
                </p>
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-medium mb-2">Lifestyle Recommendations</h3>
            <ul className="space-y-2">
              {lifestyleSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>{suggestion}</p>
                </li>
              ))}
            </ul>
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
