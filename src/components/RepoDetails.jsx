// RepoDetails.js
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faCodeFork,
  faEye,
  faStar,
  faUserAlt,
  faX,
} from "@fortawesome/free-solid-svg-icons";
// import GitHubContext from "../hooks/GithubContext";

const RepoDetails = ({ repos }) => {
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isWideScreen, setIsWideScreen] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 900);
    };

    handleResize(); // Call it initially
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
     setShowDetails(true);
    scrollToTop();
    console.log("Selected repo:", repo);
  };

  const handleRepoClose = () => {
     setShowDetails(false);
    setSelectedRepo(null);
  };
  

  return (
    <div className="border-l-[14px] border-[#0c4d80] pt-[2rem]">
      <div className="flex gap-[4rem] px-[5rem] md:px-[3rem] xs:px-[1rem] sm:px-[5rem] justify-center">
        <div className="basis-[30%] xs:basis-[100%] sm:basis-[60%] border-r-4 xs:border-r-0 sm:border-r-0 border-[#0b2946] pr-12 xs:pr-0 sm:pr-0 pt-4  ">
          <Sidebar repos={repos} handleRepoClick={handleRepoClick} />
        </div>

        {isWideScreen ? (
          <div className="basis-[60%] ">
            <div className="pt-4 flex flex-col gap-8">
              <div className="text-center w-full">
                <h2 className="text-4xl font-bold text-[#0b2946]">
                  Repo Details
                </h2>
              </div>

              {selectedRepo ? (
                <div className="flex flex-col justify-center items-center">
                  <div className=" flex flex-col gap-6 border rounded-2xl shadow-2xl px-[5rem] md:px-[3rem] py-4 w-[90%] relative">
                    <FontAwesomeIcon
                      icon={faX}
                      className="absolute text-[#0b2946] text-lg left-[90%] font-bold cursor-pointer"
                      onClick={handleRepoClose}
                    />
                    <h2 className="text-center text-2xl font-bold">
                      {selectedRepo.name}
                    </h2>

                    <div className="flex justify-between mt-4">
                      <div className="flex gap-4 items-center">
                        <FontAwesomeIcon
                          icon={faUserAlt}
                          className="text-[#0b2946] text-[3rem]"
                        />

                        <p className="text-lg font-bold">
                          {selectedRepo.owner.login}
                        </p>
                      </div>

                      <p className="text-lg font-bold">
                        Visibility: {selectedRepo.visibility}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon icon={faCodeBranch} />
                      <p className="text-lg">
                        Default branch: {selectedRepo.default_branch}
                      </p>
                    </div>

                    <p>
                      <span className="font-bold">Description:</span>{" "}
                      {selectedRepo.description}
                    </p>
                    <p>
                      <span className="font-bold">Language:</span>{" "}
                      {selectedRepo.language}
                    </p>

                    <p>
                      <span className="font-bold">Deployed Link:</span>{" "}
                      <a
                        href={selectedRepo.homepage}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {selectedRepo.homepage}
                      </a>
                    </p>

                    <div className="flex flex-col gap-2 justify-center  bg-[#e1f0fd] text-[#0b2946] px-[2rem] w-[40%] py-4">
                      <p className="font-bold">Topics:</p>
                      <ul>
                        {selectedRepo.topics.map((topic, index) => (
                          <li key={index}>{topic}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <FontAwesomeIcon
                          icon={faStar}
                          className=" text-yellow-400"
                        />
                        <p> {selectedRepo.stargazers_count}</p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <FontAwesomeIcon
                          icon={faCodeFork}
                          className=" text-[#0c4d80]"
                        />
                        <p>Forks: {selectedRepo.forks}</p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faEye} className=" " />
                        <p>Watchers: {selectedRepo.watchers}</p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <p>
                        <span className="font-bold">Created at:</span>{" "}
                        {selectedRepo.created_at}
                      </p>
                      <p>
                        <span className="font-bold">Last Updated:</span>{" "}
                        {selectedRepo.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center px-[2rem] py-[5rem] shadow-2xl w-[60%] text-3xl font-medium ">
                    <p>Click A Repo To View Details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          showDetails && (
            <div className=" absolute top-[20%] w-full left-0  mx-auto h-auto flex items-center  justify-center  ">
              <div className="flex w-[95%] sm:w-[90%] items-center justify-center bg-[#f1f8fe] rounded-2xl shadow-2xl sm:px-[2rem] py-[2rem]">
                <div className="pt-4 flex flex-col gap-8 w-full ">
                  <div className="absolute -top-1 sm:top-4 left-[84%] sm:left-[85%] cursor-pointer py-2 px-3 rounded-lg bg-[#0b2946] text-[#f1f8fe] flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faX}
                      className="text-lg xs:text-base font-extrabold "
                      onClick={handleRepoClose}
                    />
                  </div>

                  <div className="text-center w-full">
                    <h2 className="text-4xl xs:text-2xl font-bold text-[#0b2946]">
                      Repo Details
                    </h2>
                  </div>

                  {selectedRepo && (
                    <div className="flex flex-col justify-center items-center">
                      <div className=" flex flex-col gap-6 border rounded-2xl shadow-2xl px-[1rem] sm:px-[2rem] py-4 w-[95%] relative">
                        <h2 className="text-center text-2xl xs:text-xl font-bold">
                          {selectedRepo.name}
                        </h2>

                        <div className="flex xs:flex-col justify-between items-center xs:gap-4 xs:items-start mt-4 w-full">
                          <div className="flex gap-4 xs:gap-8 items-center">
                            <FontAwesomeIcon
                              icon={faUserAlt}
                              className="text-[#0b2946] text-[2rem] sm:text-[3rem]"
                            />

                            <p className="text-lg font-bold">
                              {selectedRepo.owner.login}
                            </p>
                          </div>

                          <p className="text-lg font-bold">
                            Visibility: {selectedRepo.visibility}
                          </p>
                        </div>

                        <div className="flex gap-2 items-center">
                          <FontAwesomeIcon icon={faCodeBranch} />
                          <p className="text-lg">
                            Default branch: {selectedRepo.default_branch}
                          </p>
                        </div>

                        <p>
                          <span className="font-bold">Description:</span>{" "}
                          {selectedRepo.description}
                        </p>
                        <p>
                          <span className="font-bold">Language:</span>{" "}
                          {selectedRepo.language}
                        </p>

                        <p>
                          <span className="font-bold">Deployed Link:</span>{" "}
                          <a
                            href={selectedRepo.homepage}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {selectedRepo.homepage}
                          </a>
                        </p>

                        <div className="flex flex-col gap-2 justify-center  bg-[#e1f0fd] text-[#0b2946] px-[2rem] w-[40%] py-4">
                          <p className="font-bold">Topics:</p>
                          <ul>
                            {selectedRepo.topics.map((topic, index) => (
                              <li key={index}>{topic}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-between">
                          <div className="flex gap-2 items-center">
                            <FontAwesomeIcon
                              icon={faStar}
                              className=" text-yellow-400"
                            />
                            <p> {selectedRepo.stargazers_count}</p>
                          </div>

                          <div className="flex gap-2 items-center">
                            <FontAwesomeIcon
                              icon={faCodeFork}
                              className=" text-[#0c4d80]"
                            />
                            <p>Forks: {selectedRepo.forks}</p>
                          </div>

                          <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faEye} className=" " />
                            <p>Watchers: {selectedRepo.watchers}</p>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <p>
                            <span className="font-bold">Created at:</span>{" "}
                            {selectedRepo.created_at}
                          </p>
                          <p>
                            <span className="font-bold">Last Updated:</span>{" "}
                            {selectedRepo.lastUpdated}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RepoDetails;
