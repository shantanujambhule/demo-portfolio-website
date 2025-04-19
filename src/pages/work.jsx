import React, { useEffect, useRef, useState } from 'react';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import galleryItems from "../data.js";

// Import all images
import prj1 from '../assets/prj-1.png';
import prj2 from '../assets/prj-2.png';
import prj3 from '../assets/prj-3.png';
import prj4 from '../assets/prj-4.png';
import prj5 from '../assets/prj-5.png';
import prj6 from '../assets/prj-6.png';
import prj7 from '../assets/prj-7.png';
import prj8 from '../assets/prj-8.png';
import prj9 from '../assets/prj-9.png';
import prj10 from '../assets/prj-10.png';

const images = [prj1, prj2, prj3, prj4, prj5, prj6, prj7, prj8, prj9, prj10];

const Work = () => {
  const galleryRef = useRef(null);
  const blurLayerRef = useRef(null);
  const projectRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const animating = useRef(false);

  const createSplitText = (element) => {
    const split = new SplitType(element, { types: 'lines' });
    element.innerHTML = '';
    split.lines.forEach(line => {
      const div = document.createElement('div');
      div.classList.add('line');
      const span = document.createElement('span');
      span.textContent = line.textContent;
      div.appendChild(span);
      element.appendChild(div);
    });
  };

  const buildProjectDOM = (item, index) => {
    const container = document.createElement("div");
    container.className = "project-details";

    const titleWrap = document.createElement("div");
    titleWrap.className = "title";
    const h1 = document.createElement("h1");
    h1.textContent = item.title;
    titleWrap.appendChild(h1);

    const infoWrap = document.createElement("div");
    infoWrap.className = "info";
    const p = document.createElement("p");
    p.textContent = item.description;
    infoWrap.appendChild(p);

    const creditsWrap = document.createElement("div");
    creditsWrap.className = "credits";
    creditsWrap.innerHTML = `
      <p>Credits</p>
      <p>Idea: ${item.director}</p>
      <p>TechDirector: ${item.cinematographer}</p>
    `;

    container.appendChild(titleWrap);
    container.appendChild(infoWrap);
    container.appendChild(creditsWrap);

    const imageContainer = document.createElement("div");
    imageContainer.className = "project-img absolute left-4 bottom-4 w-[80%] h-[60%] overflow-hidden";
    const img = document.createElement("img");
    img.src = images[index];
    img.alt = item.title;
    img.className = "h-full w-[60%] object-cover";
    imageContainer.appendChild(img);

    return { container, imageContainer, infoParagraph: p };
  };

  const handleItemClick = (index) => {
    if (animating.current) return;
    animating.current = true;
    const item = galleryItems[index];

    // Highlight active image
    const allItems = galleryRef.current.querySelectorAll(".item");
    allItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    const prevDetails = document.querySelector(".project-details");
    const animateOut = prevDetails?.querySelectorAll(".title h1, .info p, .line span, .credits p");

    gsap.to(animateOut, {
      y: -60,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.08,
      onComplete: () => {
        prevDetails?.remove();
      },
    });

    const newBlur = document.createElement("img");
    newBlur.src = images[index];
    newBlur.alt = item.title;
    newBlur.className = "absolute inset-0 w-full h-full object-cover opacity-0";
    blurLayerRef.current.insertBefore(newBlur, blurLayerRef.current.firstChild);

    const oldBlur = blurLayerRef.current.querySelector("img:nth-child(2)");
    if (oldBlur) {
      gsap.to(oldBlur, {
        opacity: 0,
        duration: 1,
        // delay: 0.5,
        ease: "power2.inOut",
        onComplete: () => oldBlur.remove()
      });
    }

    gsap.to(newBlur, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    });

    const { container, imageContainer, infoParagraph } = buildProjectDOM(item, index);

    // Remove previous image container
    const oldImgContainer = projectRef.current.querySelector(".project-img");
    oldImgContainer?.remove();

    projectRef.current.appendChild(container);
    projectRef.current.appendChild(imageContainer);

    createSplitText(infoParagraph);

    const toAnimateIn = container.querySelectorAll(".title h1, .info p, .line span, .credits p");

    gsap.fromTo(toAnimateIn, {
      y: 40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      stagger: 0.1,
      onComplete: () => {
        animating.current = false;
        setActiveIndex(index);
      }
    });

    gsap.fromTo(imageContainer, {
      scale: 1.8,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power4.out"
    });
  };

  useEffect(() => {
    galleryItems.forEach((item, i) => {
      const div = document.createElement("div");
      div.className = `item p-2 cursor-pointer hover:scale-105 transition ${i === 0 ? 'active' : ''}`;
      div.dataset.index = i;

      const img = document.createElement("img");
      img.src = images[i];
      img.alt = item.title;
      img.className = "w-full object-cover mb-2";

      div.appendChild(img);
      div.addEventListener("click", () => handleItemClick(i));
      galleryRef.current.appendChild(div);
    });

    // Init with first item
    const { container, imageContainer, infoParagraph } = buildProjectDOM(galleryItems[0], 0);
    projectRef.current.appendChild(container);
    projectRef.current.appendChild(imageContainer);
    createSplitText(infoParagraph);

    const toAnimateIn = container.querySelectorAll(".title h1, .info p, .line span, .credits p");

    gsap.fromTo(toAnimateIn, {
      y: 40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      stagger: 0.1,
    });

    gsap.fromTo(imageContainer, {
      scale: 1.8,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power4.out"
    });

  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white font-sans">
      <div ref={blurLayerRef} className="blur-prev absolute top-0 left-0 w-full h-full z-0">
        <img src={images[0]} className="absolute inset-0 w-full h-full object-cover" alt="bg" />
      </div>

      <div className="overlay absolute inset-0 bg-black/85 backdrop-blur-sm z-10"></div>

      <div className="flex relative z-20 h-full ">
        {/* Details section */}
        <div ref={projectRef} className="project-prev relative flex-1 px-8 py-12 overflow-hidden border-l-2 border-white/10 translate-x-1/3">
        </div>

        {/* Gallery vertical scroll */}
        <div className="gallery-wrap w-24 h-full overflow-y-auto bg-white/5 border-l border-white/10">
          <div ref={galleryRef} className="gallery flex flex-col h-full gap-4 p-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Work;
