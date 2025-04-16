
import React from 'react';
import EpilepticAssessment from '@/components/EpilepticAssessment';
import { Brain, ShieldAlert, Stethoscope } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container px-4 py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Brain className="h-8 w-8 text-medical mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Seizure Insight Advisor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-gray-600 hover:text-medical flex items-center gap-1">
              <ShieldAlert className="h-4 w-4" />
              Emergency Info
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-medical flex items-center gap-1">
              <Stethoscope className="h-4 w-4" />
              Medical Resources
            </a>
          </div>
        </div>
      </header>
      
      <main className="container px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Epilepsy Assessment & Management Tool</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Complete the assessment below to receive personalized insights and recommendations for managing epilepsy.
            Our tool takes into account your specific seizure types, medication, and lifestyle factors.
          </p>
        </section>
        
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-medical" />
              </div>
              <h3 className="font-medium text-lg mb-2">Personalized Assessment</h3>
              <p className="text-gray-600 text-sm">
                Get insights tailored to your specific epilepsy type, medication, and personal factors.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                <ShieldAlert className="h-6 w-6 text-medical" />
              </div>
              <h3 className="font-medium text-lg mb-2">Seizure Risk Analysis</h3>
              <p className="text-gray-600 text-sm">
                Understand your current seizure risk level based on your lifestyle and medical factors.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-medical" />
              </div>
              <h3 className="font-medium text-lg mb-2">Medical Guidance</h3>
              <p className="text-gray-600 text-sm">
                Receive evidence-based recommendations for medication and lifestyle adjustments.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <EpilepticAssessment />
        </section>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
        <div className="container px-4">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool is for informational purposes only and is not a substitute for professional medical advice.
              Always consult with your healthcare provider regarding your epilepsy treatment.
            </p>
            <p>© {new Date().getFullYear()} Seizure Insight Advisor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
