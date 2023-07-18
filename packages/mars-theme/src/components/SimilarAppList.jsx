import React, { useRef } from "react";
import { connect } from "frontity";
import AppsList from "./list/AppsList";
import Button from "./Button";

import magnifierIcon from "../static/icons/magnifier.svg";

const SimilarAppList = ({ state, libraries, actions }) => {
  // Search functionality
  const parse = libraries.source.parse(state.router.link);
  const searchQuery = parse.query["s"];
  // Keep a reference to the input so we can grab it's value on form submission
  const inputRef = useRef();

  const handleSubmit = (event) => {
    // Prevent page navigation
    event.preventDefault();

    // Get the input's value
    const searchString = inputRef.current.value;

    // If the typed search string is not empty
    // Better to trim write spaces as well
    if (searchString.trim().length > 0) {
      // Let's go search for blogs that match the search string
      actions.router.set(`/?s=${searchString.toLowerCase()}`);

      // Scroll the page to the top
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="similar-apps-section">
      <div className="heading">
        <h2>Similar Apps</h2>
        <form
          role="search"
          aria-label="search app builders"
          onSubmit={handleSubmit}
        >
          <input
            type="search"
            placeholder="Search"
            defaultValue={searchQuery}
            ref={inputRef}
          />
          <span>
            <img src={magnifierIcon} alt="" />{" "}
          </span>
        </form>
      </div>
      <AppsList iterationLimit={3} />
      <Button target="/" classes="cta-btn view-more-btn">
        View More
      </Button>
    </section>
  );
};

export default connect(SimilarAppList);
