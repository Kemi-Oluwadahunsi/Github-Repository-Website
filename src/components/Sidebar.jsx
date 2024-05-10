import { useContext } from "react";
import GitHubContext from "../hooks/GithubContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Sidebar = ({ handleRepoClick }) => {
  const { repos } = useContext(GitHubContext);

  return (
    <div className="flex flex-col gap-8 pt-4">
      <div className="border-l-8 border-[#0b2946] w-full py-1 pl-4">
        <h2 className="text-2xl font-bold text-[#0b2946] ">Repositories</h2>
      </div>

      <div className="flex flex-col gap-4">
        {repos.map((repo) => (
          <div
            key={repo.id}
            onClick={() => handleRepoClick(repo)}
            className=" border border-[#095a9b] py-2 px-3 hover:scale-105 rounded bg-[#f1f8fe]"
          >
            <div className="flex gap-4 items-center cursor-pointer ">
              <FontAwesomeIcon icon={faGithub} size="" />
              <p className="font-medium text-lg">{repo.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
