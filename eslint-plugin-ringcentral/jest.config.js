module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/rules/**"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.js"],
};
