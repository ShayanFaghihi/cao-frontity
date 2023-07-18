import { connect, styled } from "frontity";
import UI from "../UI";
import AppsList from "../list/AppsList";
import SearchField from "../SearchField";

const reverseFormat = (query) => query.replace("+", " ");

const SearchResults = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // data.searchQuery → query done to get search results
  const { searchQuery } = data;

  return (
    <>
      <UI label="Search">
        <div className="hero-box">
          <span>{`You have searched for “${reverseFormat(searchQuery)}”`}</span>
          <SearchField />
        </div>
        <AppsList query="search" searchQuery={reverseFormat(searchQuery)} />
      </UI>
    </>
  );
};

export default connect(SearchResults);
