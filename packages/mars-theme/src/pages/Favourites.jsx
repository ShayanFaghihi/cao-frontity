import React, { useContext } from "react";
import UI from "../components/UI";
import Navigation from "../components/Navigation";
import AppsList from "../components/list/AppsList";
import CompareFooter from "../components/CompareFooter";

import CompareContext from "../context/compare-context";

const Favourites = () => {
  const compareCtx = useContext(CompareContext);

  return (
    <>
      <UI>
        <Navigation pageTitle="Favourites" />
        <AppsList query="favourites" />
      </UI>
      <CompareFooter visible={compareCtx.isTwoAppSelected} />
    </>
  );
};

export default Favourites;
