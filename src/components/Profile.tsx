import React, { useState } from 'react';
import { User, Mail, Award, Briefcase, Edit3, Save, X } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const experienceLevels = [
    'No experience',
    'Some coursework',
    '1-6 months',
    '6-12 months',
    '1+ years'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
          <p className="text-gray-600">
            Manage your personal information and preferences for better internship matching
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="text-white">
                  <h2 className="text-xl font-semibold">
                    {profile.name || 'Your Name'}
                  </h2>
                  <p className="opacity-90">
                    {profile.email || 'your.email@example.com'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200 flex items-center space-x-2"
              >
                <Edit3 size={16} />
                <span>Edit</span>
              </button>
            </div>
          </div>

          <div className="p-8">
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <X size={16} />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">
                        {profile.email || 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Experience Level</p>
                      <p className="font-medium text-gray-900">
                        {profile.experience || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <Award className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-600">Resume Status</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      profile.resumeUploaded ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                      profile.resumeUploaded ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {profile.resumeUploaded ? 'Resume uploaded' : 'No resume uploaded'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Skills</h2>
          
          {profile.skills.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {profile.skills.map(skill => (
                <div
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between group"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-blue-600 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
              <p className="text-gray-600 mb-4">Upload your resume to automatically extract your skills</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Upload Resume
              </button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {profile.skills.length}
            </div>
            <div className="text-gray-600">Skills Identified</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {profile.resumeUploaded ? '1' : '0'}
            </div>
            <div className="text-gray-600">Resume Uploaded</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {profile.skills.length > 0 ? Math.min(profile.skills.length * 2, 20) : 0}
            </div>
            <div className="text-gray-600">Matched Internships</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;