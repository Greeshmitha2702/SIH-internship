import React, { useEffect, useState } from "react";
import { getInternshipRecommendations, addInternship, Internship } from "../lib/actions";

export default function InternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch on mount
  useEffect(() => {
    refreshInternships();
  }, []);

  const refreshInternships = async () => {
    setLoading(true);
    const data = await getInternshipRecommendations();
    setInternships(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    await addInternship({
      title: "Test PM Intern",
      company: "Test Company",
      type: "Remote",
      location: "Mumbai",
      stipend: "₹5,000/month",
      duration: "2 months",
      requiredSkills: ["PM"],
      description: "Test description",
      matchScore: 70,
      applicationDeadline: "2025-10-10",
      startDate: "2025-10-20"
    });
    await refreshInternships();
  };

  if (loading) return <div>Loading internships...</div>;

  return (
    <div style={{ padding: "16px" }}>
      <h1>Internships</h1>
      <button onClick={handleAdd} style={{ margin: "16px 0", padding: "8px 16px" }}>
        ➕ Add Internship
      </button>

      {internships.length === 0 && <p>No internships found</p>}
      <ul>
        {internships.map(i => (
          <li key={i.id} style={{ marginBottom: "12px" }}>
            <strong>{i.title}</strong> — {i.company} ({i.type})<br />
            {i.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
