import React, { useContext } from "react";
import { connect } from "frontity";
import UI from "../components/UI";
import Hero from "../components/Hero";
import AppsList from "../components/list/AppsList";
import CompareFooter from "../components/CompareFooter";

import CompareContext from "../context/compare-context";

const Home = () => {
  const compareCtx = useContext(CompareContext);

  return (
    <>
      <UI>
        <Hero />
        <AppsList />
      </UI>
      <CompareFooter visible={compareCtx.isTwoAppSelected} />
    </>
  );
};

export default connect(Home);
