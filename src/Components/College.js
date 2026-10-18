import { useState } from "react";
import "./style.css";
import colleges from "./college.json";

function College() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  function searchCollege() {
    const input = search.trim().toLowerCase();

    if (input === "") {
      setResults([]);
      setMessage("Please enter your cut-off or type 'show colleges'.");
      return;
    }

    if (input === "show colleges") {
      const sorted = [...colleges].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setResults(sorted);
      setMessage("All Colleges");
      return;
    }

    const cutoff = Number(input);

    if (isNaN(cutoff)) {
      setResults([]);
      setMessage("Please enter a valid cut-off.");
      return;
    }

    const matching = colleges
      .filter((college) => Number(college.id) <= cutoff)
      .sort((a, b) => b.id - a.id);

    if (matching.length > 0) {
      setResults(matching);
      setMessage("Colleges Available");
    } else {
      setResults([]);
      setMessage("No colleges available for this cut-off.");
    }
  }

  function clearSearch() {
    setSearch("");
    setResults([]);
    setMessage("");
  }

  return (
    <>
      <h1 className="hehe">SEARCH IN ONE Web-Page!</h1>

      <div className="container">
        <h2>College Availability Finder</h2>

        <div className="search-panel">
          <div className="search-box">
            <input
              type="text"
              id="searchBox"
              aria-label="Cut-off or SHOW COLLEGES"
              placeholder="Cut-off / SHOW COLLEGES"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchCollege();
              }}
            />

            <button
              type="button"
              className="clear-btn"
              onClick={clearSearch}
              aria-label="Clear search"
              title="Clear search"
            >
              ✖
            </button>
          </div>

          <button
            type="button"
            className="search-btn"
            onClick={searchCollege}
          >
            Search
          </button>
        </div>

        <div id="result">
          {message && (
            <h3 className={results.length === 0 ? "not-found" : ""}>
              {message}
            </h3>
          )}

          {results.map((college) => (
            <div className="college-card" key={`${college.id}-${college.name}`}>
              <p>
                <strong>Cut-off Required:</strong> {college.id}
              </p>
              <p>
                <strong>College:</strong> {college.name}
              </p>
              <p>
                <strong>Location:</strong> {college.location}
              </p>
              <p>
                <strong>Course:</strong> {college.course}
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default College;