import React, { useEffect, useRef } from "react";
import './FadeInOnScroll.css'
const FadeInOnScroll = ({ children }, delay = 0) => {
    const targetRef = useRef(null);
    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");
                    } else {
                        entry.target.classList.remove("fade-in");
                    }
                });
            },
            { threshold: [.1, .1, .1] }
        )
    );

    useEffect(() => {
        if (!targetRef.current) return;
        observer.current.observe(targetRef.current);
        return () => {
            if (targetRef.current) observer.current.unobserve(targetRef.current);
        };
    }, [targetRef.current]);

    return (
        <div ref={targetRef} className="fade-in-target">
            {children}
        </div>
    );
};

export default FadeInOnScroll;