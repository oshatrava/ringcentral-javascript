'use strict';

const rule = require('../../src/rules/restrict-unwanted-imports');
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

ruleTester.run('restrict-unwanted-imports (Restrict import from another module)', rule, {
    valid: [
        {
            code: `
                import {getBrandId} from '../../anotherModule/components/BL';
                getBrandId();
            `,
            filename: '../../anotherModule/components/Test.tsx',
        },
        // {code: `import AnotherModule from '../../anotherModule/BL';`},
    ],
    invalid: []
});

// ruleTester.run('restrict-unwanted-imports (Missing @public comment)', rule, {
//     valid: [
//         {
//             code: `
//                 /**
//                  * @public
//                  */
//                 export const correctConst = 'VALID'
//             `,
//         },
//         {
//             code: `
//                 /**
//                  * @public
//                  */
//                 export function correctFuncWithNameExport(arr) {
//                     return arr;
//                 };
//             `
//         },
//         {
//             code: `
//                 /**
//                  * @public
//                  */
//                 export default function correctFuncWithDefaultExport(arr) {
//                     return arr;
//                 };
//             `
//         },
//     ],
//     invalid: [
//         // {
//         //     code: `export const incorrectConst = 'INVALID'`,
//         //     errors: {messageId: 'missingJSDocPublicComment'}
//         // },
//     ]
// });
