import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-cusBlue p-6">
        <div className="flex flex-row justify-around text-white text-xl font-medium">
          <div className="flex mb-4 flex-col">
            <Link href="https://www.facebook.com/indigostudiosph" target="_blank" className="mr-4 hover:text-gray-200 ">FACEBOOK</Link>
            <Link href="https://www.instagram.com/IndigoStudiosPH" target="_blank" className="mr-4 hover:text-gray-200">INSTAGRAM</Link>
            <Link href="https://open.spotify.com/user/314v4jyl6icoo6g46bxi2o7asxae?si=228b7120fa234783" target="_blank" className="mr-4 hover:text-gray-200">SPOTIFY</Link>
          </div> 
          
          <div className="flex mb-4 flex-col">
            <Link href="" className="mr-4 hover:text-gray-200">Finasia Homes</Link>
            <Link href="" className="mr-4 hover:text-gray-200">San Antonio Valley 1 Sucat</Link>
            <Link href="" className="mr-4 hover:text-gray-200">PHILIPPINES</Link>
          </div>
          <div className="flex flex-col">
            <Link href="/contact" className="mr-4 hover:text-gray-200">CONTACT US</Link>
            <Link href="" className="mr-4 hover:text-gray-200">0969 647 5564</Link>
            <Link href="" className="mr-4 hover:text-gray-200">indigostudiosph@gmail.com</Link>
          </div>
        </div>
      </footer>
    )
  }

export default Footer