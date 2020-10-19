const pluginPackage = require('../../src/index');

const RULES = require('../../src/constants/rules');

describe('Package rules property', () => {
    it('should contain all rules defined in constans', () => {
        Object.keys(RULES).forEach((ruleKey) => {
            const rule = pluginPackage.rules[RULES[ruleKey]].create;
            expect(rule).toBeDefined();
        })
    })
});
