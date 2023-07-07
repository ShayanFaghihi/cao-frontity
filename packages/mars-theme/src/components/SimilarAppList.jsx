import React from "react";
import AppsList from "./list/AppsList"
import Button from "./Button"

import magnifierIcon from "../static/icons/magnifier.svg"

const SimilarAppList = () => {
  return (
    <section className="similar-apps-section">
      <div className="heading">
        <h2>Similar Apps</h2>
        <form>
          <input type="search" placeholder="Search" />
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

export default SimilarAppList;
