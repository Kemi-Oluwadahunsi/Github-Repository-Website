import { useContext, useState } from "react";
import GitHubContext from "../hooks/GithubContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import SearchInput from "./SearchInput";
import EditRepoForm from "./EditRepoForm";
import AddNewRepoForm from "./AddNewRepoForm";
import Swal from "sweetalert2";

const Sidebar = ({ handleRepoClick, accessToken }) => {
  const { repos, loading, deleteRepo,} = useContext(GitHubContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewRepoForm, setShowNewRepoForm] = useState(false);
  const [showEditRepoForm, setShowEditRepoForm] = useState(false);
  const [editRepoName, setEditRepoName] = useState("");
  const [repoDescription, setRepoDescription] = useState(""); 

  // Function to handle delete button click
  const handleDeleteButtonClick = async (repoName) => {
    try {
      if (repoName.toLowerCase().includes("demo")) {
        const deletedRepo = await deleteRepo(repoName, accessToken);
        if (deletedRepo) {
       Swal.fire("Success!", "Repo deleted successfully!", "success");
        }
      } else {
        Swal.fire(
          "Error",
          'Only repos containing "demo" in the name can be deleted.',
          "error"
        );
      }
    } catch (error) {
      console.error("Error deleting repository:", error.message);
      Swal.fire("Error", "Error deleting repository.", "error");
    }
  };

  const filterRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle search input change
  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
  };

  const handleEditButtonClick = (repoName, repoDescription) => {
    setEditRepoName(repoName);
    setRepoDescription(repoDescription);
    setShowEditRepoForm(true);
  };

  const handleNewRepoButtonClick = () => {
    setShowNewRepoForm(true);
  };

  return (
    <div className="flex flex-col gap-8 pt-4 relative xs:pb-8 sm:pb-8">
      <div className="flex justify-between border-l-8 xs:border-l-4 border-[#0b2946] w-full py-1 pl-4 md:pl-2">
        <h2 className="text-2xl xs:text-lg md:text-base font-bold text-[#0b2946] ">
          Repositories
        </h2>
        <button
          className="px-2 border-2 border-[#095a9b] rounded hover:bg-[#0b2946] hover:text-[#e1f0fd]"
          onClick={handleNewRepoButtonClick}
        >
          Add New Repo
        </button>
      </div>

      <SearchInput onChange={handleSearchInputChange} />

      {loading ? (
        <div className="flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 h-[80vh] lg:max-h-[80vh] xs:h-auto sm:h-auto overflow-y-auto xs:overflow-auto">
          {filterRepos.map((repo) => (
            <div key={repo.id} className="  ">
              <div className="flex flex-col gap-4 border border-[#095a9b] py-2 px-6 rounded bg-[#f1f8fe]">
                <div
                  className="flex gap-4 items-center cursor-pointer hover:scale-[1.05] w-[100%]"
                  onClick={() => handleRepoClick(repo)}
                >
                  <FontAwesomeIcon icon={faGithub} />
                  <div className="font-medium text-lg xs:text-base caret-transparent">
                    {repo.name}
                  </div>
                </div>

                {repo.name.toLowerCase().includes("demo") && (
                  <div className="flex items-center justify-center">
                    <div className="flex justify-between items-center w-[80%] xs:w-[100%] md:w-[100%]">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-[#e1f0fd] font-bold py-1 px-2 rounded"
                        onClick={() => handleEditButtonClick(repo.name)}
                      >
                        Edit Repo
                      </button>

                      <button
                        className="bg-[#D91F06] hover:bg-[#D7D7D7] hover:text-[#D91F06] text-[#e1f0fd] font-bold py-1 px-2 rounded"
                        onClick={() => handleDeleteButtonClick(repo.name)}
                      >
                        Delete Repo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showNewRepoForm && (
        <div className="absolute top-[20%] sm:top-0 xs:top-0 py-[5rem] w-[100%] h-[30rem] xs:h-[31rem] z-50 shadow-2xl bg-[#0c4d80] rounded">
          <AddNewRepoForm setShowNewRepoForm={setShowNewRepoForm} />
        </div>
      )}

      {showEditRepoForm && (
        <div className="absolute top-[20%] sm:top-0 xs:top-0 py-[5rem] w-[100%] h-[33rem] xs:h-[33rem] z-50 shadow-2xl bg-[#0c4d80] rounded">
          <EditRepoForm
            repoName={editRepoName}
            setShowEditRepoForm={setShowEditRepoForm}
            repoDescription={repoDescription}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
