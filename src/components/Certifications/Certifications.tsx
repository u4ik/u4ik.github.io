import React, { useRef } from "react";
import FadeInOnScroll from "../FadeInOnScroll/FadeInOnScroll";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import CertificationImg from "../../assets/certification.png"; // Add your certification image

const Certifications = () => {
  const localRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Optional: handle scroll progress
  });

  const rotate = useTransform(scrollYProgress, [0, 0.39], [540, 0]);
  const x = useTransform(scrollYProgress, [0, 0.4], ["200px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  const certificationsList = [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2023",
    },
    {
      name: "Google IT Support Professional Certificate",
      issuer: "Google/Coursera",
      year: "2022",
    },
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      year: "2021",
    },
    // Add more certifications as needed
  ];

  return (
    <div className="about_skills-overlay">
      <div className="about_skills-container" ref={localRef}>
        <div className="about-wrapper">
          <FadeInOnScroll>
            <div className="flex justify-start items-center gap-4">
              <div className="flex-shrink-0 w-30"></div>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="flex-1 text-3xl font-bold"
              >
                Certifications
              </motion.h1>
              <motion.img
                style={{ rotate, x, opacity }}
                src={CertificationImg}
                alt="Certification Image"
                className="w-40 flex-shrink-0"
              />
            </div>
            <ul style={{ fontSize: "1.2em", marginTop: "1em" }}>
              {certificationsList.map((cert, idx) => (
                <li key={idx} style={{ marginBottom: "0.7em" }}>
                  <strong>{cert.name}</strong> <br />
                  <span style={{ color: "#aaa" }}>{cert.issuer} &mdash; {cert.year}</span>
                </li>
              ))}
            </ul>
          </FadeInOnScroll>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
