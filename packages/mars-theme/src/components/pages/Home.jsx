import React, { useContext } from "react";
import {connect} from "frontity"
import UI from "../UI";
import Hero from "../Hero";
import AppsList from "../list/AppsList";
import CompareFooter from "../CompareFooter";

import CompareContext from "../../context/compare-context"

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
