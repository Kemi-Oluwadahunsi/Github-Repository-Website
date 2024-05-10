// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// // Create the context
// const GitHubContext = createContext();

// // Helper function to format the last updated time
// const formatLastUpdated = (updatedTime) => {
//   const now = new Date();
//   const updated = new Date(updatedTime);
//   const diffInMs = now - updated;
//   const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//   if (diffInDays === 0) {
//     return "Updated today";
//   } else if (diffInDays === 1) {
//     return "Updated yesterday";
//   } else {
//     return `Updated ${diffInDays} days ago`;
//   }
// };

// // Create a provider component
// export const GitHubProvider = ({ children }) => {
//   const [repos, setRepos] = useState([]);

//   useEffect(() => {
//     const fetchRepos = async () => {
//       const username = "Kemi-Oluwadahunsi";
//       try {
//         const response = await axios.get(
//           `https://api.github.com/users/${username}/repos`
//         );
//         const sortedRepos = response.data.sort((a, b) => {
//           return new Date(b.updated_at) - new Date(a.updated_at); // Sort in descending order
//         });
//         const data = sortedRepos.map((repo) => ({
//           ...repo,
//           lastUpdated: formatLastUpdated(repo.updated_at),
//         }));
//         setRepos(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchRepos();
//   }, []);

//   const handleOldestFilter = () => {
//     const sortedRepos = [...repos].sort(
//       (a, b) => new Date(a.created_at) - new Date(b.created_at)
//     );
//     setRepos(sortedRepos);
//   };

//   const handleForkedFilter = () => {
//     const forkedRepos = repos.filter((repo) => repo.fork);
//     setRepos(forkedRepos);
//   }

//   const value = {
//       repos,
//       handleOldestFilter,
//       handleForkedFilter,
//   }

//   return (
//     <GitHubContext.Provider value={value}>{children}</GitHubContext.Provider>
//   );
// };

// export default GitHubContext;

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
          return new Date(b.updated_at) - new Date(a.updated_at); // Sort in descending order
        });
        const data = sortedRepos.map((repo) => ({
          ...repo,
          lastUpdated: formatLastUpdated(repo.updated_at),
        }));
        setRepos(data);
        setLoading(false);
      } catch (error) {
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


  const value = {
    repos: filteredRepos !== null ? filteredRepos : repos,
    handleOldestFilter,
    handleForkedFilter,
    clearFilter,
    loading,
  };

  return (
    <GitHubContext.Provider value={value}>{children}</GitHubContext.Provider>
  );
};

export default GitHubContext;
