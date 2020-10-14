const {RESTRICT_UNWANTED_IMPORTS: RULE_NAME} = require('../../../src/constants/rules');
const {absoluteFilePath} = require('../helpers');
const rule = require(`../../../src/rules/${RULE_NAME}`);
const {RuleTester} = require('eslint');

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    }
});

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
    valid: [
        {
            code:
                "import {getBrandId} from '../modules/module-b/BL-b.js'\n" +
                "getBrandId();",
            filename: absoluteFilePath('modules/module-a/BL-a.js'),
        }
    ],
    invalid: []
});
