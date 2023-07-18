import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import AppBox from "./AppBox";

const AppsList = ({ state, iterationLimit, isForAdd, query, searchQuery }) => {
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
  }, []);

  if (query && query === "favourites") {
    data = data.filter((appBuilder) => favouriteApps.includes(appBuilder.id));
  }

  if (query && query === "search") {
    data = data.filter((appBuilder) =>
      state.source["app_builders"][appBuilder.id].content.rendered.includes(
        searchQuery
      )
    );
  }

  return (
    <>
      {data.length > 0 ? (
        <ul className="app-list-section">
          {data.map(({ type, id }) => {
            const item = state.source[type][id];
            return <AppBox key={item.id} item={item} isForAdd={isForAdd} />;
          })}
        </ul>
      ) : (
        <p className="error-text">There are no App Builders</p>
      )}
    </>
  );
};

export default connect(AppsList);
