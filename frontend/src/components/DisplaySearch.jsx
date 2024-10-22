import React from 'react'

export default function DisplaySearch({toggleAccount, handleFormSubmit, setQuery,query,language, setLanguage, setSort, sort, minForks, minStars,setMinForks,  setMinStars, searchResults, handleStarRepo, handlePreviousPage, handleNextPage, label, setLabel, page, starredRepos  }) {
  return (
    <div className={`mb-8 ${toggleAccount ? "" : "hidden"}`}>
        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Search for repositories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <div className="flex flex-col">
            <label className="font-semibold">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Languages</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="go">Go</option>
              <option value="ruby">Ruby</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Sort By:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
              <option value="updated">Recently Updated</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="e.g., good-first-issue"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Minimum Stars"
            value={minStars}
            onChange={(e) => setMinStars(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Minimum Forks"
            value={minForks}
            onChange={(e) => setMinForks(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>

        {searchResults.length === 0 ? (
          <p className="text-center">No results found.</p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Repository Results</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((repo, index) => (
                <li
                  key={index}
                  className="border p-4 rounded-md shadow-md relative"
                >
                  <button
                    className={`absolute top-2 right-2 p-2 rounded-full ${
                      starredRepos.find(
                        (starredRepo) => starredRepo._id === repo.id
                      )
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                    } hover:bg-yellow-400 transition`}
                    onClick={() => handleStarRepo(repo)}
                  >
                    ⭐
                  </button>
                  <h3 className="text-xl font-semibold">{repo.name}</h3>
                  {/* Assuming the avatar image is stored in repo.owner.avatar_url */}
                  <img
                    src={repo.owner?.avatar_url || "default-avatar-url.jpg"}
                    alt={repo.name}
                    className="w-16 h-16 rounded-full mt-2"
                  />
                  <p className="mt-2">{repo.description}</p>
                  <p className="mt-2">
                    <strong>Stars:</strong> {repo.stargazers_count}
                  </p>
                  <p className="mt-1">
                    <strong>Forks:</strong> {repo.forks}
                  </p>
                  <p className="mt-1">
                    <strong>Language:</strong> {repo.language}
                  </p>
                  <a
                    href={repo.html_url}
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
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition"
          >
            Next
          </button>
        </div>
      </div>
  )
}
