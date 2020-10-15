const {RESTRICT_UNWANTED_IMPORTS: RULE_NAME} = require('../../../src/constants/rules');
const {absoluteFilePath, createRuleTester} = require('../helpers');
const rule = require(`../../../src/rules/${RULE_NAME}`);

const ruleTesters = createRuleTester();

ruleTesters.run(RULE_NAME, rule, {
    valid: [
        {
            filename: absoluteFilePath('modules/module-a/BL-a.js'),
            code: "import {getBrandId} from '../../modules/module-b/BL-b.js';",
        }
    ],
    invalid: []
});
