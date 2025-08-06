import React, { useRef, forwardRef } from "react";
import FadeInOnScroll from "../FadeInOnScroll/FadeInOnScroll";
// import "../About/About.css"; // Reuse About styles or create Education.css if you want
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import EducationImg from "../../assets/education2.png"; // Add your education image
import { mergeAttributes } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const Education = () => {
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

  const educationList = [
    {
      institution: "Eleven Fifty Academy",
      attendance: "2020",
      study: "Web Development Bootcamp",
      merits: "Full-Stack Development Certificate",
    },
    {
      institution: "Indiana University - Purdue University Indianapolis",
      attendance: "2015",
      study: "Bachelor of Science in Information Technology",
      merits: "Dean's List",
    },
    {
      institution: "International Academy of Design & Technology",
      attendance: "2013",
      study: "Bachelor of Science in Information Technology",
      merits: "President's List",
    },
  ];

  return (
    <div className="about_skills-overlay">
      <div className="about_skills-container" ref={localRef}>
        <div className="about-wrapper">
          <FadeInOnScroll>
            <div className="flex justify-start items-center gap-4">
              <div className="flex-shrink-0 w-20"></div>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="flex-1 text-3xl font-bold"
              >
                Education
              </motion.h1>
              <motion.img
                style={{ rotate, x, opacity }}
                src={EducationImg}
                alt="Education Image"
                className="w-20 flex-shrink-0"
              />
            </div>
            <p style={{ fontSize: "1.2em" }}>
              Despite challenges (financial & health) that prevented me from completing my university
              degree, my commitment to academic and professional growth never
              wavered. During my time at the International Academy of Design &
              Technology (2013) and Indiana University - Purdue University
              Indianapolis (2015), I maintained a high academic caliber, earning
              honors like the President's and Dean's Lists. This dedication
              ultimately culminated in my success at the Eleven Fifty Academy
              Web Development Bootcamp in 2020, where I graduated at the top of
              my class and secured a job in the industry. My journey
              demonstrates a powerful work ethic and a relentless pursuit of
              knowledge in the field of technology.
            </p>
          </FadeInOnScroll>
        </div>
      </div>
    </div>
  );
};

export default Education;
