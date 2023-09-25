import React, { useRef } from "react";
import { connect } from "frontity";
import magnifierIcon from "../static/icons/magnifier.svg";
import filterIcon from "../static/icons/filter.svg";

const SearchField = ({ libraries, state, actions }) => {
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
    <form
      className="search-form"
      role="search"
      aria-label="search app builders"
      onSubmit={handleSubmit}
    >
      <label>
        <img src={magnifierIcon} alt="Magnifier Icon" />
      </label>
      <input
        type="search"
        placeholder="Search"
        defaultValue={searchQuery}
        ref={inputRef}
      />
      <button type="submit">
        Search
        <span>
          <img src={filterIcon} alt="Filter Icon" />
        </span>
      </button>
    </form>
  );
};

export default connect(SearchField);
