import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "animate.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <div className="h-[7rem] pl-[5rem] xs:pl-[2rem] pr-[25rem] sm:pr-[5rem] xs:pr-[2rem] md:pr-[10rem] bg-[#10416A]">
      <nav className="flex justify-between items-center h-full">
        <Link className="logo" to="/">
          <img
            src={Logo}
            alt="logo"
            className="w-[6rem] h-[4rem] xs:w-[5rem] xs:h-[3rem] "
          />
          <h3 className="text-[#e1f0fd]">KodeMaven</h3>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden lg:hidden">
          <FontAwesomeIcon
            icon={menuOpen ? faTimes : faBars}
            className="text-white text-4xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        {/* Large Screen Menu */}
        <ul className="hidden md:flex lg:flex basis-[70%] justify-between items-center text-[#10416A] text-lg">
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

        {/* Mobile Menu */}
        {menuOpen && (
          
          <ul className="animate__animated animate__fadeInBottomRight md:hidden lg:hidden absolute top-[7rem] left-[50%] xs:left-[30%] h-[30rem] pt-[3rem] right-0 bg-[#10416A] xs:w-[70%] w-[50%] flex flex-col gap-10 items-center text-white text-2xl xs:text-lg z-[999]">
            <Link to={"/"}>
              <li onClick={closeMenu}>All Repos</li>
            </Link>

            <Link to={"/repo-details"}>
              <li onClick={closeMenu}>View Repo Details</li>
            </Link>

            <Link to={"/error-testing"}>
              <li onClick={closeMenu}>Error Page</li>
            </Link>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
