const {SPECIFIED_COMMENT_WITH_TASK_ID: RULE_NAME} = require('../../../src/constants/rules');
const {createRuleTester} = require('../helpers');
const rule = require(`../../../src/rules/${RULE_NAME}`);

const ruleTester = createRuleTester();
const error = {
    messageId: 'specifyComment'
};

ruleTester.run(RULE_NAME, rule, {
    valid: [
        '// TODO [RLZ-12345]',
        '// todo [RLZ-12345]',
        '// fixme [RLZ-12345]',
        '// FIXME [RLZ-12345]',
        '// TODO [RLZ-12345] summary',
        '// FIXME [RLZ-12345] summary',
        '/* TODO \n some comment \n [UIA-98765] */',
        '// TODO (username) summary',
        '// FIXME (username) summary'
    ],
    invalid: [
        {
            code: '// TODO summary',
            errors: [error]
        },
        {
            code: '// FIXME summary',
            errors: [error]
        },
        {
            code: '// todo summary',
            errors: [error]
        },
        {
            code: '// fixme summary',
            errors: [error]
        },
        {
            code: '/* TODO \n summary */',
            errors: [error]
        },
        {
            code: '// TODO () summary',
            errors: [error]
        },
    ]
});

