// import { FadeInOnScroll, Header } from "../../components";

import "./Home.css";

import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import About from "../../components/About/About";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { useRef } from "react";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const aboutRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log("Scroll Progress: ", latest);
  });

  const scale = useTransform(scrollYProgress, [0, 1.2], ["100%", "0%"]);
  const slideDown = useTransform(scrollYProgress, [0.5, 1], ["0%", "100%"]);
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
        style={{ scale: scale, opacity: opacity, translateY: slideDown }}
        className="home-container"
      >
        <Header aboutRef={aboutRef} />
      </motion.div>
      {/* <FadeInOnScroll> */}
      <Banner tiles={tiles} speed={40000} />
      {/* </FadeInOnScroll> */}
      <About ref={aboutRef} />
    </>
  );
};

export default Home;
