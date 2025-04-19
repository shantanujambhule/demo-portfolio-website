import React, { useEffect, useRef } from "react";
import prjImg1 from "../assets/prj-1.png";
import prjImg2 from "../assets/prj-2.png";
import prjImg3 from "../assets/prj-3.png";

const ImageSlider = () => {
  const sliderRef = useRef(null);

  const images = [
    { src: prjImg1, title: "Smooth Landing Page" },
    { src: prjImg2, title: "Three Js Animation" },
    { src: prjImg3, title: "Lenis Smooth Scroll" },
    { src: prjImg2, title: "Transition on Point" },
    { src: prjImg1, title: "Smooth Landing Page" },
    { src: prjImg2, title: "Three Js Animation" },
    { src: prjImg3, title: "Lenis Smooth Scroll" },
  ];

  const loopedImages = [...images, ...images, ...images]; // for seamless loop

  useEffect(() => {
    const slider = sliderRef.current;
    const scrollWidth = slider.scrollWidth / 3;

    // Start in the middle
    slider.scrollLeft = scrollWidth;

    // Loop logic
    const handleScroll = () => {
      if (slider.scrollLeft <= 0) {
        slider.scrollLeft = scrollWidth;
      } else if (slider.scrollLeft >= scrollWidth * 2) {
        slider.scrollLeft = scrollWidth;
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY;
    };

    slider.addEventListener("scroll", handleScroll);
    slider.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      slider.removeEventListener("scroll", handleScroll);
      slider.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="w-full overflow-x-auto whitespace-nowrap py-6 scrollbar-hide"
    >
      <div className="flex space-x-6 px-4">
        {loopedImages.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 rounded-2xl overflow-hidden shadow-md bg-white"
          >
            <img
              src={item.src}
              alt={`slide-${index}`}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 text-center">
              <p className="text-lg font-medium">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
