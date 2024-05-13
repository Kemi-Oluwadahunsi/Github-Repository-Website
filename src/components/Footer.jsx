import { useContext } from "react";
import GitHubContext from "../hooks/GithubContext";


const Footer = () => {
  const {loading} = useContext(GitHubContext);
  return (
  
      <div className={`bg-[#34344a]  ${loading ? "fixed bottom-0 w-screen" : ""} text-[#e1effd] py-10 xs:text-sm flex justify-center items-center`}>
      <div className="rights">
        <span className="circleC">&#169;</span> {new Date().getFullYear()}{" "}
        Oluwakemi Oluwadahunsi | All rights reserved.
      </div>
    </div>
  );
}

export default Footer