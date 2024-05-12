import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const GitHubContext = createContext();

// Helper function to format the last updated time
const formatLastUpdated = (updatedTime) => {
  const now = new Date();
  const updated = new Date(updatedTime);
  const diffInMs = now - updated;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Updated today";
  } else if (diffInDays === 1) {
    return "Updated yesterday";
  } else {
    return `Updated ${diffInDays} days ago`;
  }
};

// Create a provider component
export const GitHubProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      const username = "Kemi-Oluwadahunsi";
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );

        const sortedRepos = response.data.sort((a, b) => {
          return new Date(b.updated_at) - new Date(a.updated_at);
        });
        const data = sortedRepos.map((repo) => ({
          ...repo,
          lastUpdated: formatLastUpdated(repo.updated_at),
        }));
        setRepos(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchRepos();
  }, []);

  const handleOldestFilter = () => {
    const oldestRepos = [...repos].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    setFilteredRepos(oldestRepos);
  };

  const handleForkedFilter = () => {
    const forkedRepos = repos.filter((repo) => repo.fork);
    setFilteredRepos(forkedRepos);
  };

  const clearFilter = () => {
    setFilteredRepos(null);
  };

  const accessToken = import.meta.env.VITE_APP_TOKEN;
  

  const createRepo = async (repoData) => {
    try {
      const response = await axios.post(
        "https://api.github.com/user/repos",
        repoData,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create repository");
    }
  };

  const updateRepo = async (repoData, repoName) => {
    const username = "Kemi-Oluwadahunsi";
    try {
      const response = await axios.patch(
        `https://api.github.com/repos/${username}/${repoName}`,
        repoData,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_APP_TOKEN}`,
          },
        }
      );
      console.log (repoName)
      console.log(repoData)
      return response.data;
     
    } catch (error) {
      throw new Error("Failed to update repository");
    }
  };



  const deleteRepo = async (repoName) => {
    const username = "Kemi-Oluwadahunsi";
    try {
      // Ask for confirmation before deleting the repository
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the repository "${repoName}"?`
      );
      if (!confirmDelete) {
        return; // Cancel the deletion if the user cancels the confirmation
      }

      const response = await axios.delete(
        `https://api.github.com/repos/${username}/${repoName}`,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );

      // Check rate limit status
      const rateLimitRemaining = response.headers["x-ratelimit-remaining"];
      if (rateLimitRemaining === "0") {
        const rateLimitReset = new Date(
          response.headers["x-ratelimit-reset"] * 1000
        );
        // Calculate time until rate limit reset
        const now = new Date();
        const timeToReset = (rateLimitReset - now) / 1000;
        console.log(
          `Rate limit exceeded. Please wait ${timeToReset} seconds until the rate limit is reset.`
        );
        // Implement retry mechanism or inform the user
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete repository");
    }
  };



  const value = {
    repos: filteredRepos !== null ? filteredRepos : repos,
    handleOldestFilter,
    handleForkedFilter,
    clearFilter,
    loading,
    createRepo,
    updateRepo,
    deleteRepo,
    accessToken,
  };

  return (
    <GitHubContext.Provider value={value}>{children}</GitHubContext.Provider>
  );
};

export default GitHubContext;
