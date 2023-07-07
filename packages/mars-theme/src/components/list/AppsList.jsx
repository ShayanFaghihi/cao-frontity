import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import AppBox from "./AppBox";

const AppsList = ({ state, iterationLimit, isForAdd, query }) => {
  const [favouriteApps, setFavouriteApps] = useState([]);

  // Get the data of the current list.
  let data = state.source.get("/app_builders").items;

  if (iterationLimit) {
    // Based on iterationLimit number, the array will be looped (e.g. for the Single App Page we only need 3 app builders to be shown)
    data = data.slice(0, iterationLimit);
  }

  // Query and filter the apps list (For example showing the user favourite app builders only)
  useEffect(() => {
    const localStotageItems = JSON.parse(localStorage.getItem("Favourites"));
    if (localStotageItems) {
      setFavouriteApps(localStotageItems);
    }
  }, [query,data]);

  if (query && query === "favourites") {
    data = data.filter((appBuilder) => favouriteApps.includes(appBuilder.id));
  }

  return (
    <ul className="app-list-section">
      {data ? (
        data.map(({ type, id }) => {
          const item = state.source[type][id];
          return <AppBox key={item.id} item={item} isForAdd={isForAdd} />;
        })
      ) : (
        <p className="error-text">There are no App Builders</p>
      )}
    </ul>
  );
};

export default connect(AppsList);
