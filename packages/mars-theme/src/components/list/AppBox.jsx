import React, { useState, useContext, useEffect } from "react";
import { connect } from "frontity";
import Link from "../link";
import FeaturedMedia from "../featured-media";

import CompareContext from "../../context/compare-context";

import linkIcon from "../../static/icons/link.svg";

const AppBox = ({ state, item, isForAdd }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isFavourite,setIsFavourite] = useState(false)

  const compareCtx = useContext(CompareContext);

  // Getting App Name out of the Link (/app_builders/appName/)
  const appName = item.link.replace("/app_builders/", "").replace("/", "");

  useEffect(() => {
    // Make the app box checked when it is selected as an app to compare
    if (
      compareCtx.appBuildersToCompare.app1Name === appName ||
      compareCtx.appBuildersToCompare.app2Name === appName
    ) {
      setIsChecked(true);
    }

  }, []);

  // Add App To Favourite List
  const addToFavouriteHandler = () => {
    setIsFavourite((prevState) => !prevState);
  };

  const checkToCompare = (appName) => {
    if (
      appName != compareCtx.appBuildersToCompare.app1Name &&
      appName != compareCtx.appBuildersToCompare.app2Name &&
      !compareCtx.isTwoAppSelected
    ) {
      setIsChecked(true);
      compareCtx.compareAppBuilders(appName);
    } else if (
      appName != compareCtx.appBuildersToCompare.app1Name &&
      appName != compareCtx.appBuildersToCompare.app2Name &&
      compareCtx.isTwoAppSelected
    ) {
      return;
    } else {
      setIsChecked(false);
      compareCtx.removeAppFromList(appName);
    }
  };

  const purifyTexts = (text, limit) => {
    let purifiedText = "";
    if (limit) {
      // Limit the number of words
      const words = text.trim().split(" ");
      let limitedWords = words.slice(0, limit);
      limitedWords = limitedWords.join(" ");
      // Strip HTML codes
      purifiedText = limitedWords.replace(/(<([^>]+)>)/gi, "");
    } else {
      purifiedText = text.replace(/(<([^>]+)>)/gi, "");
    }

    return purifiedText;
  };

  return (
    <li className="app-box">
      <FeaturedMedia
        id={item.featured_media}
        isFavourite={isFavourite}
        addToFavourite={addToFavouriteHandler}
      />

      <div className="app-box__content">
        <h3>{item.title.rendered}</h3>
        <p>{purifyTexts(item.excerpt.rendered, 30)}</p>
        {/* Strip HTML code from excerpt */}
      </div>

      <div className="app-box__actions">
        {!isForAdd ? (
          // When it is only for comparing
          <>
            <Link link={item.link} className="app-box__actions--link-btn">
              <span>
                <img src={linkIcon} alt="" />
              </span>
              Link
            </Link>
            <span
              onClick={() => checkToCompare(appName)}
              className={
                !isChecked
                  ? "app-box__actions--compare"
                  : "app-box__actions--compare selected"
              }
            ></span>
          </>
        ) : // When an app should be selected from the pop up modal
        !compareCtx.appBuildersToCompare.app1Name &&
          !compareCtx.appBuildersToCompare.app2Name ? (
          <Link
            className="app-box__actions--link-btn"
            link={`/compare/${appName}`}
            onClick={() => checkToCompare(appName)}
          >
            Add
          </Link>
        ) : (
          <Link
            onClick={() => checkToCompare(appName)}
            link={`/compare/${
              compareCtx.appBuildersToCompare.app1Name
                ? compareCtx.appBuildersToCompare.app1Name
                : appName
            }/${
              compareCtx.appBuildersToCompare.app2Name
                ? compareCtx.appBuildersToCompare.app2Name
                : appName
            }`}
            className="app-box__actions--link-btn"
          >
            Add
          </Link>
        )}
      </div>
    </li>
  );
};

export default connect(AppBox);
