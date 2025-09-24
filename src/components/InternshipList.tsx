import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Calendar, Heart, Plus } from 'lucide-react';
import { Internship, CartItem } from '../types';

interface InternshipListProps {
  internships: Internship[];
  onAddToCart: (internship: Internship) => void;
  cartItems: CartItem[];
}

const InternshipList: React.FC<InternshipListProps> = ({ internships, onAddToCart, cartItems }) => {
  const [filter, setFilter] = useState<'all' | 'remote' | 'on-site' | 'hybrid'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'deadline' | 'stipend'>('relevance');

  const filteredInternships = internships.filter(internship => {
    if (filter === 'all') return true;
    return internship.type.toLowerCase().replace('-', '') === filter.replace('-', '');
  });

  const sortedInternships = [...filteredInternships].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
      case 'stipend':
        const aStipend = parseInt(a.stipend.replace(/[^\d]/g, ''));
        const bStipend = parseInt(b.stipend.replace(/[^\d]/g, ''));
        return bStipend - aStipend;
      default:
        return (b.matchScore || 0) - (a.matchScore || 0);
    }
  });

  const isInCart = (internshipId: string) => {
    return cartItems.some(item => item.id === internshipId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product Manager Internships
          </h1>
          <p className="text-gray-600">
            Discover {internships.length} PM internships matched to your profile
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Filter by type:</span>
              {['all', 'remote', 'on-site', 'hybrid'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === type
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } border`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="deadline">Deadline</option>
                <option value="stipend">Stipend</option>
              </select>
            </div>
          </div>
        </div>

        {/* Internship Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedInternships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {internship.title}
                      </h3>
                      {internship.matchScore && internship.matchScore > 70 && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          {Math.round(internship.matchScore)}% match
                        </span>
                      )}
                    </div>
                    <p className="text-blue-600 font-medium mb-3">{internship.company}</p>
                  </div>
                  
                  <button
                    onClick={() => onAddToCart(internship)}
                    disabled={isInCart(internship.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isInCart(internship.id)
                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                    }`}
                  >
                    {isInCart(internship.id) ? <Heart size={20} fill="currentColor" /> : <Plus size={20} />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      internship.type === 'Remote' ? 'bg-green-100 text-green-800' :
                      internship.type === 'Hybrid' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {internship.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign size={16} />
                    <span>{internship.stipend}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {internship.description}
                </p>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {internship.requiredSkills.map(skill => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Apply by {new Date(internship.applicationDeadline).toLocaleDateString()}</span>
                  </div>
                  <div className="text-gray-500">
                    Starts {new Date(internship.startDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedInternships.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No internships found</div>
            <p className="text-gray-600">Try adjusting your filters or upload your resume for better matches</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipList;