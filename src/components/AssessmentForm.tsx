
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { seizureTypes, drugInformation, comorbidities, seizureTriggers } from '@/data/epilepsyData';
import { EpilepticAssessment } from '@/utils/epilepsyUtils';
import { 
  Brain, 
  PanelTop, 
  Pill, 
  Dna, 
  Sun, 
  HeartPulse, 
  MapPin, 
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  ZapOff,
  Activity,
  ThermometerSnowflake,
  Stethoscope,
  Map,
  UserCog
} from "lucide-react";
import { Textarea } from './ui/textarea';

interface AssessmentFormProps {
  onSubmit: (assessment: EpilepticAssessment) => void;
}

const initialAssessment: EpilepticAssessment = {
  age: 30,
  gender: 'not-specified',
  weight: 70,
  height: 170,
  seizureOnsetAge: '',
  seizureFrequency: '',
  hadStatusEpilepticus: false,
  familyHistoryEpilepsy: false,
  hadFebrileSeizures: false,
  brainTraumaHistory: false,
  surgicalIntervention: 'none',
  
  currentDrugs: [],
  timeSinceLastDose: '',
  missedDoses: false,
  drugResistance: '',
  drugSideEffects: '',
  
  geneticMutation: false,
  comorbidities: [],
  neurodevelopmentalCondition: false,
  
  sleepLast24H: '',
  caffeineAlcoholLast24H: false,
  stressLevel: 5,
  seizureTriggers: [],
  timeOfDay: '',
  weatherConditions: '',
  
  heartRate: undefined,
  bloodPressure: '',
  bloodGlucose: undefined,
  
  currentLocation: '',
  isAlone: false,
  hasHospitalAccess: true,
  hadEpisodeLast48H: false,
  postIctalSymptoms: [],
  
  mriEegResults: '',
  veegDiagnosis: false,
  petSpectResults: '',
  prolactinLevel: '',
};

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessment, setAssessment] = useState<EpilepticAssessment>(initialAssessment);
  const [date, setDate] = useState<string>("");
  
  const totalSteps = 7;
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setAssessment((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value,
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
  
  const handleMultiSelectChange = (name: string, value: string, checked: boolean) => {
    setAssessment((prev) => {
      let updatedValues = [...(prev[name] as string[] || [])];
      
      if (checked) {
        updatedValues.push(value);
      } else {
        updatedValues = updatedValues.filter(item => item !== value);
      }
      
      return {
        ...prev,
        [name]: updatedValues,
      };
    });
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
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(assessment);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Comprehensive Epilepsy Assessment</CardTitle>
        <CardDescription>
          Complete this assessment to receive personalized guidance for managing your epilepsy.
        </CardDescription>
        <div className="flex justify-between items-center mt-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full flex-1 ${
                index + 1 <= currentStep ? "bg-blue-600" : "bg-gray-200"
              } ${index > 0 ? "ml-1" : ""}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{getStepName(currentStep)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <PanelTop className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">Patient Medical History</h3>
              </div>

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
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={assessment.gender} 
                    onValueChange={(value) => handleSelectChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="not-specified">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={assessment.height}
                    onChange={handleInputChange}
                    min="50"
                    max="250"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seizureOnsetAge">Age of Seizure Onset</Label>
                <Select 
                  value={assessment.seizureOnsetAge} 
                  onValueChange={(value) => handleSelectChange("seizureOnsetAge", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select onset age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neonatal">Neonatal (first month)</SelectItem>
                    <SelectItem value="childhood">Childhood (1-12 years)</SelectItem>
                    <SelectItem value="adolescence">Adolescence (13-18 years)</SelectItem>
                    <SelectItem value="adulthood">Adulthood (19+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seizureFrequency">Frequency of Seizures</Label>
                <Select 
                  value={assessment.seizureFrequency} 
                  onValueChange={(value) => handleSelectChange("seizureFrequency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select seizure frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-daily">Multiple times per day</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly or less frequent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hadStatusEpilepticus"
                  checked={assessment.hadStatusEpilepticus}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("hadStatusEpilepticus", checked as boolean)
                  }
                />
                <Label htmlFor="hadStatusEpilepticus" className="text-sm leading-tight">
                  History of status epilepticus? <span className="text-gray-500 block">(Seizure lasting longer than 5 minutes or seizures without recovery between them)</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="familyHistoryEpilepsy"
                  checked={assessment.familyHistoryEpilepsy}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("familyHistoryEpilepsy", checked as boolean)
                  }
                />
                <Label htmlFor="familyHistoryEpilepsy">
                  Family history of epilepsy?
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hadFebrileSeizures"
                  checked={assessment.hadFebrileSeizures}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("hadFebrileSeizures", checked as boolean)
                  }
                />
                <Label htmlFor="hadFebrileSeizures" className="text-sm leading-tight">
                  History of febrile seizures? <span className="text-gray-500 block">(Seizures in childhood caused by fever)</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="brainTraumaHistory"
                  checked={assessment.brainTraumaHistory}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("brainTraumaHistory", checked as boolean)
                  }
                />
                <Label htmlFor="brainTraumaHistory">
                  History of brain trauma/injury?
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="surgicalIntervention">Surgical Interventions (if any)</Label>
                <Select 
                  value={assessment.surgicalIntervention} 
                  onValueChange={(value) => handleSelectChange("surgicalIntervention", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select surgical history" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="lobectomy">Lobectomy</SelectItem>
                    <SelectItem value="dbs">Deep Brain Stimulation (DBS)</SelectItem>
                    <SelectItem value="vns">Vagus Nerve Stimulation (VNS)</SelectItem>
                    <SelectItem value="rns">Responsive Neurostimulation (RNS)</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Pill className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">Medication Profile</h3>
              </div>
              
              <div>
                <Label htmlFor="currentDrugs" className="block mb-2">Current Anti-Epileptic Drugs (AEDs)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                  {drugInformation.map((drug) => (
                    <div className="flex items-center space-x-2" key={drug.id}>
                      <Checkbox
                        id={`drug-${drug.id}`}
                        checked={assessment.currentDrugs.includes(drug.id)}
                        onCheckedChange={(checked) => 
                          handleMultiSelectChange("currentDrugs", drug.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={`drug-${drug.id}`}>{drug.name}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="drug-none"
                      checked={assessment.currentDrugs.includes('none')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAssessment(prev => ({...prev, currentDrugs: ['none']}));
                        } else {
                          setAssessment(prev => ({...prev, currentDrugs: []}));
                        }
                      }}
                    />
                    <Label htmlFor="drug-none">None</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeSinceLastDose">Time Since Last Dose</Label>
                <Select 
                  value={assessment.timeSinceLastDose} 
                  onValueChange={(value) => handleSelectChange("timeSinceLastDose", value)}
                  disabled={assessment.currentDrugs.includes('none') || assessment.currentDrugs.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time since last dose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<6h">Less than 6 hours</SelectItem>
                    <SelectItem value="6-12h">6-12 hours</SelectItem>
                    <SelectItem value="12-24h">12-24 hours</SelectItem>
                    <SelectItem value=">24h">More than 24 hours</SelectItem>
                    <SelectItem value="not-applicable">Not applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="missedDoses"
                  checked={assessment.missedDoses}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("missedDoses", checked as boolean)
                  }
                  disabled={assessment.currentDrugs.includes('none') || assessment.currentDrugs.length === 0}
                />
                <Label htmlFor="missedDoses">
                  Have you missed any medication doses in the past week?
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="drugResistance">Drug Resistance Status</Label>
                <Select 
                  value={assessment.drugResistance} 
                  onValueChange={(value) => handleSelectChange("drugResistance", value)}
                  disabled={assessment.currentDrugs.includes('none') || assessment.currentDrugs.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select drug resistance status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="responsive">Responsive (drugs control seizures well)</SelectItem>
                    <SelectItem value="partially-responsive">Partially responsive (some seizure reduction)</SelectItem>
                    <SelectItem value="drug-resistant">Drug-resistant (little to no seizure reduction)</SelectItem>
                    <SelectItem value="not-applicable">Not applicable / Don't know</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="drugSideEffects">Side Effects Experienced from AEDs</Label>
                <Select 
                  value={assessment.drugSideEffects} 
                  onValueChange={(value) => handleSelectChange("drugSideEffects", value)}
                  disabled={assessment.currentDrugs.includes('none') || assessment.currentDrugs.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select side effects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="dizziness">Dizziness</SelectItem>
                    <SelectItem value="nausea">Nausea</SelectItem>
                    <SelectItem value="sleepiness">Sleepiness/Drowsiness</SelectItem>
                    <SelectItem value="cognitive">Cognitive effects (memory/focus issues)</SelectItem>
                    <SelectItem value="rash">Skin rash</SelectItem>
                    <SelectItem value="weight-changes">Weight changes</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="not-applicable">Not applicable</SelectItem>
                  </SelectContent>
                </Select>
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
          
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Dna className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">Genetic & Comorbidity Factors</h3>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="geneticMutation"
                  checked={assessment.geneticMutation}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("geneticMutation", checked as boolean)
                  }
                />
                <Label htmlFor="geneticMutation">
                  Known epilepsy-related genetic mutation?
                </Label>
              </div>
              
              <div>
                <Label htmlFor="comorbidities" className="block mb-2">Comorbidities</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                  {comorbidities.map((condition) => (
                    <div className="flex items-center space-x-2" key={condition.id}>
                      <Checkbox
                        id={`comorbidity-${condition.id}`}
                        checked={assessment.comorbidities.includes(condition.id)}
                        onCheckedChange={(checked) => 
                          handleMultiSelectChange("comorbidities", condition.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={`comorbidity-${condition.id}`} className="text-sm">
                        {condition.name}
                        {condition.description && <span className="text-xs text-gray-500 block">{condition.description}</span>}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="neurodevelopmentalCondition"
                  checked={assessment.neurodevelopmentalCondition}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("neurodevelopmentalCondition", checked as boolean)
                  }
                />
                <Label htmlFor="neurodevelopmentalCondition" className="text-sm leading-tight">
                  Neurodevelopmental conditions? <span className="text-gray-500 block">(Conditions that arise from disruptions in the development of the nervous system)</span>
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otherConditions">Other Medical Conditions (Optional)</Label>
                <Textarea
                  id="otherConditions"
                  placeholder="List any other conditions here"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">Lifestyle & Environmental Triggers</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sleepLast24H">Sleep in Last 24 Hours</Label>
                <Select 
                  value={assessment.sleepLast24H} 
                  onValueChange={(value) => handleSelectChange("sleepLast24H", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hours of sleep" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<4h">Less than 4 hours</SelectItem>
                    <SelectItem value="4–6h">4-6 hours</SelectItem>
                    <SelectItem value="6–8h">6-8 hours</SelectItem>
                    <SelectItem value=">8h">More than 8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="caffeineAlcoholLast24H"
                  checked={assessment.caffeineAlcoholLast24H}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("caffeineAlcoholLast24H", checked as boolean)
                  }
                />
                <Label htmlFor="caffeineAlcoholLast24H">
                  Consumed caffeine or alcohol in the last 24 hours?
                </Label>
              </div>
              
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
              
              <div>
                <Label htmlFor="seizureTriggers" className="block mb-2">Exposure to Seizure Triggers Recently</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                  {seizureTriggers.map((trigger) => (
                    <div className="flex items-center space-x-2" key={trigger.id}>
                      <Checkbox
                        id={`trigger-${trigger.id}`}
                        checked={assessment.seizureTriggers.includes(trigger.id)}
                        onCheckedChange={(checked) => 
                          handleMultiSelectChange("seizureTriggers", trigger.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={`trigger-${trigger.id}`} className="text-sm">
                        {trigger.name}
                        {trigger.description && <span className="text-xs text-gray-500 block">{trigger.description}</span>}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeOfDay">Time of Day</Label>
                <Select 
                  value={assessment.timeOfDay} 
                  onValueChange={(value) => handleSelectChange("timeOfDay", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time of day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6am-12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm-6pm)</SelectItem>
                    <SelectItem value="evening">Evening (6pm-12am)</SelectItem>
                    <SelectItem value="night">Night (12am-6am)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weatherConditions">Weather Conditions</Label>
                <Select 
                  value={assessment.weatherConditions} 
                  onValueChange={(value) => handleSelectChange("weatherConditions", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weather conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="cold">Cold</SelectItem>
                    <SelectItem value="humid">Humid</SelectItem>
                    <SelectItem value="stormy">Stormy</SelectItem>
                    <SelectItem value="moderate">Moderate/Pleasant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {currentStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <HeartPulse className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">Physiological & Body Metrics</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heartRate">Recent Heart Rate (if known)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="heartRate"
                    name="heartRate"
                    type="number"
                    value={assessment.heartRate || ''}
                    onChange={handleInputChange}
                    min="30"
                    max="220"
                    placeholder="Optional"
                    className="flex-1"
                  />
                  <span className="text-gray-500">bpm</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure (if known)</Label>
                <Input
                  id="bloodPressure"
                  name="bloodPressure"
                  type="text"
                  value={assessment.bloodPressure}
                  onChange={handleInputChange}
                  placeholder="e.g. 120/80 (Optional)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bloodGlucose">Blood Glucose Level (if known)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="bloodGlucose"
                    name="bloodGlucose"
                    type="number"
                    value={assessment.bloodGlucose || ''}
                    onChange={handleInputChange}
                    min="20"
                    max="600"
                    placeholder="Optional"
                    className="flex-1"
                  />
                  <span className="text-gray-500">mg/dL</span>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-md mt-4">
                <p className="text-sm text-blue-800">
                  Physiological data is optional but can help provide a more accurate assessment if available.
                </p>
              </div>
            </div>
          )}
          
          {currentStep === 6 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">Contextual and Behavioral Status</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentLocation">Current Location Type</Label>
                <Select 
                  value={assessment.currentLocation} 
                  onValueChange={(value) => handleSelectChange("currentLocation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="office">Office/Work</SelectItem>
                    <SelectItem value="school">School/University</SelectItem>
                    <SelectItem value="driving">Driving/In transit</SelectItem>
                    <SelectItem value="outdoors">Outdoors</SelectItem>
                    <SelectItem value="unknown">Unknown/Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isAlone"
                  checked={assessment.isAlone}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("isAlone", checked as boolean)
                  }
                />
                <Label htmlFor="isAlone">
                  Are you currently alone?
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasHospitalAccess"
                  checked={assessment.hasHospitalAccess}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("hasHospitalAccess", checked as boolean)
                  }
                />
                <Label htmlFor="hasHospitalAccess">
                  Do you have immediate access to hospital or AEDs nearby?
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hadEpisodeLast48H"
                  checked={assessment.hadEpisodeLast48H}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("hadEpisodeLast48H", checked as boolean)
                  }
                />
                <Label htmlFor="hadEpisodeLast48H">
                  Have you had a seizure episode in the past 48 hours?
                </Label>
              </div>
              
              <div>
                <Label htmlFor="postIctalSymptoms" className="block mb-2">Postictal Symptoms after Last Episode</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="postictal-headache"
                      checked={assessment.postIctalSymptoms?.includes('Headache')}
                      onCheckedChange={(checked) => 
                        handleMultiSelectChange("postIctalSymptoms", "Headache", checked as boolean)
                      }
                    />
                    <Label htmlFor="postictal-headache">Headache</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="postictal-fatigue"
                      checked={assessment.postIctalSymptoms?.includes('Fatigue')}
                      onCheckedChange={(checked) => 
                        handleMultiSelectChange("postIctalSymptoms", "Fatigue", checked as boolean)
                      }
                    />
                    <Label htmlFor="postictal-fatigue">Fatigue</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="postictal-confusion"
                      checked={assessment.postIctalSymptoms?.includes('Confusion')}
                      onCheckedChange={(checked) => 
                        handleMultiSelectChange("postIctalSymptoms", "Confusion", checked as boolean)
                      }
                    />
                    <Label htmlFor="postictal-confusion">Confusion</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="postictal-aphasia"
                      checked={assessment.postIctalSymptoms?.includes('Aphasia')}
                      onCheckedChange={(checked) => 
                        handleMultiSelectChange("postIctalSymptoms", "Aphasia", checked as boolean)
                      }
                    />
                    <Label htmlFor="postictal-aphasia">Aphasia (speech issues)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="postictal-automatisms"
                      checked={assessment.postIctalSymptoms?.includes('Automatisms')}
                      onCheckedChange={(checked) => 
                        handleMultiSelectChange("postIctalSymptoms", "Automatisms", checked as boolean)
                      }
                    />
                    <Label htmlFor="postictal-automatisms">Automatisms (lip smacking, hand movements)</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 7 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <FlaskConical className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">Advanced Diagnostic Information <span className="text-sm font-normal text-gray-500">(Optional)</span></h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mriEegResults">Recent MRI or EEG Results</Label>
                <Select 
                  value={assessment.mriEegResults} 
                  onValueChange={(value) => handleSelectChange("mriEegResults", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select results" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="abnormal">Abnormal</SelectItem>
                    <SelectItem value="not-available">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="veegDiagnosis"
                  checked={assessment.veegDiagnosis}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("veegDiagnosis", checked as boolean)
                  }
                />
                <Label htmlFor="veegDiagnosis">
                  vEEG diagnosis (if any)?
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="petSpectResults">PET or SPECT Scan Results</Label>
                <Select 
                  value={assessment.petSpectResults} 
                  onValueChange={(value) => handleSelectChange("petSpectResults", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select results" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abnormal glucose metabolism">Abnormal Glucose Metabolism</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="not-available">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prolactinLevel">Prolactin Level Post-Seizure (if ever tested)</Label>
                <Select 
                  value={assessment.prolactinLevel} 
                  onValueChange={(value) => handleSelectChange("prolactinLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elevated">Elevated</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="not-available">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-md mt-6">
                <p className="text-sm text-gray-700">
                  This completes your epilepsy assessment. Please review your information before submitting.
                </p>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
        ) : (
          <div></div>
        )}
        {currentStep < totalSteps ? (
          <Button onClick={handleNext} className="flex items-center gap-1">
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            type="submit" 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Submit Assessment
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

function getStepName(step: number): string {
  switch (step) {
    case 1: return "Medical History";
    case 2: return "Medication";
    case 3: return "Comorbidities";
    case 4: return "Lifestyle";
    case 5: return "Physiology";
    case 6: return "Context";
    case 7: return "Advanced";
    default: return "";
  }
}

export default AssessmentForm;
