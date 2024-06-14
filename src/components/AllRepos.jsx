import { useContext, useState } from "react";
import GitHubContext from "../hooks/GithubContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import SearchInput from "./SearchInput"
import { LuListFilter } from "react-icons/lu";

const AllRepos = () => {
  const {
    repos,
    handleForkedFilter,
    handleOldestFilter,
    clearFilter,
    loading,
  } = useContext(GitHubContext);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filteredRepos, setFilteredRepos] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isForkedFilter, setIsForkedFilter] = useState(false); // New state to track forked filter
  const reposPerPage = 9;

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  // Filter repositories based on search query
  const filterRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentRepos = filterRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    scrollToTop();
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    scrollToTop();
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions((prevState) => !prevState);
  };

  const handleOldestFilterClick = () => {
    handleOldestFilter();
  };

  const handleForkedFilterClick = () => {
    handleForkedFilter();
  };

  const clearFilterClick = () => {
    clearFilter();
    setFilteredRepos(null);
    setShowFilterOptions(false);
     setIsForkedFilter(false);
  };

  // Function to handle search input change
  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <div className="px-[5rem] xs:px-[2rem] sm:px-[2rem] md:px-[2rem] py-[3rem] xs:py-[2rem] flex flex-col gap-[3rem] xs:gap-[2rem] justify-center items-center">
      <h2 className="text-4xl  font-extrabold xs:text-2xl">My Repositories</h2>

      {/* Show Numbers of repos per page */}
      <div className="flex xs:flex-col-reverse justify-between items-center w-full xs:gap-4 ">
        <div className="basis-[25%] xs:w-[100%]">
          <SearchInput onChange={handleSearchInputChange} />
        </div>

        <span className="font-medium xs:text-sm sm:text-base text-lg basis-[30%] flex sm:justify-center sm:basis-[40%]">
          Showing {indexOfFirstRepo + 1}-
          {Math.min(indexOfLastRepo, filterRepos.length)} of{" "}
          {filterRepos.length} repositories
        </span>

        {/* Show filter by oldest and forked repos */}
        <div>
          <div
            className="flex justify-between items-center w-[10rem] py-2 px-6 rounded-2xl border cursor-pointer caret-transparent"
            onClick={toggleFilterOptions}
          >
            <button className=" font-bold ">Filter</button>
            <LuListFilter className="text-2xl" />
          </div>

          {showFilterOptions && (
            <div className="flex flex-col justify-center items-center">
              <button
                onClick={handleOldestFilterClick}
                className=" text-[#0b2946] font-bold py-2 px-4 rounded"
              >
                Older
              </button>
              <button
                onClick={handleForkedFilterClick}
                className=" text-[#0b2946] font-bold py-2 px-4 sm:px-0 rounded"
              >
                Forked
              </button>

              <button
                onClick={clearFilterClick}
                className="text-[#0b2946] font-bold py-2 px-4 sm:px-0 rounded"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Map repos to display them */}
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-8 md:gap-4 w-full ">
          {filteredRepos !== null
            ? filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="flex hover:scale-105 transition-all duration-300 cursor-pointer h-[10rem] border rounded-2xl"
                >
                  <div className="w-[4%] bg-[#82c7f7] h-[100%] rounded-tl-2xl">
                    <div className="bg-[#0c4d80] w-full h-[80%]  rounded-tl-2xl"></div>
                  </div>
                  <div className=" flex flex-col gap-4 px-[2em] py-[2em] shadow-2xl h-full w-full rounded-2xl">
                    <div className="flex gap-8">
                      <div>
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                      </div>
                      <h2 className="font-bold text-[1.1em] ">
                        <a href={repo.html_url}>{repo.name}</a>
                      </h2>
                    </div>
                    <span className="text-lg pl-[2rem]">
                      {repo.lastUpdated}
                    </span>
                  </div>
                </div>
              ))
            : currentRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="flex hover:scale-105 transition-all duration-300 cursor-pointer h-[10rem] border rounded-2xl"
                >
                  <div className="w-[4%] bg-[#82c7f7] h-[100%] rounded-tl-2xl rounded-bl-2xl">
                    <div className="bg-[#0c4d80] w-full h-[80%]  rounded-tl-2xl"></div>
                  </div>
                  <div className=" flex flex-col gap-4 px-[2em] py-[2em] shadow-2xl h-full w-full rounded-2xl">
                    <div className="flex gap-8">
                      <div>
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                      </div>
                      <h2 className="font-bold text-[1.1em] ">
                        <a href={repo.html_url}>{repo.name}</a>
                      </h2>
                    </div>
                    <span className="text-lg pl-[2rem]">
                      {repo.lastUpdated}
                    </span>
                  </div>
                </div>
              ))}
        </div>
      )}

      <div className="">
        {!isForkedFilter && ( // Conditionally render pagination buttons
          <div className="flex items-center justify-between gap-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
            <span className="font-medium">{currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={indexOfLastRepo >= repos.length}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}
        {isForkedFilter && ( // Conditionally render current page number
          <div className="flex items-center justify-center">
            <span className="font-medium">{currentPage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRepos;
