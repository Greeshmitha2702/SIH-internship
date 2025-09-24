import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Brain, X } from 'lucide-react';
import { UserProfile } from '../types';

interface ResumeUploadProps {
  onProfileUpdate: (profile: UserProfile) => void;
  userProfile: UserProfile;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onProfileUpdate, userProfile }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const commonPMSkills = [
    'Product Strategy', 'Data Analysis', 'User Research', 'A/B Testing',
    'SQL', 'Analytics', 'Agile Methodologies', 'Scrum', 'Wireframing',
    'Market Research', 'Customer Journey Mapping', 'Product Roadmapping',
    'Stakeholder Management', 'Cross-functional Collaboration', 'KPI Tracking',
    'User Experience Design', 'Business Intelligence', 'Product Marketing',
    'Competitive Analysis', 'Feature Prioritization'
  ];

  const simulateSkillExtraction = (fileName: string): string[] => {
    // Simulate AI-powered skill extraction
    const possibleSkills = [...commonPMSkills];
    const numSkills = Math.floor(Math.random() * 8) + 4; // 4-12 skills
    const skills: string[] = [];
    
    for (let i = 0; i < numSkills; i++) {
      const randomIndex = Math.floor(Math.random() * possibleSkills.length);
      skills.push(possibleSkills.splice(randomIndex, 1)[0]);
    }
    
    return skills;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadedFile(file);
    setAnalysisComplete(false);

    // Simulate upload and processing
    setTimeout(() => {
      const skills = simulateSkillExtraction(file.name);
      setExtractedSkills(skills);
      setIsUploading(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const handleSaveProfile = () => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      skills: extractedSkills,
      resumeUploaded: true,
      resumeText: `Resume content for ${uploadedFile?.name}`
    };
    onProfileUpdate(updatedProfile);
  };

  const handleSkillToggle = (skill: string) => {
    setExtractedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const removeFile = () => {
    setUploadedFile(null);
    setExtractedSkills([]);
    setAnalysisComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analysis</h1>
          <p className="text-gray-600">
            Upload your resume to get AI-powered skill extraction and personalized internship recommendations
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          {!uploadedFile ? (
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Resume</h3>
                  <p className="text-gray-600">
                    Supported formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Choose File
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">{uploadedFile.name}</h3>
                    <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Processing Indicator */}
              {isUploading && (
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-6 w-6 text-blue-600 animate-pulse" />
                    <div>
                      <h4 className="font-medium text-blue-900">AI Analysis in Progress</h4>
                      <p className="text-blue-700 text-sm">Extracting skills and analyzing your experience...</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              )}

              {/* Analysis Complete */}
              {analysisComplete && (
                <div className="bg-green-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900">Analysis Complete!</h4>
                      <p className="text-green-700 text-sm">We've identified {extractedSkills.length} relevant skills from your resume</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Extracted Skills */}
        {extractedSkills.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Extracted Skills
              <span className="text-sm font-normal text-gray-600 ml-2">
                (Click to toggle skills)
              </span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {extractedSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200 text-left"
                >
                  {skill}
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Add Additional Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {commonPMSkills
                  .filter(skill => !extractedSkills.includes(skill))
                  .slice(0, 12)
                  .map(skill => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-200 text-left"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleSaveProfile}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
              >
                Save Skills & Get Recommendations
              </button>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Upload Your Resume?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex space-x-3">
              <Brain className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1">AI-Powered Analysis</h3>
                <p className="text-gray-600 text-sm">Advanced algorithms extract relevant skills and experience from your resume</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Personalized Matching</h3>
                <p className="text-gray-600 text-sm">Get internships ranked by compatibility with your profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;