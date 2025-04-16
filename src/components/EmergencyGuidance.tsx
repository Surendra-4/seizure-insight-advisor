
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { emergencyGuidance } from '@/data/epilepsyData';
import { AlertCircle } from "lucide-react";

const EmergencyGuidance: React.FC = () => {
  return (
    <div className="mt-8">
      <Card className="bg-red-50 border-emergency">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-emergency" />
            <CardTitle className="text-emergency">{emergencyGuidance.title}</CardTitle>
          </div>
          <CardDescription>{emergencyGuidance.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Steps to Take</h3>
              <ul className="list-disc pl-5 space-y-1">
                {emergencyGuidance.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
            
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Call Emergency Services (911) if:</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {emergencyGuidance.callEmergencyIf.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Important Don'ts</h3>
              <ul className="list-disc pl-5 space-y-1">
                {emergencyGuidance.doNotDo.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyGuidance;
