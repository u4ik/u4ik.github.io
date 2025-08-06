import React from "react";

import { Badge } from "../index";
import "./Item.css";

function Item({
  image,
  github = "",
  header = "default header",
  description = "default",
  additional = "",
  npm = "",
  viewLink = "",
}) {
  return (
    <div className="item-container" style={{ margin: "10%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginInline: "auto",
        }}
      >
        <img
          src={image}
          alt={header}
          className="item-image"
          style={{
            borderRadius: "1em",
            marginBottom: "1em",
            maxWidth: "30em",
            width: "100%",
          }}
        />
      </div>
      <div
        className="item-content"
        style={{ maxWidth: "25em", marginInline: "auto", textAlign: "center" }}
      >
        <h2 className="font-extrabold text-xl">{header}</h2>
        <div style={{ maxWidth: "25em", marginInline: "auto", color: "white" }}>
          {description}
        </div>
        {additional && <div className="item-additional mt-2">{additional}</div>}
        {npm && npm.img1 && npm.img2 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              gap: ".5em",
              marginTop: "1em",
            }}
          >
            <img
              src={npm.img1}
              alt="npm1"
              style={{
                // width: "7em",
                height: "2em",
                objectFit: "contain",
                background: "#fff", // optional: helps with transparency
                borderRadius: "0.5em", // optional: for rounded corners
                display: "block",
              }}
            />
            <img
              src={npm.img2}
              alt="npm2"
              style={{
                // width: "7em",
                height: "2em",
                objectFit: "contain",
                background: "#fff", // optional
                borderRadius: "0.5em", // optional
                display: "block",
              }}
            />
          </div>
        )}
        <div
          style={{
            // background: "pink",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: ".5em",
            marginTop: "1em",
            alignItems: "center",
          }}
        >
          {github && (
            <Badge
              color="grey"
              label=""
              icon="github"
              size="large"
              margin=".1em 1em .1em 1em"
              width="2.3em"
              padding="0.2em"
              link={github}
            />
          )}
          {npm && npm.link && (
            <Badge
              color="red"
              label=""
              icon="npm"
              size="large"
              margin=".1em 1em .1em 1em"
              width="3em"
              padding="0.2em"
              link={npm.link}
            />
          )}
          {viewLink && (
            <button className="btn btn-ghost outline-2" onClick={() => window.open(viewLink, "_blank")}>View</button>
            // <Badge
            //   color="blue"
            //   label="View"
            //   icon=""
            //   size="large"
            //   margin=".1em .1em .1em .1em"
            //   width="4em"
            //   padding="0.24em"
            //   link={viewLink}
            // />
          )}
        </div>
      </div>
      <hr style={{ margin: "4em 0" }} />
    </div>
  );
}

export default Item;
