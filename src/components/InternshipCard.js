import React from "react";

function InternshipCard({ internship, user }) {
  const canApply = (user) => {
    if (!user.certificates || user.certificates.length === 0) return false;
    if (user.marks < 60) return false;
    if (!user.graduationYear || user.graduationYear > new Date().getFullYear())
      return false;
    // Add other eligibility checks here (age, citizenship, etc.)
    return true;
  };

  return (
    <div className="internship-card">
      <h3>{internship.title}</h3>
      <p>{internship.description}</p>
      <button disabled={!canApply(user)}>
        {canApply(user) ? "Apply for Internship" : "Not Eligible"}
      </button>
    </div>
  );
}

export default InternshipCard;
