import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";


function Header() {
  const desktopContainerRef = useRef(null);
  const desktopTextRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const mobileTextRef = useRef(null);

  let desktopAnimation = useRef(null);
  let mobileAnimation = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const menuRef = useRef(null);
  const blurOverlayRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      gsap.to(line1Ref.current, { rotate: 45, y: 6, duration: 0.3 });
      gsap.to(line2Ref.current, { rotate: -45, y: -6, duration: 0.3 });
      gsap.to(menuRef.current, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(blurOverlayRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(line1Ref.current, { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(line2Ref.current, { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(menuRef.current, { y: -20, opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(blurOverlayRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" });
    }
  }, [isOpen]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(desktopTextRef.current, { y: 0 });
      gsap.set(mobileTextRef.current, { y: 0 });
    }, desktopContainerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnterDesktop = () => {
    if (desktopAnimation.current) desktopAnimation.current.kill();
    desktopAnimation.current = gsap.to(desktopTextRef.current, {
      y: "-200%",
      duration: 10,
      repeat: -1,
      ease: "linear"
    });
  };

  const handleMouseLeaveDesktop = () => {
    if (desktopAnimation.current) desktopAnimation.current.kill();
    gsap.to(desktopTextRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseEnterMobile = () => {
    if (mobileAnimation.current) mobileAnimation.current.kill();
    mobileAnimation.current = gsap.to(mobileTextRef.current, {
      y: "-200%",
      duration: 10,
      repeat: -1,
      ease: "linear"
    });
  };

  const handleMouseLeaveMobile = () => {
    if (mobileAnimation.current) mobileAnimation.current.kill();
    gsap.to(mobileTextRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const location = useLocation(); // Get current route
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(location.pathname); // Set active state based on URL
  }, [location.pathname]);

  return (
    <>
     <div
  ref={blurOverlayRef}
  className={`fixed top-0 left-0 w-full h-full  bg-black/30 backdrop-blur-lg opacity-0 transition-all duration-5 
    ${isOpen ? "opacity-100 pointer-events-auto z-[49]" : "opacity-0 pointer-events-none"}`}
></div>

      <div className="bg-black xl:bg-white/1 text-white h-20px xl:fixed z-[50]">
        {/* Header - Desktop */}
        <header className="xl:flex xl:flex-col relative p-6 text-sm hidden h-screen">
        <nav className="space-x-6 flex">
      {[
        { name: "Home", path: "/" },
        { name: "Work", path: "/work" },
        { name: "Contact", path: "/contact" }
      ].map((link) => (
        <a
          key={link.name}
          href={link.path}
          className={`relative transition-colors duration-300 group 
            ${active === link.path ? "text-gray-400" : "text-white"} 
            hover:text-gray-400`}
        >
          {link.name}
        </a>
      ))}
    </nav>
          <div className="text-gray-400 absolute right-5 items-center">
            Filter: <span className="text-white">All ▾</span>
          </div>
          <div className="flex items-center py-68  text-white text-4xl font-bold">
            <span>WE GO </span>
            <div
              ref={desktopContainerRef}
              className="relative overflow-hidden h-[60px] w-[190px] ml-2"
              onMouseEnter={handleMouseEnterDesktop}
              onMouseLeave={handleMouseLeaveDesktop}
            >
              <div ref={desktopTextRef} className="flex flex-col text-4xl leading-[60px]">
                {[...Array(15)].map((_, index) => (
                  <span key={index} className="block">AGAIN</span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[16px] leading-tight">
            A creative development studio founded by a former <br />
            engineer & an award-winning designer. We know code.
          </p>
        </header>

        {/* Header - Mobile */}
        <div className="flex justify-between items-center xl:hidden p-4 ">
          <div className="logo text-2xl flex items-center z-100">
            <span>We Go</span>
            <div
              ref={mobileContainerRef}
              className="relative overflow-hidden h-[30px] w-[80px] ml-2 flex items-center justify-start"
              onMouseEnter={handleMouseEnterMobile}
              onMouseLeave={handleMouseLeaveMobile}
            >

              <div ref={mobileTextRef} className="flex flex-col items-center">
                {[...Array(15)].map((_, index) => (
                  <span key={index} className="block w-full text-center">Again</span>
                ))}
              </div>
            </div>
          </div>
          <div className="menu-bar z-50 ">
            <button className=" flex flex-col z-51 items-center gap-2"
              onClick={() => setIsOpen(!isOpen)}>
              <div ref={line1Ref} className="line-1 w-8 h-[1px] bg-white"></div>
              <div ref={line2Ref} className="line-2 w-8 h-[1px] bg-white"></div>
            </button>
            <div
  ref={menuRef}
  className={`absolute h-full w-full overflow-x-hidden top-0 flex-col left-1/2 -translate-x-1/2 flex text-lg opacity-0 p-4 
    ${isOpen ? "z-[51]" : "z-[-1]"}`}
>

              <div className=" absolute py-68 flex text-[6vw] gap-28">
                <a href="/" className="hover:text-gray-400">Home</a>
                <a href="/work" className="hover:text-gray-400">Work</a>
                <a href="/contact" className="hover:text-gray-400">Contact</a>
              </div>

              <p className="text-[16px] leading-tight bottom-5 absolute">
                A creative development studio founded by a former <br />
                engineer & an award-winning designer. We know code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
