
import React from 'react';

const about = () => {
    return (
      <div> 
        <div
                className="bg-cover bg-center h-screen flex flex-col justify-end relative pb-32 pl-16 mx-auto"
                style={{ backgroundImage: "url('/about_bg.png')" }}
            >
                <div className="flex-col text-white pb-64 pl-4">
                    <div className="font-bold text-5xl">
                        About Us
                    </div>

                    <div className="flex w-full md:w-6/12 text-lg my-4">
                        Indigo Studios PH is a high end music production studio based in Parañaque and currently the best recording studio in the area. 
                        Duly registered in DTI and BIR, we assure our clients the best possible quality at an affordable price. 
                        With award winning engineers and producers, our services assures that your life’s work is “clearly” heard 
                        and is given the justice and quality it deserves.
                    </div>
                </div>
            </div>
          <div className ="flex-col bg-cusBlue text-white m-0 px-20 py-8"> 

            <div className = "font-bold italic text-5xl ">
              How we started...
            </div>

            <div className = "flex w-11/12 text-lg my-4" >
            The company was founded on April 30, 2021 by Erik Villanueva, an artist with a home studio. 
            His studio was originally made for personal use only, but then COVID pandemic came and the idea came 
            to let other people rent the home studio which then became Indigo Studios PH.
            </div>
          </div>

          <div className ="flex-col bg-white text-white m-0 px-16 py-16 "> 

            <div className = "pl-6 font-bold text-5xl text-cusBlue">
              The Team
            </div>

            <div className='flex justify-center px-16 pb-5 pt-8'>
              <div className='border-b-2 w-[1200px] pb-5'>
                <div className='flex items-center gap-2'>
                  <img className='w-[180px] h-[180px] bg-zinc-300 rounded-[10px]' src="erik.png" alt="Erik Villanueva" />
                  <div className='flex flex-col justify-end pb-3 pl-5'>
                    <div className='text-cusBlue text-[32px] text-2xl font-bold'>Erik Villanueva</div>
                    <div className='w-[700px] text-cusBlue text-lg font-medium italic'>Founder/Owner/Manager, Head Recording Engineer/Mix and Mastering Engineer</div>
                    <div className='w-[900px] text-cusBlue text-lg font-light'>As the founder and owner, he manages Indigo Studios PH and also heads the recording and mix/mastering 
                      engineering. Aside from producing for other artists, he has found his footing as an individual artist.</div>
                    <div className='flex gap-2 mt-4'>  
                      <a href="https://www.facebook.com/erikmcvillanueva" target="_blank" rel="noopener noreferrer">
                        <img className='bg-white w-[30px] h-[30px] object-fill rounded-[5px]' src="indigo_fb.png" alt="facebook" />
                      </a>
                      <a href="https://www.instagram.com/erikcvillanueva" target="_blank" rel="noopener noreferrer">
                        <img className='bg-zinc-300 w-[30px] h-[30px] object-fill rounded-[5px]' src="indigo_ig.png" alt="instagram" />
                      </a>
                      <a href="https://open.spotify.com/artist/4cWuxVZWKH9jPX74eYip2E?si=iFxmXpWYRVi1f2WQ_m_W6A" target="_blank" rel="noopener noreferrer">
                        <img className='bg-zinc-300 w-[30px] h-[30px] object-fill rounded-[5px]' src="indigo_sp.png" alt="spotify" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-center px-16 pb-5 pt-8'>
              <div className='border-b-2 w-[1200px] pb-5'>
                <div className='flex items-center gap-2'>
                  <img className='w-[180px] h-[180px] bg-zinc-300 rounded-[10px]' src="charles.jpg" alt="Charles Soriano" />
                  <div className='flex flex-col justify-end pb-3 pl-5'>
                    <div className='text-cusBlue text-[32px] text-2xl font-bold'>Charles Vincent Soriano</div>
                    <div className='w-[682px] text-cusBlue text-lg font-medium italic'>Senior Engineer/Producer</div>
                    <div className='w-[900px] text-cusBlue text-lg font-light'>The one that records and engineers for clients when the owner is not around, he is also the head in production department for clients. He has recorded and producer for big artists in the industry.</div>
                    <div className='flex gap-2 mt-4'> 
                      <a href="https://www.facebook.com/me.CharleSoriano" target="_blank" rel="noopener noreferrer">
                        <img className='bg-white -[30px] h-[30px] object-fill rounded-[5px]' src="indigo_fb.png" alt="facebook" />
                      </a>
                      <a href="https://www.instagram.com/lofidelxcharleebooy/" target="_blank" rel="noopener noreferrer">
                        <img className='bg-zinc-300 w-[30px] h-[30px] object-fill rounded-[5px]' src="indigo_ig.png" alt="instagram" />
                      </a>
                      <a href="https://www.facebook.com/lofidelmusics" target="_blank" rel="noopener noreferrer">
                        <img className='bg-zinc-300 w-[30px] h-[30px] object-fill rounded-[5px]' src="indigo_lf.png" alt="lo fidel" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
    )
  }

export default about;