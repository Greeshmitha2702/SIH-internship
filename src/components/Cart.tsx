import React from 'react';
import { Trash2, ExternalLink, Calendar, MapPin, DollarSign } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Internships</h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? 'internship' : 'internships'} saved for later
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved internships yet</h3>
            <p className="text-gray-600 mb-6">Start exploring internships and save the ones you're interested in!</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Browse Internships
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-blue-600 font-medium text-lg">{item.company}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                        <ExternalLink size={20} />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign size={16} />
                      <span className="text-sm">{item.stipend}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">Apply by {new Date(item.applicationDeadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.requiredSkills.map(skill => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Saved {new Date(item.savedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.type === 'Remote' ? 'bg-green-100 text-green-800' :
                        item.type === 'Hybrid' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-sm text-gray-600">{item.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Steps</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Review application deadlines and prioritize accordingly</li>
              <li>• Tailor your resume and cover letter for each position</li>
              <li>• Research each company's culture and recent product launches</li>
              <li>• Practice common PM interview questions and case studies</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;