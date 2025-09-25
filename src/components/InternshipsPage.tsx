import React, { useEffect, useState } from "react";
import { getInternshipRecommendations } from "../lib/actions";

export default function InternshipsPage() {
  const [internships, setInternships] = useState<any[]>([]);

  useEffect(() => {
    getInternshipRecommendations()
      .then(data => setInternships(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Internships</h1>
      <pre>{JSON.stringify(internships, null, 2)}</pre>
    </div>
  );
}
