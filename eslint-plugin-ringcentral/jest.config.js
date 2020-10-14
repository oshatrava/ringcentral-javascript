module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["src/rules/**"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.js"],
};
