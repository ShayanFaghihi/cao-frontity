import { connect } from "frontity";

import likedIcon from "../static/icons/heart.svg";
import unlikedIcon from "../static/icons/heart-unliked.svg";
import Link from "./link";
/**
 * The Component that renders a featured media, typically an image. The featured
 * media can represent an individual Post, Page, or Custom Post Type.
 *
 * @param props - The state injected by {@link connect } and the ID of the
 * featured media.
 *
 * @returns A react component.
 */
const FeaturedMedia = ({ state, id, isFavourite, addToFavourite, buttonLink }) => {
  const media = state.source.attachment[id];

  if (!media) return null;

  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((item) => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;

  return (
    <div className="app-box__image">
      <Link link={buttonLink}>
        <img
          src={media.source_url}
          srcSet={srcset}
          width={media?.media_details?.width}
          height={media?.media_details?.height}
          alt={media.title.rendered}
        />
      </Link>
      <span
        className={isFavourite ? "like-button" : "like-button unliked"}
        onClick={addToFavourite}
      >
        <img src={isFavourite ? likedIcon : unlikedIcon} alt="Heart Icon" />
      </span>
    </div>
  );
};

export default connect(FeaturedMedia);
