import { useState } from "react";
import { searchUsers } from "../api/userAPI";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 1) {
      try {
        const res = await searchUsers(value);
        if (res.success) {
          setResults(res.users);
          setShowDropdown(true);
        } else setResults([]);
      } catch (err) {
        console.error("❌ Search error:", err);
      }
    } else {
      setShowDropdown(false);
      setResults([]);
    }
  };

  return (
    <div className="relative w-full md:w-64">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search users..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {showDropdown && (
        <ul className="absolute left-0 right-0 bg-white shadow-lg border rounded-lg mt-1 z-50 max-h-48 overflow-y-auto">
          {results.length > 0 ? (
            results.map((user) => (
              <li
                key={user._id}
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                  setQuery("");
                  setShowDropdown(false);
                }}
                className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
              >
                {user.username || user.name} — {user.email}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-gray-500">
              No users found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
