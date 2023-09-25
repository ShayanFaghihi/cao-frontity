import { Global, css, connect, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import List from "./list";
import Loading from "./loading";
import Title from "./title";

import globalStyles from "./styles/App.css";

import PageError from "../pages/Error";
import Home from "../pages/Home";
import SingleReview from "../pages/SingleReview";
import Compare from "../pages/Compare";
import Favourites from "../pages/Favourites";

import { CompareContexProvider } from "../context/compare-context";
import SearchResults from "../pages/SearchResults";
/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @param props - The props injected by Frontity's {@link connect} HOC.
 *
 * @returns The top-level react component representing the theme.
 */

const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={css(globalStyles)} />

      {/* Add the header of the site. */}

      <Header />

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <CompareContexProvider>
        <Switch>
          <Loading when={data.isFetching} />
          <Compare when={data.isCompare} />
          <Home when={data.isHome} />
          <SearchResults when={data.isSearch} />
          <Favourites when={data.isFavourites} />
          <List when={data.isArchive} />
          <SingleReview when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </CompareContexProvider>
    </>
  );
};

export default connect(Theme);
