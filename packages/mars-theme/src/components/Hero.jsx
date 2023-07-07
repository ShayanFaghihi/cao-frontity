import React from "react";

import magnifierIcon from "../static/icons/magnifier.svg"
import filterIcon from "../static/icons/filter.svg"

const Hero = () => {
  return (
    <section className="hero-box">
      <h2 className="subtitle">Create App Online</h2>
      <h1 className="heading">
        Accelerate your app with low code development.
      </h1>
      <p className="tagline">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex similique
        est vero ad quibusdam. Quisquam at libero iure quidem impedit.
      </p>
      <form className="search-form">
        <label>
          <img src={magnifierIcon} alt="Magnifier Icon" />
        </label>
        <input type="search" placeholder="Search" />
        <button type="submit">
          Search
          <span>
            <img src={filterIcon} alt="Filter Icon" />
          </span>
        </button>
      </form>
    </section>
  );
};

export default Hero;
