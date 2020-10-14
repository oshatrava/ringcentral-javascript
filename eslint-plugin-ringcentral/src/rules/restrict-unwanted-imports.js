const {PLUGIN_NAME} = require('../constants/plugin');
const {getContextInfo} = require('../helpers/rules');
const {getDependencyInfo} = require('../helpers/elements');

module.exports = {
    meta: {
        docs: {
            description: 'Restrict unwanted imports from another modules',
            recommended: false,
        },
        messages: {
            missingJSDocPublicComment: 'Missing JSDoc @public comment.',
            unwantedImport: 'Restrict unwanted imports from another module.'
        },
    },
    create: function (context) {
        const {fileName, currentElementInfo} = getContextInfo(context);

        return {
            'ImportDeclaration': (node) => {
                const dependencyInfo = getDependencyInfo(fileName, node.source.value, context.settings);
                console.log({dependencyInfo});

                if (
                    dependencyInfo.isLocal &&
                    !dependencyInfo.isIgnored
                ) {
                    context.report({
                        node,
                        type: PLUGIN_NAME,
                        messageId: 'missingJSDocPublicComment'
                      });
                }
            },
            // 'ExportNamedDeclaration': node => {
            //     checkUsage(node);
            // },
            // 'ExportDefaultDeclaration': node => {
            //     checkUsage(node);
            // }
        };
    }
};


// function hasCommentBefore(node, sourceCode) {
//     return sourceCode.getCommentsBefore(node).some(comment => {
//         return (
//             node.type === 'Block' &&
//             node.value.charAt(0) === '*' &&
//             node.value.includes('@public') &&
//             comment.loc.end.line >= node.loc.start.line - 1
//         )
//     })
// }
