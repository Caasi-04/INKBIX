import React from 'react';
import './Home.css'; // Assuming you will create a Home.css for specific styles

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to InkBIX</h1>
        <p>Your one-stop shop for sublimation of shirts, mugs, thermoses, glasses, and jewelry.</p>
      </header>
      <section className="featured-products">
        <h2>Featured Products</h2>
        {/* You can add ProductList component here to display featured products */}
      </section>
      <section className="slogan">
        <h2>Transforming Ideas into Reality</h2>
        <p>Explore our wide range of customizable products!</p>
      </section>
    </div>
  );
};

export default Home;