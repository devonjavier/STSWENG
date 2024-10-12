import Link from 'next/link';
import React from 'react';
import Image from 'next/image'

const Footer = () => {
    return (
      <footer className="bg-cusBlue p-6">
<div className="flex flex-col lg:flex-row justify-start text-white text-xl">

{/* Logo */}
<Link href="/" className="flex items-center space-x-1">
  <Image
    src="/IndigoStudios-White.png"
    alt="Indigo Studios"
    width={70}
    height={70}
    className="mr-2 md:mr-8"
  />
</Link>

{/* Quick Links */}
<div className="flex mb-4 flex-col md:flex-row font-araboto relative" style={{left:'30px'}}>
  <div className="flex flex-col mr-8">
    <h3 className="font-bold mb-2 text-base">Quick Links</h3>
    <Link href="/" className="mr-4 hover:text-gray-200 font-thin text-sm">Home</Link>
    <Link href="/Services" className="mr-4 hover:text-gray-200 font-thin text-sm">Services</Link>
    <Link href="/About" className="mr-4 hover:text-gray-200 font-thin text-sm">About Us</Link>
  </div>

  <div className="flex flex-col">
  <h3 className="font-bold mb-2 text-base text-[#4B27A8]">More Link</h3>
    <Link href="/FAQs" className="mr-4 hover:text-gray-200 font-thin text-sm">FAQs</Link>
    <Link href="/Checkstatus" className="mr-4 hover:text-gray-200 font-thin text-sm">Check Status</Link>
  </div>
</div>

{/* Contact Information */}
<div className="flex mb-4 flex-col md:flex-row font-araboto relative" style={{left:'110px'}}>
  <div className="flex flex-col mr-8">
    <h3 className="font-bold mb-2 text-base">Contact Us</h3>
      <Link href="https://www.google.com/maps/search/?api=1&query=Finasia+Homes+San+Antonio+Valley+1+Sucat+Parañaque+City" target="_blank" className="mr-4 hover:text-gray-200 font-thin text-sm">
      <span className="mr-1">📍</span>
      Finasia Homes<br />
      San Antonio Valley 1 Sucat<br />
      Parañaque City
      </Link>
  </div>
  <div className="flex flex-col">
    <h3 className="font-bold mb-2 text-base text-[#4B27A8]">More Info</h3>
      <Link href="sms:+639696475564" className="mr-4 hover:text-gray-200 font-thin text-sm">📞 0969 647 5564</Link>
      <Link href="mailto:indigostudiosph@gmail.com" className="mr-4 hover:text-gray-200 font-thin text-sm">📧 indigostudiosph@gmail.com</Link>
  </div>  
</div>

{/* Social Media */}
<div className="flex mb-4 flex-row md:flex-row font-araboto relative" style={{left:'200px', bottom: '-35px'}}>
  <div className="flex flex-row">
  <Link href="https://www.facebook.com/indigostudiosph" target="_blank" className="mr-2 hover:text-gray-200">
    <Image
      src="/white_fb.png" 
      alt="Instagram"
      width={35} 
      height={35} 
    />
  </Link>

  <Link href="https://www.instagram.com/IndigoStudiosPH" target="_blank" className="mr-2 hover:text-gray-200 relative" style={{bottom: '10px'}}>
    <Image
      src="/indigo_ig.png" 
      alt="Instagram"
      width={55} 
      height={55} 
    />
  </Link>

  <Link href="https://open.spotify.com/user/314v4jyl6icoo6g46bxi2o7asxae?si=228b7120fa234783" target="_blank" className="mr-2 hover:text-gray-200 relative" style={{bottom: '8px', left:'-8px'}}>
    <Image
      src="/indigo_sp.png" 
      alt="Instagram"
      width={50} 
      height={50} 
    />
  </Link>
  </div> 
</div>

<div className="flex mb-4 flex-row md:flex-row font-araboto relative" style={{left:'300px', bottom: '-30px'}}>
  <div className="flex flex-row">
    <Link href="/Services" className="btn bg-white hover:bg-gray-300 py-2 px-4 rounded-[10px] text-[#4B27A8] text-sm sm:text-lg md:text-xl font-araboto font-bold transition duration-300 ease-in-out delay-300">
      Book Now
    </Link>
  </div>
</div>

</div>
      </footer>
    )
  }

export default Footer