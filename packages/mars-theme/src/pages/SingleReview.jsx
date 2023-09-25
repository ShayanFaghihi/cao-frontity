import { useEffect, useContext } from "react";
import { connect } from "frontity";
import UI from "../components/UI";
import Navigation from "../components/Navigation";
import AppReviewBox from "../components/AppReviewBox";
import SimilarAppList from "../components/SimilarAppList";
import CompareFooter from "../components/CompareFooter";

import List from "../components/list";
import CompareContext from "../context/compare-context";

/**
 * The Post component that Mars uses to render any kind of "post type", like
 * posts, pages, attachments, etc.
 *
 * It doesn't receive any prop but the Frontity store, which it receives from
 * {@link connect}. The current Frontity state is used to know which post type
 * should be rendered.
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Post when={data.isPostType} />
 * </Switch>
 * ```
 *
 * @returns The {@link Post} element rendered.
 */
const SingleReview = ({ state, actions, libraries }) => {
  const compareCtx = useContext(CompareContext);

  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get the data of the author.
  const author = state.source.author[post.author];
  // Get a human readable date.
  const date = new Date(post.date);

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, [actions.source]);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <>
      <UI>
        <Navigation pageTitle={post.title.rendered} />
        <AppReviewBox data={post} />
        <SimilarAppList />
      </UI>
      <CompareFooter visible={compareCtx.isTwoAppSelected} />
    </>
  ) : null;
};

export default connect(SingleReview);
