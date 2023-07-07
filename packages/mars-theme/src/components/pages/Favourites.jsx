import React, { useContext } from "react";
import UI from "../UI";
import Navigation from "../Navigation";
import AppsList from "../list/AppsList";
import CompareFooter from "../CompareFooter";

import CompareContext from "../../context/compare-context";

const Favourites = () => {
  const compareCtx = useContext(CompareContext);

  return (
    <>
      <UI>
        <Navigation pageTitle="Favourites" />
        <AppsList  />
      </UI>
      <CompareFooter visible={compareCtx.isTwoAppSelected} />
    </>
  );
};

export default Favourites;
