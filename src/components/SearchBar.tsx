import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        margin: "1rem 0",
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        style={{
          flex: 1,
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          backgroundColor: "#ff8fab", // pastel pink from your palette
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
