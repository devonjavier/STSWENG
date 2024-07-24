import React from 'react';
import CardSlider from './cards';

const App: React.FC = () => {
  const cards = [
    { image: '/five_stars.png', text1: 'Sean A.', text2: 'The experience I had with Indigo Studios PH was Outstanding! The services are great and the final product had exceeded beyond my expectations! Thank you!' },
    { image: '/five_stars.png', text1: 'Vincenzo M.', text2: 'Sir Erik really focused on quality and gave good directions/suggestions for tracks. Mixing is also spot on with top notch equipment giving out stellar and crisp studio professional quality.' },
    { image: '/five_stars.png', text1: 'Arabelle B.', text2: 'First time kong makapagrecording sa mismong studio, and sobrang nag-enjoy ako sa Indigo Studios PH. Quality yung equipments nila and na achieve yung gusto namin.' },
    { image: '/five_stars.png', text1: 'Madz J.', text2: 'Erik is very patient and does what a client wants to beautify the sound for their music, never complain. I recommend his studio  to everyone. Thank you again Erik!' },
    { image: '/five_stars.png', text1: 'John Q.', text2: 'Precise and clear if you have mistakes during takes! Necessary for any starting for any starting artists or groups. Kudos to the ambient vibe of the place and kind engineer who is an artist too!' },
    { image: '/five_stars.png', text1: 'Owen G.', text2: 'Erik works efficiently. He is very engaged and helps me a lot to make my songs even better. Definitely going back here!' },
  ];

  return (
    <div className="items-center text-center">
        <div className="text-cusBlue text-4xl font-semibold">
            The Testimonials
        </div>
        <div className="text-black text-2xl font-semibold pb-5"> 
            What they say about us
        </div>
      <CardSlider cards={cards} />
    </div>
  );
};

export default App;
