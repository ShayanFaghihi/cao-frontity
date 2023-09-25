import React, { useEffect, useContext } from "react";
import { connect } from "frontity";
import UI from "../components/UI";
import Navigation from "../components/Navigation";
import AppCompareColumn from "../components/AppCompareColumn";
import AddCompareColumn from "../components/AddCompareColumn";
import CompareTitleColumn from "../components/CompareTitleColumn";

import CompareContext from "../context/compare-context";

const Compare = ({ state, actions }) => {
  // Needing to update the Context whenever the compare page is loaded manually
  const compareCtx = useContext(CompareContext);

  // Get App 1 and App 2 names from router
  const data = state.source.get(state.router.link);
  const app1Name = data.app1Name;
  const app2Name = data.app2Name;

  // When the Compare page is the landing page, it should inject the router parameters to the context state
  useEffect(() => {
    if (app1Name && app2Name) {
      compareCtx.compareAppBuilders(app1Name, app2Name);
    } else {
      compareCtx.compareAppBuilders(app1Name);
    }
  }, []);

  const app1Data =
    state.source.app_builders[state.source.get(`/app_builders/${app1Name}`).id];
  const app2Data =
    state.source.app_builders[state.source.get(`/app_builders/${app2Name}`).id];

  const removeAppHandler = (appName) => {
    switch (appName) {
      // Check whether we have other app on the compare page, otherwise we should go to the compare page
      case app1Name:
        app2Name
          ? actions.router.set(`/compare/${app2Name}`)
          : actions.router.set("/compare");
        break;
      case app2Name:
        app1Name
          ? actions.router.set(`/compare/${app1Name}`)
          : actions.router.set("/compare");
        break;
      default:
        actions.router.set(`/compare/`);
        break;
    }
  };

  return (
    <>
      <UI>
        <Navigation pageTitle="Compare Apps" />
        <section className="compare-table-section">
          <div className="compare-table">
            <CompareTitleColumn />
            {app1Data ? (
              <AppCompareColumn data={app1Data} removeApp={removeAppHandler} />
            ) : (
              <AddCompareColumn />
            )}
            {app2Data ? (
              <AppCompareColumn data={app2Data} removeApp={removeAppHandler} />
            ) : (
              <AddCompareColumn />
            )}
          </div>
        </section>
      </UI>
    </>
  );
};

export default connect(Compare);
