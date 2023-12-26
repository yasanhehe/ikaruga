import React from 'react';
import Navigation from '../components/Navigation';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      {/* Your main content */}
      <p>This is the main content of your app.</p>
      <Navigation />
    </div>
  );
};

export default Home;

