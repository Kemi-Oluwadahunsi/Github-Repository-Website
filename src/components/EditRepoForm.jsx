import { useContext, useState } from "react";
import GitHubContext from "../hooks/GithubContext";
import Swal from "sweetalert2";

const EditRepoForm = ({ repoName, setShowEditRepoForm, }) => {
  const { updateRepo } = useContext(GitHubContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const repoData = Object.fromEntries(formData.entries());

    try {
      if (repoName.toLowerCase().includes("demo")) {
        // Checking if repoName contains "demo"
        await updateRepo(repoData, repoName);
        setShowEditRepoForm(false); // Close the form after updating
        await Swal.fire("Success!", "Repo updated successfully! Kindly refresh the page.", "success");
         window.location.reload();
      } else {
        // Displaying a message if repoName doesn't contain "demo"
        console.error("Repository name does not contain the keyword 'demo'.");
        Swal.fire(
          "Error",
          'Repository name does not contain the keyword "demo", please try again.',
          "error"
        );
      }
    } catch (error) {
      // Handle error
      console.error("Error updating repository:", error.message);
      Swal.fire(
        "Error",
        "Error updating repository. Please try again.",
        "error"
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="absolute top-[10%] z-50 w-full px-[2rem] md:px-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-[#f1f8fe] font-bold text-center text-2xl">
          Edit Repo
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[2rem] w-full"
        >
          {/* input fields for repo details */}

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[#f1f8fe]">
              Repo Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="New Repo Name"
              required
              onChange={handleChange}
              className="py-1 px-2 outline outline-[#0a71bf] rounded"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description" className="text-[#f1f8fe]">
              Description
            </label>
            <textarea
              type="text"
              rows={5}
              name="description"
              placeholder="New Description"
              onChange={handleChange}
              className="px-2 outline outline-[#0a71bf] rounded"
            />
          </div>

          {/* Add more fields as needed */}
          <div className="flex gap-8 md:gap-4 xs:flex-col xs:gap-4">
            <button
              type="submit"
              className=" text-[#0b2946] bg-[#bde0fa] font-bold py-2 md:py-1 px-4 md:px-2 rounded hover:scale-[1.03]"
            >
              Update Repo
            </button>
            <button
              className=" text-[#0b2946] bg-[#bde0fa] font-bold py-2 md:py-1 px-4 md:px-2 rounded hover:scale-[1.03]"
              onClick={() => setShowEditRepoForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRepoForm;
