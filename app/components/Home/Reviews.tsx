import React from 'react';
import CardSlider from './cards';

const App: React.FC = () => {
  const cards = [
    { image: '/five_stars.png', text1: 'Card 1', text2: 'Description 1' },
    { image: '/five_stars.png', text1: 'Card 2', text2: 'Description 2' },
    { image: '/five_stars.png', text1: 'Card 3', text2: 'Description 3' },
    { image: '/five_stars.png', text1: 'Card 4', text2: 'Description 4' },
    { image: '/five_stars.png', text1: 'Card 5', text2: 'Description 5' },
    { image: '/five_stars.png', text1: 'Card 6', text2: 'Description 6' },
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
