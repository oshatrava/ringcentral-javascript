/**
 * @fileoverview Enforces consistent naming for boolean props
 * @author oshatrava
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/restrict-unwanted-imports');

const parserOptions = {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
        jsx: true
    }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});

ruleTester.run('restrict-unwanted-imports', rule, {
    valid: [
        {
            code: `
                /**
                 * @public
                 */
                export const correctConst = 'VALID'
            `
        },
        {
            code: `
                /**
                 * @public
                 */
                export function correctFunc(arr) {
                    return arr;
                };
            `
        },
    ],
    invalid: [
        // {
        //     code: `export const incorrectConst = 'INVALID'`,
        //     errors: {messageId: 'missingJSDocPublicComment'}
        // },
    ]
});
