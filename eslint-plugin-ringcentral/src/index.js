const rules = require('./constants/rules');
const strictConfig = require('./configs/strict');
const recommendedConfig = require('./configs/recomended');

const importRules = (ruleNames) => {
    return Object.keys(ruleNames).reduce((loadedRules, ruleKey) => {
        loadedRules[rules[ruleKey]] = require(`./rules/${rules[ruleKey]}`);
        return loadedRules;
    }, {});
};

module.exports = {
    rules: importRules(rules),
    configs: {
        strict: strictConfig,
        recommended: recommendedConfig,
    }
};
