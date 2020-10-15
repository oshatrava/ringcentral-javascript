const {RESTRICT_UNWANTED_IMPORTS: RULE_NAME} = require('../../../src/constants/rules');
const {absoluteFilePath, createRuleTester} = require('../helpers');
const rule = require(`../../../src/rules/${RULE_NAME}`);

const ruleTesters = createRuleTester();

const error = {message: `Restrict unwanted imports from another module.`};

ruleTesters.run(RULE_NAME, rule, {
    valid: [
        {
            filename: absoluteFilePath('modules/module-a/BL-a.js'),
            code: "import {getBrandId} from '../../modules/module-a/BL-a.js';",
        },
        {
            filename: absoluteFilePath('modules/module-b/index.js'),
            code: "import PageB from '../../modules/module-b/components/Page-B.js';",
        },
    ],
    invalid: [
        {
            filename: absoluteFilePath('modules/module-a/BL-a.js'),
            code: "import {getBrandId} from '../../modules/module-b/BL-b.js';",
            errors: [error]
        },
        {
            filename: absoluteFilePath('modules/module-b/index.js'),
            code: "import PageA from '../../modules/module-a/components/Page-A.js';",
            errors: [error]
        },
    ]
});
