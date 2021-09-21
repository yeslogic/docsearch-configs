new Crawler({
  appId: "",
  apiKey: "",
  rateLimit: 8,
  startUrls: ["https://eggjs.org/api/", "https://eggjs.org/"],
  renderJavaScript: false,
  sitemaps: [],
  exclusionPatterns: ["**/**.js**", "**/**.js**/**", "**/**index.html"],
  ignoreCanonicalTo: false,
  discoveryPatterns: ["https://eggjs.org/**"],
  schedule: "at 20:10 on Tuesday",
  actions: [
    {
      indexName: "eggjs",
      pathsToMatch: ["https://eggjs.org/api/**"],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove = ".details";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: "#main h2",
            content: "#main p, #main li",
            lvl0: {
              selectors: "#main h1",
              defaultValue: "Documentation",
            },
            lvl2: "#main h3",
            lvl3: "#main h4",
            lvl4: "#main h5",
            tags: {
              defaultValue: ["api"],
            },
          },
          indexHeadings: true,
        });
      },
    },
    {
      indexName: "eggjs",
      pathsToMatch: ["https://eggjs.org/**", "!https://eggjs.org/api/**"],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove = ".details";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: "article h1",
            content: "article p, article li",
            lvl0: {
              selectors: "",
              defaultValue: "Documentation",
            },
            lvl2: "article h2",
            lvl3: "article h3",
            lvl4: "article h4",
            lvl5: "article h5",
          },
          indexHeadings: true,
        });
      },
    },
  ],
  initialIndexSettings: {
    eggjs: {
      attributesForFaceting: ["type", "lang"],
      attributesToRetrieve: ["hierarchy", "content", "anchor", "url"],
      attributesToHighlight: ["hierarchy", "hierarchy_camel", "content"],
      attributesToSnippet: ["content:10"],
      camelCaseAttributes: ["hierarchy", "hierarchy_radio", "content"],
      searchableAttributes: [
        "unordered(hierarchy_radio_camel.lvl0)",
        "unordered(hierarchy_radio.lvl0)",
        "unordered(hierarchy_radio_camel.lvl1)",
        "unordered(hierarchy_radio.lvl1)",
        "unordered(hierarchy_radio_camel.lvl2)",
        "unordered(hierarchy_radio.lvl2)",
        "unordered(hierarchy_radio_camel.lvl3)",
        "unordered(hierarchy_radio.lvl3)",
        "unordered(hierarchy_radio_camel.lvl4)",
        "unordered(hierarchy_radio.lvl4)",
        "unordered(hierarchy_radio_camel.lvl5)",
        "unordered(hierarchy_radio.lvl5)",
        "unordered(hierarchy_radio_camel.lvl6)",
        "unordered(hierarchy_radio.lvl6)",
        "unordered(hierarchy_camel.lvl0)",
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy_camel.lvl1)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy_camel.lvl2)",
        "unordered(hierarchy.lvl2)",
        "unordered(hierarchy_camel.lvl3)",
        "unordered(hierarchy.lvl3)",
        "unordered(hierarchy_camel.lvl4)",
        "unordered(hierarchy.lvl4)",
        "unordered(hierarchy_camel.lvl5)",
        "unordered(hierarchy.lvl5)",
        "unordered(hierarchy_camel.lvl6)",
        "unordered(hierarchy.lvl6)",
        "content",
      ],
      distinct: true,
      attributeForDistinct: "url",
      customRanking: [
        "desc(weight.pageRank)",
        "desc(weight.level)",
        "asc(weight.position)",
      ],
      ranking: [
        "words",
        "filters",
        "typo",
        "attribute",
        "proximity",
        "exact",
        "custom",
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: "</span>",
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: "allOptional",
    },
  },
});