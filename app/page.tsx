import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
    <div className='bg-white p-2'>
      <div>
        INDIGO STUDIOS PH
      </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque  felis 
        est, porttitor vitae dignissim sed, viverra eu ex. Vestibulum  tellus quam, </p>
    </div>
    <div className='flex gap-4'>
      <div className="flex items-center">
        <Link href="/" className="bg-cusBlue hover:bg-purple-700 py-2 px-4 rounded text-white text-2xl font-medium">Book a session</Link>
      </div>
      <div className="flex items-center">
        <Link href="/" className="hover:bg-purple-700 py-2 px-4 rounded text-black text-2xl font-medium box-border border border-cusBlue">View Services</Link>
      </div>
    </div>
    <div className='bg-cusBlue '>
      <div>
        Services
      </div>
      <div className='serviceContainer'>
        <div className='flex gap-4 justify-around'>
          <div>
            <img src="" alt="asa" />
          </div>
          <div>
            <div>Recording</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque  felis est, porttitor vitae dignissim sed, viverra eu </div>
          </div>
          <div>
          from PHP XXX
          </div>
        </div>

      </div>
    </div>
    </>
  )
}
