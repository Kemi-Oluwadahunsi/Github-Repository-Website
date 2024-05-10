import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="h-[7rem] pl-[5rem] pr-[25rem] bg-[#10416A]">
      <nav className="flex justify-between items-center h-full">
        <Link className="logo" to="/">
          <img src={Logo} alt="logo" className="w-[6rem] h-[4rem] " />
          <h3 className="text-[#e1f0fd]">KodeMaven</h3>
        </Link>

        <ul className="flex basis-[70%] justify-between items-center text-[#10416A] text-lg">
          <Link to={"/"}>
            <li className="bg-[#f1f8fe] px-6 py-1 rounded-md cursor-pointer hover:bg-[#0b2946] hover:text-[#e1f0fd] hover:scale-105">
              All Repos
            </li>
          </Link>

          <Link to={"/repo-details"}>
            <li className="bg-[#f1f8fe] px-6 py-1 rounded-md cursor-pointer hover:bg-[#0b2946] hover:text-[#e1f0fd] hover:scale-105">
              View Repo Details
            </li>
          </Link>

          <Link to={"/error-testing"}>
            <li className="bg-[#f1f8fe] px-6 py-1 rounded-md cursor-pointer hover:bg-[#0b2946] hover:text-[#e1f0fd] hover:scale-105">
              Error Page
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
