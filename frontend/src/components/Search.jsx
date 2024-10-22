import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplaySearch from "./DisplaySearch";

function Search({ toggleAccount }) {
  const [searchResults, setSearchResults] = useState([]);
  const [starredRepos, setStarredRepos] = useState([]);

  const fetchStarredRepos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/lakhwinder/repositories"
      );
      setStarredRepos(response.data);
    } catch (error) {
      console.error("Error fetching starred repositories", error);
    }
  };

  useEffect(() => {
    fetchStarredRepos();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <SearchComponent
        setSearchResults={setSearchResults}
        searchResults={searchResults}
        starredRepos={starredRepos}
        setStarredRepos={setStarredRepos}
        toggleAccount={toggleAccount}
        fetchStarredRepos={fetchStarredRepos}
      />
    </div>
  );
}

const SearchComponent = ({
  searchResults,
  setSearchResults,
  starredRepos,
  setStarredRepos,
  toggleAccount,
  fetchStarredRepos,
}) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState("");
  const [label, setLabel] = useState("");
  const [minStars, setMinStars] = useState("");
  const [minForks, setMinForks] = useState("");
  const [sort, setSort] = useState("stars");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    handleSearch(1);
  };

  const handleSearch = async (newPage) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search?q=${query}&sort=${sort}&page=${newPage}&language=${language}&label=${label}&minStars=${minStars}&minForks=${minForks}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    handleSearch(nextPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      handleSearch(prevPage);
    }
  };

  const handleStarRepo = async (repo) => {
    const isStarred = starredRepos.find(
      (starredRepo) => starredRepo.id === repo.id
    );

    if (!isStarred) {
      // Create a new repository object based on the schema
      const newRepo = {
        name: repo.name,
        url: repo.url,
        description: repo.description,
        stars: repo.stars,
        forks: repo.forks,
        language: repo.language,
        labels: repo.labels || [], // Ensure labels are an array, default to empty if not present
        avatar: repo.owner?.avatar_url || "default-avatar-url.jpg", // Use avatar_url or a default placeholder
        id: repo.id, // Use the existing repo's ID
      };

      setStarredRepos([...starredRepos, newRepo]);

      try {
        await axios.post(
          "http://localhost:5000/api/users/lakhwinder/repositories",
          newRepo
        );
        fetchStarredRepos();
      } catch (error) {
        console.error("Error starring repository", error);
      }
    } else {
      const updatedStarredRepos = starredRepos.filter(
        (starredRepo) => starredRepo.id !== repo.id
      );
      setStarredRepos(updatedStarredRepos);
    }
  };

  return (
    <div>
      <DisplaySearch
        toggleAccount={toggleAccount}
        handleFormSubmit={handleFormSubmit}
        setQuery={setQuery}
        query={query}
        setLanguage={setLanguage}
        language={language}
        setSort={setSort}
        sort={sort}
        setMinForks={setMinForks}
        minForks= {minForks}
        minStars={minStars}
        setMinStars={setMinStars}
        searchResults={searchResults}
        label = {label}
        setLabel={setLabel}
        handleStarRepo={handleStarRepo}
        page = {page}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        starredRepos={starredRepos}
      />
      <div className={`${toggleAccount ? "hidden": ""}`}>
        <h2 className="text-2xl font-bold mb-4">Starred Repositories</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {starredRepos.map((repo, index) => (
            <li
              key={index}
              className="border p-4 rounded-md shadow-md relative"
            >
              <button
                className={`absolute top-2 right-2 p-2 rounded-full bg-yellow-500 hover:bg-yellow-400 transition`}
                onClick={() => handleStarRepo(repo)}
              >
                ⭐
              </button>
              <h3 className="text-xl font-semibold">{repo.name}</h3>
              {/* Assuming the avatar image is stored in repo.owner.avatar_url */}
              <img
                src={repo.avatar}
                alt={repo.name}
                className="w-16 h-16 rounded-full mt-2"
              />
              <p className="mt-2">{repo.description}</p>
              <p className="mt-2">
                <strong>Stars:</strong> {repo.stars}
              </p>
              <p className="mt-1">
                <strong>Forks:</strong> {repo.forks}
              </p>
              <p className="mt-1">
                <strong>Language:</strong> {repo.language}
              </p>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 block"
              >
                View on GitHub
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
