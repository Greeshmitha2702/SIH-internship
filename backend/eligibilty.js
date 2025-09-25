function checkEligibility(userSkills, internshipSkills) {
  return internshipSkills.every(skill => userSkills.includes(skill));
}

// Example:
const userSkills = ["Civil Engineering", "AutoCAD"];
const internshipSkills = ["Python", "SQL"];

if (checkEligibility(userSkills, internshipSkills)) {
  console.log("✅ Eligible to apply");
} else {
  console.log("❌ Not eligible to apply");
}
