import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      autoPrefetch: "in-view",
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
    source: {
      data: {
        "/favourites/": {
          isFavourites: true,
          isReady: true,
        },
      },
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      // In order to get the App Builders before SSR (For showing them on the home page)
      beforeSSR: async ({ actions }) => {
        await actions.source.fetch("/app_builders");
      },
    },
  },
  libraries: {
    source: {
      handlers: [
        {
          pattern: "/compare/:app_name1?/:app_name2?",
          func: ({ state, link, params }) => {
            state.source.data[link] = {
              app1Name: params.app_name1,
              app2Name: params.app_name2,
              isCompare: true,
            };
          },
        },
      ],
    },
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, iframe, link],
    },
  },
};

export default marsTheme;
