import React, { useRef, forwardRef } from "react";
import FadeInOnScroll from "../FadeInOnScroll/FadeInOnScroll";
import About_Text from "./About_Text";
import "./About.css";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import AboutImg from "../../assets/about_compressed.png";
// import AboutImg from "../../assets/about2.png";
// import AboutImg from "../../assets/education.png";

const About = forwardRef<HTMLDivElement>((props, ref) => {
  const localRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ["start end", "end start"], // triggers when About enters viewport
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log("Scroll Progress: ", latest);
  });

  const rotate = useTransform(scrollYProgress, [0, 0.4], [-540, 0]);
  const x = useTransform(scrollYProgress, [0, 0.4], ["-200px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <div className="about_skills-overlay" ref={ref}>
      <div className="about_skills-container" ref={localRef} style={{paddingBottom:"1em"}}>
        <div className="about-wrapper">
          <FadeInOnScroll>
            <div className="flex justify-start items-center gap-4">
              {/* <motion.img

                src={AboutImg}
                alt="About Image"
                className="w-30 flex-shrink-0"
              ></motion.img> */}
              <motion.img
                style={{ rotate, x, opacity }}
                src={AboutImg}
                alt="About Image"
                className="w-20 flex-shrink-0 "
              />
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="flex-1 text-3xl font-bold w-40"
              >
                About Me
              </motion.h1>
              <div className="flex-shrink-0 w-20"></div>
            </div>

            <p style={{ fontSize: "1.2em" }}>
              Hi, I'm <span className="gradient-mask">Amit</span>, and thanks for stopping by! :) <br/> I'm a programmer and
              technologist who's passionate about building clean, intuitive
              digital experiences. I love solving problems, paying attention to
              the small details, and creating solutions that work seamlessly
              across different systems. I mostly work with JavaScript, Python,
              and C#, which gives me the flexibility to take on a variety of
              challenges. When I'm not coding, you'll probably find me
              aquascaping, out on a hike, lost in a good video game, or relaxing
              with a great book. Those things help keep me grounded and spark
              creativity in unexpected ways. Feel free to check out my projects,
              and if you've got an idea you'd like to bring to life, I'd love to
              connect.
            </p>
          </FadeInOnScroll>
        </div>
      </div>
    </div>
  );
});

export default About;
