import React from "react";

const UI = (props) => {
  return (
    <main>
      <div className="container">{props.children}</div>
    </main>
  );
};

export default UI;
