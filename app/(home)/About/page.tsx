
import React from 'react';

const about = () => {
    return (
      <div> 
          <div className ="flex-col text-cusBlue m-0 px-20 py-16"> 
            <div className = "font-bold text-5xl ">
              About Us
            </div>

            <div className = "flex w-5/12 text-lg my-4 pb-72" >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque  felis 
              est, porttitor vitae dignissim sed, viverra eu ex. Vestibulum  tellus quam, 
              venenatis quis dolor ut, consequat tincidunt nulla.
            </div>
          </div>

          <div className ="flex-col bg-cusBlue text-white m-0 px-20 py-8"> 

            <div className = "font-bold text-5xl ">
              World class in-house engineers
            </div>

            <div className = "flex w-5/12 text-lg my-4" >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque  felis 
              est, porttitor vitae dignissim sed, viverra eu ex. Vestibulum  tellus quam, 
              venenatis quis dolor ut, consequat tincidunt nulla.
            </div>
          </div>

          <div className ="flex-col bg-white text-white m-0 px-16 py-16 "> 

            <div className = "font-bold text-5xl text-cusBlue">
              The Team
            </div>

            <div className = "flex w-5/12 text-lg my-4 pb-40" >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque  felis 
              est, porttitor vitae dignissim sed, viverra eu ex. Vestibulum  tellus quam, 
              venenatis quis dolor ut, consequat tincidunt nulla.
            
            </div>
          </div>
      </div>

    )
  }

export default about;