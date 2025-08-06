// import { FadeInOnScroll, Header } from "../../components";

import { useRef, lazy } from "react";
import "./Home.css";

import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
const About = lazy(() => import("../../components/About/About"));
import { Education } from "../../components";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const aboutRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log("Scroll Progress: ", latest);
  });

  const scale = useTransform(scrollYProgress, [0, 1.2], ["1", "1.6"]);
  const slideDown = useTransform(scrollYProgress, [0.5, .8], ["0%", "100%"]);
  const slideUp = useTransform(scrollYProgress, [0.4, .6], ["0%", "-100%"]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], ["1", "0"]);
  const tileTexts = [
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "C#",
    "MongoDB",
    "ExpressJS",
    "React",
    "TypeScript",
    "NodeJS",
    "REST API",
    "Tailwind CSS",
    "Next.js",
    "Recoil",
    "DaisyUI",
    "Motion",
    "Framer Motion",
    "Prisma",
    "Storybook",
    "pgAdmin",
    "PostgreSQL",
    "Sequelize",
    "Firebase",
    "Docker",
    "Render",
    "Heroku",
    "Vercel",
    "Netlify",
    "AWS",
    "Git",
    "GitHub",
    "NPM",
    "Postman",
    "Jest",
    "Vitest",
  ];

  const tiles = tileTexts.map((tileText, idx) => ({
    id: idx + 1, // unique id for each tile
    tileText,
  }));

  return (
    <>
      <motion.div
        style={{ scale: scale, opacity: opacity, 
          
          // translateY: slideDown
          translateY: slideUp 

         }}
        className="home-container"
      >
        <Header aboutRef={aboutRef} />
      </motion.div>
      {/* <FadeInOnScroll> */}
      <Banner tiles={tiles} speed={40000} />
      {/* </FadeInOnScroll> */}
      <About ref={aboutRef} />

      <Education />
    </>
  );
};

export default Home;
