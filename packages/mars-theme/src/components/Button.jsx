import React from "react";
import Link from "./link"

const Button = (props) => {
  return (
    <Link link={props.target} className={props.classes}>
      {props.children}
    </Link>
  );
};

export default Button;
