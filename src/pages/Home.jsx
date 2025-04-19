import React, { useEffect, useRef, useState } from "react";
import prjImg1 from "../assets/prj-1.png";
import prjImg2 from "../assets/prj-2.png";
import prjImg3 from "../assets/prj-3.png";
import prjImg4 from "../assets/prj-4.png";
import prjImg5 from "../assets/prj-5.png";
import prjImg6 from "../assets/prj-6.png";
import prjImg8 from "../assets/prj-8.png";
import prjImg9 from "../assets/prj-9.png";
import prjImg10 from "../assets/prj-10.png";

const InfiniteScroller = () => {
  const scrollContainerRef = useRef(null);
  const imageRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const images = [
    { src: prjImg1, title: "Landing Page" },
    { src: prjImg2, title: "Three Js Animation" },
    { src: prjImg3, title: "Lenis the Scroll" },
    { src: prjImg4, title: "Transition on Point" },
    { src: prjImg5, title: "Smooth Landing Page" },
    { src: prjImg6, title: "Three Js" },
    { src: prjImg8, title: "Lenis Smooth Scroll" },
    { src: prjImg9, title: "Not Found" },
    { src: prjImg10, title: "Smooth Scroll" },
  ];

  const loopedImages = [...images, ...images, ...images];

  // Infinite vertical loop logic
  useEffect(() => {
    const slider = scrollContainerRef.current;
    const scrollHeight = slider.scrollHeight / 3;

    slider.scrollTop = scrollHeight;

    const handleScroll = () => {
      if (slider.scrollTop <= 0) {
        slider.scrollTop = scrollHeight;
      } else if (slider.scrollTop >= scrollHeight * 2) {
        slider.scrollTop = scrollHeight;
      }
    };

    slider.addEventListener("scroll", handleScroll);
    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Detect centered image using IntersectionObserver
  useEffect(() => {
    const options = {
      root: scrollContainerRef.current,
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index")) % images.length;
          setActiveIndex(index);
        }
      });
    }, options);

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [loopedImages]);

  return (
    <div className="relative w-full h-screen bg-black text-white flex overflow-hidden">
      {/* Scrollable Images Column */}
      <div
        ref={scrollContainerRef}
        className="w-2/3 h-screen overflow-y-scroll no-scrollbar relative"
      >
        <div
          id="scroll-content"
          className="flex flex-col gap-24 py-20 items-center left-1/2 translate-x-1/4"
        >
          {loopedImages.map((img, i) => {
            const isActive = i % images.length === activeIndex;
            return (
              <div
                key={i}
                data-index={i}
                ref={(el) => (imageRefs.current[i] = el)}
                className={`flex justify-center items-center transition-all duration-700 ease-in-out transform ${
                  isActive ? "scale-110 opacity-100" : "scale-95 opacity-50"
                }`}
              >
                <img
                  src={img.src}
                  alt={`Image ${i + 1}`}
                  className="w-60 h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Titles */}
      <div className="w-1/3 h-screen flex flex-col justify-center items-end pr-8 sticky top-0 leading-7 hover:text-white ">
        {images.map((img, i) => (
          <h1
            key={i}
            className={`text-[33px] font-bold transition-colors duration-300 ${
              i === activeIndex ? "text-white" : "text-gray-500"
            }`}
          >
            {img.title}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroller;
