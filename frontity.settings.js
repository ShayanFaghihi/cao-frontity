const settings = {
  name: "frontity",
  state: {
    frontity: {
      url: "https://createapponline.com/",
      title: "Create App Online",
      description:
        "Explore the top low and no-code online app builders, including Wix, FlutterFlow, Good Barber, Andromo, and Shopify. Our comprehensive review will help you make an informed decision for your next app development project. Discover the features, benefits, and limitations of each platform to create stunning apps without extensive coding knowledge. Start building your dream app today!",
    },
  },
  packages: [
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          menu: [
            ["Home", "/"],
            ["Favourite", "/favourites"],
          ],
          featured: {
            showOnList: true,
            showOnPost: true,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://abooa2.sg-host.com/",
          postTypes: [
            {
              type: "app_builders",
              endpoint: "app_builders",
              archive: "/app_builders",
            },
          ],
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    {
      name: "@frontity/yoast",
      state: {
        yoast: {
          transformLinks: {
            ignore: "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc",
            base: "https://createapponline.com",
          },
        },
      },
    },
  ],
};

export default settings;
