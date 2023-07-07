import React, { useContext } from "react";
import CompareContext from "../context/compare-context";

import Button from "./Button";

const CompareFooter = ({visible}) => {
  const compareCtx = useContext(CompareContext)

  return (
    <section className={!visible ? "sticky-compare-box" : "sticky-compare-box visible"}>
      <Button
        target={`/compare/${compareCtx.appBuildersToCompare.app1Name}/${compareCtx.appBuildersToCompare.app2Name}`}
        classes="cta-btn"
      >
        Compare
      </Button>
    </section>
  );
};

export default CompareFooter;
