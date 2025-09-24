export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  duration: string;
  stipend: string;
  description: string;
  requiredSkills: string[];
  applicationDeadline: string;
  startDate: string;
  matchScore?: number;
  logo?: string;
}

export interface CartItem extends Internship {
  savedAt: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  skills: string[];
  experience: string;
  resumeUploaded: boolean;
  resumeText?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}