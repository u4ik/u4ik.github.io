import React from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmModal, Resume_C } from "../../components";
import { motion } from "motion/react"
import ResId from "./Resume_Helper";

const Resume = () => {
  //   <Resume_C />;
  const handleDownload = (option) => {
    window.open(
      option === "download"
        ? `https://drive.google.com/uc?export=download&id=${ResId}`
        : `https://drive.google.com/file/d/${ResId}/view`,
      option === "download" ? "" : "_blank"
    );
  };
  return (
    <>

      {/* <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>open modal</button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> */}
      {/* <ConfirmModal
        text={"Would you like to download my resume?"}
        callback={handleDownload}
        navigatePath={"/"}
      /> */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, duration: 0.5 }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
        }}
      >
        <iframe
          src={`https://drive.google.com/file/d/${ResId}/preview`}
          width="100%"
          height="83%"
          allow="autoplay"
        ></iframe>
      </motion.div>
    </>
  );
};

export default Resume;
