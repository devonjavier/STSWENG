import { render, screen } from '@testing-library/react';
import Home from '../app/(home)/page';

test('renders the IntroText component with its content', async () => {
  render(await Home());

  const introElement = screen.getByText((content) =>
    content.includes("Experience Sonic Perfection") &&
    content.includes("with Parañaque's Top Music Studio")
  );
  expect(introElement).toBeInTheDocument();
});
