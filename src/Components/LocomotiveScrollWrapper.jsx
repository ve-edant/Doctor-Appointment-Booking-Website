// LocomotiveScrollWrapper.jsx
import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

const LocomotiveScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);
  const scroll = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    scroll.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    // Cleanup on component unmount
    return () => {
      if (scroll.current) {
        scroll.current.destroy();
      }
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
};

export default LocomotiveScrollWrapper; // Ensure this is present
