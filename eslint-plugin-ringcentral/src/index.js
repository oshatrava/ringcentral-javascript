const rules = require('./constants/rules');
const strictConfig = require('./configs/strict');
const recommendedConfig = require('./configs/recommended');

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
        // TODO: (oleg.shatrava) Remove it line after merge to main repo and replace on "recommended"
        all: recommendedConfig,
    }
};
