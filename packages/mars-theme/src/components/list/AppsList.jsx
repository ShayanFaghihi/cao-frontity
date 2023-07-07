import { connect } from "frontity";
import AppBox from "./AppBox";

const AppsList = ({ state, iterationLimit, isForAdd, query }) => {
  // Get the data of the current list.
  let data = state.source.get("/app_builders").items;

  if (iterationLimit) {
    // Based on iterationLimit number, the array will be looped (e.g. for the Single App Page we only need 3 app builders to be shown)
    data = data.slice(0, iterationLimit);
  }

  
  return (
    <ul className="app-list-section">
      {data.map(({ type, id }) => {
        const item = state.source[type][id];
        return (
          <AppBox
            key={item.id}
            item={item}
            isForAdd={isForAdd}
          />
        );
      })}
    </ul>
  );
};

export default connect(AppsList);
