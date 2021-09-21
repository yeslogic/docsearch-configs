new Crawler({
  appId: "",
  apiKey: "",
  rateLimit: 8,
  startUrls: ["https://p5js.org/learn", "https://p5js.org/"],
  renderJavaScript: false,
  sitemaps: [],
  exclusionPatterns: ["**/examples/**", "**/assets/**"],
  ignoreCanonicalTo: false,
  discoveryPatterns: ["https://p5js.org/**"],
  schedule: "at 00:30 on Friday",
  actions: [
    {
      indexName: "p5js",
      pathsToMatch: ["https://p5js.org/learn**/**"],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove = ".license";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: "main h3",
            content: "main p, main li, main h1",
            lvl0: {
              selectors: "main h1",
              defaultValue: "Learn",
            },
            lvl2: "main h4",
            lvl3: "main h5",
            lvl4: "main h6",
            tags: {
              defaultValue: ["learn"],
            },
          },
          indexHeadings: true,
        });
      },
    },
    {
      indexName: "p5js",
      pathsToMatch: ["https://p5js.org/**", "!https://p5js.org/learn**/**"],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove = ".license";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: "main h2",
            content: "main p, main li, main h1",
            lvl0: {
              selectors: "main h1",
              defaultValue: "Documentation",
            },
            lvl2: "main h3",
            lvl3: "main h4",
            lvl4: "main h5",
            lvl5: "main h6",
          },
          indexHeadings: true,
        });
      },
    },
  ],
  initialIndexSettings: {
    p5js: {
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