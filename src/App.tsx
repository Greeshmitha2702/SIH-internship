<<<<<<< HEAD
=======
import React, { useState, useEffect } from 'react';
import LoginPage from './components/Auth/LoginPage';
import Header from './components/Header';
import Hero from './components/Hero';
import InternshipList from './components/InternshipList';
import ChatBot from './components/ChatBot';
import Cart from './components/Cart';
import ResumeUpload from './components/ResumeUpload';
import Profile from './components/Profile';
import { useAuth } from './hooks/useAuth';
import { Internship, CartItem, UserProfile } from './types';
import { mockInternships } from './data/mockData';
import SearchBar from "./components/SearchBar";

type Page = 'home' | 'internships' | 'cart' | 'resume' | 'profile';

function App() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: user?.name || '',
    email: user?.email || '',
    skills: [],
    experience: '',
    resumeUploaded: false
  });

  // 🔹 recommendations and filtered internships
  const [recommendations, setRecommendations] = useState<Internship[]>(mockInternships);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>(mockInternships);

  // Update user profile when user changes
  useEffect(() => {
    if (user) {
      setUserProfile(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  useEffect(() => {
    // Only load data if user is authenticated
    if (isAuthenticated) {
      const savedCart = localStorage.getItem('internshipCart');
      const savedProfile = localStorage.getItem('userProfile');
      
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setUserProfile(prev => ({ ...prev, ...profile }));
        if (profile.skills.length > 0) {
          generateRecommendations(profile.skills);
        }
      }
    }
  }, [isAuthenticated]);

  // Whenever recommendations change, reset filteredInternships
  useEffect(() => {
    setFilteredInternships(recommendations);
  }, [recommendations]);

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

  // 🔹 Search handler
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredInternships(recommendations);
    } else {
      setFilteredInternships(
        recommendations.filter((internship) =>
          internship.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading InternAI</h2>
          <p className="text-gray-600">Please wait while we set up your experience...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={login} isLoading={isLoading} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onNavigate={setCurrentPage} />;

      case 'internships':
        return (
          <div className="px-4">
            {/* 🔹 Add the SearchBar here */}
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search internships..."
            />
            <InternshipList 
              internships={filteredInternships} // 🔹 use filtered list here
              onAddToCart={addToCart}
              cartItems={cartItems}
            />
          </div>
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
        user={user}
        onLogout={logout}
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
>>>>>>> 522d2504bdaa0d8ebc58b7397b104d78b8f00584
