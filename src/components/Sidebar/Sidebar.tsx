import React from "react";
import { Badge } from "../index";
import "./Sidebar.css";

const Sidebar = () => {
  const iconSize = "huge";

  return (
    // <div className="sidebar-container">
    <div
      className="sidebar-container wrap text-white"
    >
      {/* <Divider >_______________________________________</Divider> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: ".5em",
          justifyContent: "center",
          alignItems: "center",
          background: "",
          paddingTop: "",
          height: "2.5em",
        }}
      >
        <Badge
          color="blue"
          label={"LinkedIn"}
          icon="linkedin"
          size="2em"
          margin=".1em .1em .1em .1em"
          width="8em"
          // padding='.2em'

          link="https://www.linkedin.com/in/amitsmangat/"
        />
        <Badge
          color="grey"
          label={"GitHub"}
          icon="github"
          size="2em"
          margin=".1em .1em .1em .1em"
          width="8em"
          // padding='.2em'
          link="https://github.com/u4ik"
        />
      </div>
    </div>
    // </div>
  );
};

export default Sidebar;
