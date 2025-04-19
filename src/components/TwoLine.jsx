import { galleryItems } from "../data";

document.addEventListener("DOMContentLoaded", () => {
  const gallary = document.querySelector(".gallary");
  const blurPrev = document.querySelector(".blur-prev");
  const projectPrev = document.querySelector(".project-prev");

  let activeItemIndex = 0;
  let iSAnimating = false;

  function createSplitText(element) {
    const splitText = new SplitType(element, { types: 'lines' });
    element.innerHTML = '';
    splitText.lines.forEach((line) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'line';
      const lineSpan = document.createElement('span');
      lineSpan.textContent = line.textContent;
      lineDiv.appendChild(lineSpan);
      element.appendChild(lineDiv);
    });
  }

  const initialInfoText = document.querySelector('.info p');
  if (initialInfoText) {
    createSplitText(initialInfoText);
  }

  const elementsToAnimate = document.querySelectorAll(
    '.title h1, .info p, .line span, .credits p, .idea p, .tech p'
  );
  gsap.set(elementsToAnimate, {
    y:0,
  });

  for (let i = 0; i < galleryItems.length; i++) {
    const itemDiv = document.createElement("div");
    itemDiv.className .add("item");
    if (i === 0) itemDiv.classList.add("active");
    
    const img = document.createElement("img");
    img.src = `./assets/prj-${i +1}.png`;
    img.alt = galleryItems[i].title;

    itemDiv.appendChild(img);
    itemDiv.dataset.index = i;
    itemDiv.addEventListener("click", () => handelItemClick(i));
    gallary.appendChild(itemDiv);
  }    

  function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  }

  function createProjectDetails (activeItem, index){
    const newProjectDetails = createElementWithClass("div", "project-details");
    const detailsStructure = [
      {className: "title", tag:"h1", content: activeItem.title},
      {className: "info", tag:"p", content: activeItem.description},
      {className: "credits", tag:"p", content: "Credits"},
      {className: "idea", tag:"p", content: `Idea: ${activeItem.director}`},
      {className: "tech", tag:"p", content: `TechDirector:${activeItem.cinematographer}`},

    ]

    detailsStructure.forEach(({className, tag, content}) => {
      const div = createElementWithClass("div", className);
      const element = document.createElement(tag);
      element.textContent = content;
      div.appendChild(element);
      newProjectDetails.appendChild(div);
    })

    const newProjectImg = createElementWithClass("div", "project-img");
    const newImg = document.createElement("img");
    newImg.src = `./assets/prj-${index + 1}.png`;
    newImg.alt = activeItem.title;
    newProjectImg.appendChild(newImg);

    return {
      newProjectDetails,
      newProjectImg,
      infoP: newProjectDetails.querySelector(".info p"),
    }
  }

  function handelItemClick(index) {
    if (index === activeItemIndex || iSAnimating) return;
    iSAnimating = true; 
    const activeItem = galleryItems[index];
    
    gallary.children[activeItemIndex].classList.remove("active");
    gallary.children[index].classList.add("active");
    activeItemIndex = index;

    const  elementToAnimate = document.querySelectorAll(
      ".title h1, .info p, .line span, .credits p, .idea p, .tech p"
    );
    
    const currentProjectImgElm = document.querySelector("img");
    const currentProjectImg = document.querySelector(".project-img");
    
    const newBluryImg = document.createElement("img");
    newBluryImg.src = `./assets/prj-${index + 1}.png`;
    newBluryImg.alt = activeItem.title;
    gsap.set(newBluryImg, {
      opacity: 0,
      postion: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    });

blurPrev.inserBefore(newBluryImg, blurPrev.firstChild);
const currentBlurryImg = blurPrev.querySelector("img:nth-child(2)")
if (currentBlurryImg) {
  gsap.to(currentBlurryImg, {
    opacity: 0,
    duration:1,
    delay:0.5,
    ease:"power2.inOut",
    onComplete: () => blurPrev.removeChild(currentBlurryImg),
    
  });
}

gsap.to(newBluryImg, {
  opacity: 1,
  duration:1,
  delay:0.5,
  ease:"power2.inOut",
});

gsap.to(elementToAnimate, {
  y:-60,
  duratuon:1,
  ease:"power4.in",
  stagger:0.2,
})

gsap.to(currentProjectImg, {
  onStart:() =>{
    gsap.to(currentProjectImgElm,{
      scale:2,
      duration:1,
      ease:"power4.in",
    
    })
  },
  scale:0,
  duration:1,
  ease:"power4.in",
  bottom:"10em",
  onComplete:() => {
    document.querySelector(".project-details")?.remove();
    currentBlurryImg.remove();

    const {newProjectDetails, newProjectImg, infoP} = createProjectDetails(activeItem, index);
    projectPrev.appendChild(newProjectDetails);
    projectPrev.appendChild(newProjectImg);
    
    createSplitText(infoP);

    const newElementToAnimate = newProjectDetails.querySelectorAll(
    ".title h1, .info p, .line span, .credits p, .idea p, .tech p"
  );
    
      gsap.fromTo(newElementToAnimate, {y:40}, {
        y:0,
        duration:1,
        ease:"power4.out",
        stagger:0.5,
      }
        )

        gsap.fromTo(newProjectImg, {scale:0, bottom:"-10em"}, {
          scale:1,
          duration:1,
          bottom:"1em",
          ease:"power4.out",
        })
        gsap.fromTo(newProjectImg.querySelector("img"), {sacle:2}, {
          scale:1,
          duration:1,
          ease:"power4.out",
          onComplete:() =>{
            iSAnimating = false;
          }
          }
        )
  }
})
  }
})