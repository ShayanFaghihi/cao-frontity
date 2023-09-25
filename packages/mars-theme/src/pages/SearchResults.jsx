import { useContext } from "react";
import { connect } from "frontity";
import UI from "../components/UI";
import AppsList from "../components/list/AppsList";
import SearchField from "../components/SearchField";
import CompareContext from "../context/compare-context";
import CompareFooter from "../components/CompareFooter";

const reverseFormat = (query) => query.replace("+", " ");

const SearchResults = ({ state }) => {
  const compareCtx = useContext(CompareContext);
  // Get information about the current URL.  (?s='query')
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
      <CompareFooter visible={compareCtx.isTwoAppSelected} />
    </>
  );
};

export default connect(SearchResults);
