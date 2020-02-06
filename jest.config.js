module.exports = {
  collectCoverage: true,
  coverageDirectory: "tmp/coverage/web",
  transform: {
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svelte$": ["svelte-jester", { preprocess: true }]
  },
  moduleFileExtensions: ["js", "jsx", "json", "svelte", "ts", "tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/web/src/$1"
  }
};
