import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { HiDocument } from "react-icons/hi";
import { FaFolderTree } from 'react-icons/fa6';
import { RiContactsBook3Fill } from 'react-icons/ri';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <ul>
          <li
            onClick={() => navigate("/")}
            className="link"
          >
            {<FaHome color="lightblue" size={"1em"} />}Home
          </li>
          <li
            onClick={() => navigate("/contact")}
            className="link"
          >
            {<RiContactsBook3Fill color="brown" size={"1em"} />}Contact
          </li>

          <li
            onClick={() => navigate("/projects")}
            className="link"
          >
            {<FaFolderTree color="lightgreen" size={"1em"} />}Projects
          </li>

          <li
            onClick={() => navigate("/resume")}
            className="link"
          >
            {<HiDocument size={"1em"} />}Resume
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
