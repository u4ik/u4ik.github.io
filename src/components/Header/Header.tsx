import React, { useState, useEffect, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Cloud from "../../assets/cloud.png";
import Background from "../../assets/landscapegrey_compressed.png";
// import skills from "../About/Skills_List";
// import aboutText from "../About/About_Text";
import { useScroll, useMotionValueEvent, motion } from "motion/react";
import "./Header.css";

import { FaArrowCircleDown } from "react-icons/fa";
interface HeaderProps {
  aboutRef: React.RefObject<HTMLDivElement | null>;
}
const Header = ({ aboutRef }: HeaderProps) => {
  const [init, setInit] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log("Page scroll: ", latest);
  });


  // const scrollToBottom = () => {
  //   aboutRef.current?.scrollIntoView({
  //     block: "end",
  //     behavior: "smooth",
  //   });
  // };

  function scrollToRef(duration = 900) {
    if (!aboutRef.current) return;
    const targetY = aboutRef.current.getBoundingClientRect().top + window.scrollY;
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start: number;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);
      window.scrollTo(0, startY + diff * percent);
      if (time < duration) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const particlesLoaded = async (container: any) => {
    console.log(container);
  };

  const options = {
    key: "linkTriangles",
    name: "Link Triangles",
    backgroundMask: {
      enable: true,
      cover: {
        color: {
          value: "#000000",
          // value: "#ffffff",
        },
        opacity: 0.7, // Adjust this value to control the darkness of the background
      },
    },
    // background: {
    //   color: {
    //     // img: `url(${Background})`,
    //     value:"#000000"
    //   },
    // },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
        },
      },
      color: {
        value: "#000000",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0,
      },
      size: {
        value: {
          min: 1,
          max: 5,
        },
      },
      links: {
        enable: true,
        distance: 200,
        color: "#000000",
        opacity: 0,
        width: 1,
        triangles: {
          enable: true,
          color: "#ffffff",
          opacity: 0.1,
        },
      },
      move: {
        enable: true,
        speed: 0.5,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 100,
          links: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.8,
        },
        repulse: {
          distance: 200,
        },
        push: {
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
      },
    },
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="header-wrapper"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        height: "100dvh",
        width: "100vw",
        overflow: "clip",
      }}
    >
      <Particles
        id="tsparticles"
        className="header-particles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          // This is the key CSS to add.
          // It will blend the particles canvas with the background image of the header.
          mixBlendMode: "screen",
        }}
      />
      {/* Cloud */}

      <motion.img
        initial={{ opacity: 0, scale: 2, translateY: "0%" }}
        animate={{
          opacity: [1, 0.8, 1, 0.5, 1, 0.2, 1],
          scale: [3, 4, 3],
          translateY: ["0%", "13%", "0%", "14%"],
        }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        src={Cloud}
        alt=""
        className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* NAME + TITLE */}
      {/* <FadeInOnScroll> */}
      <div className="name-title_wrapper relative z-1">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
          className="name"
          style={{ marginInline: ".3em" }}
        >
          Amit Mangat
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="title"
          style={{ margin: "0", color: "white" }}
        >
          [ Software Developer ]
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            delay: 1,
          }}
          className="name-title_scroll-button"
        >
          {/* <Icon className="name-title_scroll-icon " size="large" name="arrow alternate circle down outline" onClick={() => scrollToBottom()} /> */}

          <FaArrowCircleDown
            className="name-title_scroll-icon relative  z-20"
            size={25}
            color=""
            style={{filter : 'invert(1)'}}
            onClick={() => scrollToRef()}
          />
        </motion.div>
      </div>
      {/* </FadeInOnScroll> */}
    </motion.header>

    // </div>
    // </div>
  );
};

export default Header;
