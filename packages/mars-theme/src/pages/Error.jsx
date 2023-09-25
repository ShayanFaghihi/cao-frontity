import { connect } from "frontity";
import UI from "../components/UI";

const description404 = (
  <>
    That page can’t be found{" "}
    <span role="img" aria-label="confused face">
      😕
    </span>
  </>
);

const description = (
  <>
    Don&apos;t panic! Seems like you encountered an error. If this persists,
    <a href="mailto:info@createapponline.com/"> let us know </a> or try
    refreshing your browser.
  </>
);

// The 404 page component
const Page404 = ({ state }) => {
  const data = state.source.get(state.router.link);

  const title = "Oops! Something went wrong";
  const title404 = "Oops! 404";

  return (
    <UI>
      <h1 className="error-title">{data.is404 ? title404 : title}</h1>
      <p className="error-text">{data.is404 ? description404 : description}</p>
    </UI>
  );
};

export default connect(Page404);
