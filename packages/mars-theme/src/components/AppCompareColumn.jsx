import React, { useContext } from "react";
import {connect} from "frontity"
import removeIcon from "../static/icons/remove.svg";
import checkedIcon from "../static/icons/checked.svg";
import uncheckedIcon from "../static/icons/cancel.svg";
import androidIcon from "../static/icons/android.svg";
import iosIcon from "../static/icons/ios.svg";
import pwaIcon from "../static/icons/pwa.svg";
import starIcon from "../static/icons/Star.svg";

import CompareContext from "../context/compare-context";

const AppCompareColumn = ({state,data,removeApp}) => {
  const compareCtx = useContext(CompareContext);

  const media = state.source.attachment[data.featured_media];

    // Getting App Name out of the Link (/app_builders/appName/)
    const appName = data.link.replace("/app_builders/", "").replace("/","")

  const removeAppHandler = () => {
    compareCtx.removeAppFromList(appName);
    removeApp(appName);
  };

  // Purify Text having no HTML code and with limited words
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

  // For showing the stars as many as the rating is, we should creat an array and loop using map inside of JSX
  const flexRating = data.acf.design_flexibility_rating;
  const flexRatingArr = Array.from({ length: flexRating }, (_, index) => index);
  return (
    <div className="compare-table__app table-column">
      <ul className="compare-table__list">
        <li className="compare-table__list--item">
          <div className="app">
          <img
              src={media.source_url}
              alt={`${data.title.rendered} featured image`}
            />
            <div className="app__title">
              <h2>{data.title.rendered}</h2>
              <a href={data.acf.website_url}>
                {" "}
                {data.acf.website_url}{" "}
              </a>
            </div>
            <span className="remove-app" onClick={removeAppHandler}>
              <img src={removeIcon} alt="" />
            </span>
          </div>
          <p className="app-desc">
            {purifyTexts(data.excerpt.rendered, 30)}
            {/* Strip HTML code from excerpt */}
          </p>
        </li>
        <li className="compare-table__list--item logo">
          <img
            src={data.acf.product_logo}
            alt={data.title.rendered}
          />
        </li>
        <li className="compare-table__list--item">
          {data.acf.free_version.map((item) => item)}
        </li>
        <li className="compare-table__list--item">
          {/* Annual Plan Cost */}${data.acf.basic_annual_plan_cost}
        </li>
        <li className="compare-table__list--item support">
          {/* Platform Support */}
          {data.acf.platform_support.map((item) => {
            switch (item) {
              case "Android":
                return (
                  <img
                    key="android"
                    src={androidIcon}
                    alt="Android Suppport"
                  />
                );
              case "IOS":
                return <img key="ios" src={iosIcon} alt="Ios Support" />;
              case "PWA":
                return <img key="pwa" src={pwaIcon} alt="PWA support" />;
              default:
                break;
            }
          })}
        </li>
        <li className="compare-table__list--item icon">
          {/* Has publishing cost or no */}
          {data.acf.publishing_costs ? (
            <img src={checkedIcon} alt="has publishing cost" />
          ) : (
            <img src={uncheckedIcon} alt="no publishing cost" />
          )}
        </li>
        <li className="compare-table__list--item">
          <div className="compare-table__list--item-rating">
            {/* Show stars as many as the flexRatingArr length */}
            {flexRatingArr.map((_, index) => (
              <img key={index} src={starIcon} alt="Star Rating" />
            ))}
          </div>
        </li>
        <li className="compare-table__list--item icon">
          {/* Can build Simple App */}
          {data.acf.build_simple_apps ? (
            <img src={checkedIcon} alt="can build simple app" />
          ) : (
            <img src={uncheckedIcon} alt="cannot build simple app" />
          )}
        </li>
        <li className="compare-table__list--item icon">
          {/* Can build Complex App */}
          {data.acf.build_complex_apps ? (
            <img src={checkedIcon} alt="can build complex app" />
          ) : (
            <img src={uncheckedIcon} alt="cannot build simple app" />
          )}
        </li>
        <li className="compare-table__list--item icon">
          {data.acf.programming_required.map((item) => item)}
        </li>
        <li className="compare-table__list--item icon">
          {/* Has 3PI and plugins */}
          {data.acf.third_party_integrations ? (
            <img src={checkedIcon} alt="Has 3PI and plugins" />
          ) : (
            <img src={uncheckedIcon} alt="Has not 3PI and plugins" />
          )}
        </li>
      </ul>
    </div>
  );
};

export default connect(AppCompareColumn);
