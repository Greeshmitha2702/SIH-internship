import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InternshipList from './components/InternshipList';
import ChatBot from './components/ChatBot';
import Cart from './components/Cart';
import ResumeUpload from './components/ResumeUpload';
import Profile from './components/Profile';
import { Internship, CartItem, UserProfile } from './types';
import { mockInternships } from './data/mockData';

type Page = 'home' | 'internships' | 'cart' | 'resume' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    skills: [],
    experience: '',
    resumeUploaded: false
  });
  const [recommendations, setRecommendations] = useState<Internship[]>(mockInternships);

  useEffect(() => {
    // Load saved data from localStorage
    const savedCart = localStorage.getItem('internshipCart');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      if (profile.skills.length > 0) {
        generateRecommendations(profile.skills);
      }
    }
  }, []);

  const addToCart = (internship: Internship) => {
    const existingItem = cartItems.find(item => item.id === internship.id);
    if (!existingItem) {
      const newCart = [...cartItems, { ...internship, savedAt: new Date() }];
      setCartItems(newCart);
      localStorage.setItem('internshipCart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = (id: string) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem('internshipCart', JSON.stringify(newCart));
  };

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    if (profile.skills.length > 0) {
      generateRecommendations(profile.skills);
    }
  };

  const generateRecommendations = (skills: string[]) => {
    // Simple recommendation algorithm based on skill matching
    const scored = mockInternships.map(internship => {
      const matchingSkills = internship.requiredSkills.filter(skill => 
        skills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
      );
      return {
        ...internship,
        matchScore: (matchingSkills.length / internship.requiredSkills.length) * 100
      };
    });
    
    const sorted = scored.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    setRecommendations(sorted);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onNavigate={setCurrentPage} />;
      case 'internships':
        return (
          <InternshipList 
            internships={recommendations}
            onAddToCart={addToCart}
            cartItems={cartItems}
          />
        );
      case 'cart':
        return <Cart items={cartItems} onRemove={removeFromCart} />;
      case 'resume':
        return <ResumeUpload onProfileUpdate={updateUserProfile} userProfile={userProfile} />;
      case 'profile':
        return <Profile profile={userProfile} onUpdate={updateUserProfile} />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        cartCount={cartItems.length}
      />
      
      <main className="pt-16">
        {renderCurrentPage()}
      </main>

      <ChatBot isOpen={isChatBotOpen} onClose={() => setIsChatBotOpen(false)} />
      
      {/* Chat Bot Toggle Button */}
      <button
        onClick={() => setIsChatBotOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
}

export default App;