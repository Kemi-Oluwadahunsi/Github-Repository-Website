import { useContext, useState } from "react";
import GitHubContext from "../hooks/GithubContext";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

const AddNewRepoForm = ({ setShowNewRepoForm }) => {
  const { createRepo } = useContext(GitHubContext);

  const [repoData, setRepoData] = useState({
    name: "",
    description: "",
    visibility: "private",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRepo(repoData);
      // Close the form after creating the repo
      setShowNewRepoForm(false);
      await Swal.fire(
        "Success!",
        "Repository created successfully! Kindly refresh the page.",
        "success"
      );
       window.location.reload();
    } catch (error) {
      console.error("Error creating repository:", error.message);
      Swal.fire(
        "Error",
        'Error creating repository, please try again.',
        "error"
      );
    }
  };

  return (
    <div className="absolute top-[5%] z-50 w-full px-[2rem] md:px-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 ">
          <FontAwesomeIcon
            icon={faWarning}
            className="text-[#D91F06] text-lg"
          />
          <span className="text-[#f1f8fe] text-sm">
            It is compulsory to add the keyword &quot;Demo&quot; to the repo name for edit and delete purpose.
          </span>
        </div>
        <h2 className="text-[#f1f8fe] font-bold text-center text-2xl xs:text-lg">
          Add New Repository
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[2rem] w-full"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[#f1f8fe]">
              Enter Repo Name
            </label>
            <input
              type="text"
              name="name"
              value={repoData.name}
              onChange={handleChange}
              placeholder="Repository Name"
              className="py-1 px-2 outline outline-[#0a71bf] w-full rounded"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-[#f1f8fe]">
              Enter Description
            </label>
            <textarea
              name="description"
              value={repoData.description}
              onChange={handleChange}
              placeholder="Description"
              className=" px-2 outline outline-[#0a71bf] w-full rounded"
            />
          </div>

          <div className="text-[#f1f8fe] flex gap-4">
            <label htmlFor="visibility" className="text-[#f1f8fe]">
              Select Visibility
            </label>
            <select
              name="visibility"
              value={repoData.visibility}
              onChange={handleChange}
              className="text-[#0b2946]"
            >
              <option value="private" className="px-8">
                Private
              </option>
              <option value="public" className="px-8]">
                Public
              </option>
            </select>
          </div>

          <div className="flex gap-8 md:gap-4 xs:flex-col xs:gap-4">
            <button
              type="submit"
              className=" text-[#0b2946] bg-[#bde0fa] font-bold py-2 px-4 md:px-2 md:py-1 rounded hover:scale-[1.03]"
            >
              Create Repo
            </button>
            {/* Button to close the form */}
            <button
              type="button"
              className=" text-[#0b2946] bg-[#bde0fa] font-bold py-2 px-4 md:px-2 md:py-1 rounded hover:scale-[1.03]"
              onClick={() => setShowNewRepoForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewRepoForm;
