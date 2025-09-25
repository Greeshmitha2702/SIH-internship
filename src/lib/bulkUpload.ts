import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

interface Internship {
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

// Load JSON dynamically
const loadInternships = async (): Promise<Internship[]> => {
  const data = await import("./internships.json"); // remove `{ assert: ... }`
  return data.default as Internship[];
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const uploadBulkData = async () => {
  const internships = await loadInternships();
  console.log(`Uploading ${internships.length} internships...`);

  for (let i = 0; i < internships.length; i++) {
    const internship = internships[i];
    try {
      await addDoc(collection(db, "internships"), internship);
      console.log(`[${i + 1}/${internships.length}] Uploaded: ${internship.title} (${internship.company})`);
    } catch (err) {
      console.error(`Error uploading ${internship.title}:`, err);
    }
    await delay(100);
  }

  console.log("✅ Bulk upload completed!");
};

uploadBulkData();
