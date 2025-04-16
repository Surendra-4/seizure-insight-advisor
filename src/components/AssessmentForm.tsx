
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { seizureTypes, drugInformation } from '@/data/epilepsyData';
import { EpilepticAssessment } from '@/utils/epilepsyUtils';

interface AssessmentFormProps {
  onSubmit: (assessment: EpilepticAssessment) => void;
}

const initialAssessment: EpilepticAssessment = {
  age: 30,
  weight: 70,
  seizureTypeId: '',
  currentDrugId: '',
  currentDosage: 0,
  missedDoses: false,
  stressLevel: 5,
  sleepQuality: 5,
  recentAlcohol: false,
  lightSensitivity: false,
  comorbidities: [],
};

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessment, setAssessment] = useState<EpilepticAssessment>(initialAssessment);
  const [date, setDate] = useState<string>("");
  
  const totalSteps = 3;
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setAssessment((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setAssessment((prev) => ({
      ...prev,
      [name]: value[0],
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setAssessment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setAssessment((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (e.target.value) {
      setAssessment((prev) => ({
        ...prev,
        lastSeizureDate: new Date(e.target.value),
      }));
    }
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(assessment);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Epilepsy Assessment</CardTitle>
        <CardDescription>
          Complete this assessment to receive personalized guidance for managing your epilepsy.
        </CardDescription>
        <div className="flex justify-between items-center mt-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full flex-1 ${
                index + 1 <= currentStep ? "bg-medical" : "bg-gray-200"
              } ${index > 0 ? "ml-1" : ""}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={assessment.age}
                    onChange={handleInputChange}
                    min="1"
                    max="120"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={assessment.weight}
                    onChange={handleInputChange}
                    min="1"
                    max="500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seizureTypeId">Type of Seizure / Epilepsy</Label>
                <Select 
                  value={assessment.seizureTypeId} 
                  onValueChange={(value) => handleSelectChange("seizureTypeId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select seizure type" />
                  </SelectTrigger>
                  <SelectContent>
                    {seizureTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {assessment.seizureTypeId && (
                  <p className="text-sm text-gray-500 mt-1">
                    {seizureTypes.find(t => t.id === assessment.seizureTypeId)?.description}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastSeizureDate">Date of Last Seizure (if known)</Label>
                <Input
                  type="date"
                  id="lastSeizureDate"
                  value={date}
                  onChange={handleDateChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="currentDrugId">Current Medication</Label>
                <Select 
                  value={assessment.currentDrugId} 
                  onValueChange={(value) => handleSelectChange("currentDrugId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select medication" />
                  </SelectTrigger>
                  <SelectContent>
                    {drugInformation.map((drug) => (
                      <SelectItem key={drug.id} value={drug.id}>
                        {drug.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {assessment.currentDrugId && (
                  <p className="text-sm text-gray-500 mt-1">
                    Brand names: {drugInformation.find(d => d.id === assessment.currentDrugId)?.brandNames.join(', ')}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentDosage">Current Daily Dosage (mg)</Label>
                <Input
                  id="currentDosage"
                  name="currentDosage"
                  type="number"
                  value={assessment.currentDosage || ''}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="missedDoses"
                  checked={assessment.missedDoses}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("missedDoses", checked as boolean)
                  }
                />
                <Label htmlFor="missedDoses">
                  Have you missed any medication doses in the past week?
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comorbidities">
                  Do you have any other medical conditions? (Optional)
                </Label>
                <Input
                  id="comorbidities"
                  placeholder="e.g., Hypertension, Diabetes, etc."
                  value={assessment.comorbidities.join(', ')}
                  onChange={(e) => {
                    const conditions = e.target.value
                      .split(',')
                      .map((item) => item.trim())
                      .filter((item) => item !== '');
                    setAssessment((prev) => ({
                      ...prev,
                      comorbidities: conditions,
                    }));
                  }}
                />
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="stressLevel">Current Stress Level</Label>
                  <span className="text-sm text-gray-500">
                    {assessment.stressLevel}/10
                  </span>
                </div>
                <Slider
                  id="stressLevel"
                  min={0}
                  max={10}
                  step={1}
                  value={[assessment.stressLevel]}
                  onValueChange={(value) => handleSliderChange("stressLevel", value)}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Low Stress</span>
                  <span>High Stress</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="sleepQuality">Sleep Quality (Last Week)</Label>
                  <span className="text-sm text-gray-500">
                    {assessment.sleepQuality}/10
                  </span>
                </div>
                <Slider
                  id="sleepQuality"
                  min={0}
                  max={10}
                  step={1}
                  value={[assessment.sleepQuality]}
                  onValueChange={(value) => handleSliderChange("sleepQuality", value)}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recentAlcohol"
                  checked={assessment.recentAlcohol}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("recentAlcohol", checked as boolean)
                  }
                />
                <Label htmlFor="recentAlcohol">
                  Have you consumed alcohol in the past 48 hours?
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lightSensitivity"
                  checked={assessment.lightSensitivity}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("lightSensitivity", checked as boolean)
                  }
                />
                <Label htmlFor="lightSensitivity">
                  Do you have photosensitivity (sensitivity to flashing lights)?
                </Label>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}
        {currentStep < totalSteps ? (
          <Button 
            onClick={handleNext} 
            disabled={currentStep === 1 && !assessment.seizureTypeId}
          >
            Next
          </Button>
        ) : (
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!assessment.currentDrugId}
          >
            Submit Assessment
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AssessmentForm;
