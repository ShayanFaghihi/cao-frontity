import React, {useState, useEffect} from "react";
import { connect } from "frontity";
import { RWebShare } from "react-web-share";

import FeaturedMedia from "./featured-media";
import linkIcon from "../static/icons/link.svg";
import likedIcon from "../static/icons/heart.svg";
import shareIcon from "../static/icons/share.svg";
import androidIcon from "../static/icons/android.svg";
import iosIcon from "../static/icons/ios.svg";
import pwaIcon from "../static/icons/pwa.svg";
import starIcon from "../static/icons/Star.svg";
import calendarIcon from "../static/icons/calendar.svg";

const AppReviewBox = ({ state, data, libraries }) => {
  const [isFavourite, setIsFavourite] = useState(false);


  // Add App To Favourite List
  const addToFavouriteHandler = () => {
    setIsFavourite((prevState) => !prevState);
  };

  useEffect(() => {
    // Gettin the Item Ids from Local Storage to check whether this app is favourite
    const localStorageArray = JSON.parse(localStorage.getItem("Favourites"));

    if (localStorageArray && localStorageArray.includes(data.id)) {
      setIsFavourite(true);
    }
  }, []);

  useEffect(() => {
    // Retrieve the existing local storage array or initialize an empty array
    const localStorageArray =
      JSON.parse(localStorage.getItem("Favourites")) || [];

    // Add or remove the item ID based on the isFavourite state
    if (isFavourite) {
      if (!localStorageArray.includes(data.id)) {
        localStorageArray.push(data.id);
      }
    } else {
      const index = localStorageArray.indexOf(data.id);
      if (index !== -1) {
        localStorageArray.splice(index, 1);
      }
    }

    // Update the local storage array
    localStorage.setItem("Favourites", JSON.stringify(localStorageArray));
  }, [isFavourite,data.id]);

  // For showing the stars as many as the rating is, we should creat an array and loop using map inside of JSX
  // Desing Flexibility
  const flexRating = data.acf.design_flexibility_rating;
  const flexRatingArr = Array.from({ length: flexRating }, (_, index) => index);

  // Easy to use
  const easyToUseRating = data.acf.ease_of_use_rating;
  const easyToUseRatingArr = Array.from(
    { length: easyToUseRating },
    (_, index) => index
  );

  // Convert Creating Date
  function convertDateFormat(dateString) {
    const date = new Date(dateString);

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  // Get the app Logo by its id
  const appLogo = state.source.attachment[data.featured_media];

  return (
    <section className="app-review-section">
      <div className="app-review-box">
        <div className="app-review-box__image">
          <FeaturedMedia
            id={data.featured_media}
            isFavourite={isFavourite}
            addToFavourite={addToFavouriteHandler}
          />
        </div>
        <div className="app-review-box__content">
          <div className="app-review-box__content--actions">
            <div className="app-review__link">
              <span>
                <img src={linkIcon} alt="" />
              </span>
              <a href={data.acf.website_url} target="_blank">
                {data.acf.website_url}
              </a>
            </div>
            <div className="app-review__action">
              {/* <div className="like-button">
                <span className="like-image">
                  <img src={likedIcon} alt="Heart Icon" />
                </span>
                <span className="like-counter">{data.acf.liked_count}</span>
              </div> */}
              <RWebShare
                data={{
                  url: `https://createapponline.com${state.router.link}`,
                  title: `Share ${data.title.rendered}`,
                }}
              >
                <span className="share-button">
                  <img src={shareIcon} alt="" />
                </span>
              </RWebShare>
            </div>
          </div>

          {/* Main Content */}
          <div className="app-review__desc">
            {" "}
            <Html2React html={data.content.rendered} />
          </div>
          <div className="app-review-box__reviews">
            <ul className="app-reviews-list">
              <li className="app-review-list__item">
                <span className="item">Platform Support:</span>
                <ul className="app-support-list">
                  {/* Platform Support */}
                  {data.acf.platform_support.map((item) => {
                    switch (item) {
                      case "Android":
                        return (
                          <li key="android" className="app-support-list__item">
                            <img src={androidIcon} alt="Android Suppport" />
                          </li>
                        );
                      case "IOS":
                        return (
                          <li key="ios" className="app-support-list__item">
                            <img src={iosIcon} alt="IOS Suppport" />
                          </li>
                        );
                      case "PWA":
                        return (
                          <li key="pwa" className="app-support-list__item">
                            <img src={pwaIcon} alt="PWA Suppport" />
                          </li>
                        );
                      default:
                        break;
                    }
                  })}
                </ul>
              </li>
              <li className="app-review-list__item">
                <span className="item">App Builder:</span>
                <span className="app-builder">
                  <img src={""} alt={`${data.title.rendered} logo`} />
                </span>
              </li>
              <li className="app-review-list__item">
                <span className="item">Desing Flexibility:</span>
                <div className="star-rating">
                  {/* Show stars as many as the flexRatingArr length */}
                  {flexRatingArr.map((_, index) => (
                    <img key={index} src={starIcon} alt="Star Rating" />
                  ))}
                </div>
              </li>
              <li className="app-review-list__item">
                <span className="item">Easy to use:</span>
                <div className="star-rating">
                  {/* Show stars as many as the easyToUseArr length */}
                  {easyToUseRatingArr.map((_, index) => (
                    <img key={index} src={starIcon} alt="Star Rating" />
                  ))}
                </div>
              </li>
              <li className="app-review-list__item">
                <span>
                  <img src={calendarIcon} alt="" />
                </span>
                <span className="creation-date">
                  {convertDateFormat(data.date)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(AppReviewBox);
