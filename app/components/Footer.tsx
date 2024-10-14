import Link from 'next/link';
import React from 'react';
import Image from 'next/image'

const Footer = () => {
    return (
      <footer className="bg-cusBlue p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between text-white text-xl space-y-8 lg:space-y-0 lg:space-x-8">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/IndigoStudios-White.png"
            alt="Indigo Studios"
            width={70}
            height={70}
            className="mr-2"
          />
        </Link>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row font-araboto">
          <div className="flex flex-col mr-8">
            <h3 className="font-bold mb-2 text-base">Quick Links</h3>
            <Link href="/" className="hover:text-gray-200 font-thin text-sm">Home</Link>
            <Link href="/Services" className="hover:text-gray-200 font-thin text-sm">Services</Link>
            <Link href="/About" className="hover:text-gray-200 font-thin text-sm">About Us</Link>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold mb-2 text-base text-[#4B27A8]">More Links</h3>
            <Link href="/FAQs" className="hover:text-gray-200 font-thin text-sm">FAQs</Link>
            <Link href="/Checkstatus" className="hover:text-gray-200 font-thin text-sm">Check Status</Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row font-araboto">
          <div className="flex flex-col mr-8">
            <h3 className="font-bold mb-2 text-base">Contact Us</h3>
            <Link
              href="https://www.google.com/maps/search/?api=1&query=Finasia+Homes+San+Antonio+Valley+1+Sucat+Parañaque+City"
              target="_blank"
              className="hover:text-gray-200 font-thin text-sm"
            >
              📍 Finasia Homes,<br />San Antonio Valley 1 Sucat,<br /> Parañaque City
            </Link>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold mb-2 text-base text-[#4B27A8]">More Info</h3>
            <Link href="sms:+639696475564" className="hover:text-gray-200 font-thin text-sm">📞 0969 647 5564</Link>
            <Link href="mailto:indigostudiosph@gmail.com" className="hover:text-gray-200 font-thin text-sm">📧 indigostudiosph@gmail.com</Link>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-center space-x-4">
          <Link href="https://www.facebook.com/indigostudiosph" target="_blank" className="hover:text-gray-200">
            <Image src="/white_fb.png" alt="Facebook" width={35} height={35} />
          </Link>
          <Link href="https://www.instagram.com/IndigoStudiosPH" target="_blank" className="hover:text-gray-200">
            <Image src="/indigo_ig.png" alt="Instagram" width={55} height={55} />
          </Link>
          <Link
            href="https://open.spotify.com/user/314v4jyl6icoo6g46bxi2o7asxae?si=228b7120fa234783"
            target="_blank"
            className="hover:text-gray-200"
          >
            <Image src="/indigo_sp.png" alt="Spotify" width={50} height={50} />
          </Link>
        </div>

        {/* Book Now Button */}
        <div className="flex items-center">
          <Link
            href="/Services"
            className="btn bg-white hover:bg-gray-300 py-2 px-4 rounded-[10px] text-[#4B27A8] text-sm sm:text-lg md:text-xl font-araboto font-bold transition duration-300 ease-in-out"
          >
            Book Now
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer