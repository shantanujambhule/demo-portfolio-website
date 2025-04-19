import React from 'react';
import Cont from "../assets/cont.png";

const Contact = () => {
  return (
    <div className='h-screen w-full md:w-[58%] md:translate-x-[72%] relative px-6 md:px-8 '>
      {/* Vertical Line */}
      <div className='absolute h-full w-[1px] bg-gray-800 hidden md:block left-1'></div>

      {/* Image Section */}
      <div className='w-full'>
        <img className='h-[250px] md:h-[320px] w-full object-cover py-4' src={Cont} alt="Contact" />
      </div>

      {/* Bio Section */}
      <div className="bio text-[15px] md:text-[16px] font-bold leading-tight">
        Our in-house team of designers, developers, and <br className="hidden md:inline" />
        digital strategists collaborates with leading brands, agencies, <br className="hidden md:inline" />
        and startups worldwide to craft cutting-edge web experiences <br className="hidden md:inline" />
        that push the boundaries of design and technology.
      </div>

      {/* Divider */}
      <div className='h-[1px] w-full bg-gray-800 my-4'></div>

      {/* Contact Info */}
      <div className="info flex flex-col gap-4 text-[15px] md:text-[16px]">
        <h1 className='text-lg font-semibold'>Get in touch</h1>
        <p>
          <span className='font-bold'>Email:</span> <br />
          <a 
            href="mailto:hellow@gmail.com" 
            className="text-gray-400 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
          >
            hellow@gmail.com
          </a>
        </p>
        <p>
          <span className='font-bold'>Social:</span> <br />
          <a 
            href="https://instagram.com" 
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Instagram
          </a>
        </p>
        <p>
          <span className='font-bold'>Address:</span> <br />
          Battersea Studios, 28 Silverthorne Rd, Nine Elms, London
        </p>
      </div>
    </div>
  );
};

export default Contact;
