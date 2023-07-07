import React from "react";
import Link from "./link";

import arrowIcon from "../static/icons/arrow-left.svg"

const Navigation = (props) => {
  return (
    <section className="navigator-section">
      <Link link="/">
        <img src={arrowIcon} alt="" />
      </Link>
      <h1>{props.pageTitle}</h1>
    </section>
  );
};

export default Navigation;
