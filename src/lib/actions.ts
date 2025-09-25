import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Type definition for internships
export interface Internship {
  id?: string;
  title: string;
  company: string;
  type: string;
  location: string;
  stipend?: string;
  duration?: string;
  requiredSkills?: string[];
  description?: string;
  matchScore?: number;
  applicationDeadline?: string;
  startDate?: string;
}

// Add new internship
export async function addInternship(data: Internship) {
  try {
    await addDoc(collection(db, "internships"), data);
    console.log("Internship added:", data.title);
  } catch (err) {
    console.error("Error adding internship:", err);
  }
}

// Fetch internships
export async function getInternshipRecommendations(): Promise<Internship[]> {
  try {
    const snapshot = await getDocs(collection(db, "internships"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Internship[];
  } catch (err) {
    console.error("Error fetching internships:", err);
    return [];
  }
}
