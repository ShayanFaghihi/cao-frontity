import React, { createContext, useState } from "react";

const CompareContext = createContext({
  isTwoAppSelected: false,
  appBuildersToCompare: { app1Name: "", app2Name: "" },
  compareAppBuilders: () => {},
  removeAppFromList: () => {},
});

export const CompareContexProvider = (props) => {
  const [isTwoAppSelected, setIsTwoAppSelected] = useState(false);
  const [appBuildersToCompare, setAppBuildersToCompare] = useState({
    app1Name: "",
    app2Name: "",
  });

  const compareAppBuildersHandler = (appName, appName2) => {
    if (!appName2) {
      // When it is about adding one app to the compare list only
      if (
        appBuildersToCompare.app1Name === "" &&
        appBuildersToCompare.app2Name === ""
      ) {
        setAppBuildersToCompare({ app1Name: appName, app2Name: "" });
      } else if (
        appBuildersToCompare.app1Name === "" &&
        appBuildersToCompare.app2Name !== ""
      ) {
        setAppBuildersToCompare({
          app1Name: appBuildersToCompare.app2Name,
          app2Name: appName,
        });
        setIsTwoAppSelected(true);
      } else {
        setAppBuildersToCompare((prevState) => ({
          ...prevState,
          app2Name: appName,
        }));
        setIsTwoAppSelected(true);
      }
    } else {
      // For the time we want to add both app builders to compare list together
      setAppBuildersToCompare({ app1Name: appName, app2Name: appName2 });
      setIsTwoAppSelected(true);
    }
  };

  const removeAppFromListHandler = (appName) => {
    let appBuildersCopy;
    if (appName === appBuildersToCompare.app1Name) {
      appBuildersCopy = {
        app1Name: "",
        app2Name: appBuildersToCompare.app2Name,
      };
      setAppBuildersToCompare(appBuildersCopy);
    } else {
      appBuildersCopy = {
        app1Name: appBuildersToCompare.app1Name,
        app2Name: "",
      };
      setAppBuildersToCompare(appBuildersCopy);
    }
    setIsTwoAppSelected(false);
  };

  return (
    <CompareContext.Provider
      value={{
        isTwoAppSelected: isTwoAppSelected,
        appBuildersToCompare: appBuildersToCompare,
        compareAppBuilders: compareAppBuildersHandler,
        removeAppFromList: removeAppFromListHandler,
      }}
    >
      {props.children}
    </CompareContext.Provider>
  );
};

export default CompareContext;
