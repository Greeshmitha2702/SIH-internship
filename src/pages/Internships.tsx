import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

const internships = [
  { id: 1, title: "Frontend Developer" },
  { id: 2, title: "Backend Developer" },
  { id: 3, title: "UI/UX Designer" },
];

const Internships: React.FC = () => {
  const [filtered, setFiltered] = useState(internships);

  const handleSearch = (query: string) => {
    if (!query) {
      setFiltered(internships);
      return;
    }
    setFiltered(
      internships.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Internships</h1>
      <SearchBar onSearch={handleSearch} placeholder="Search internships..." />
      <ul>
        {filtered.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Internships;
