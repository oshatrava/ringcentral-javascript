const {PLUGIN_NAME} = require('../constants/plugin');
const {getContextInfo} = require('../helpers/rules');
const {getDependencyInfo, isNotRecognizedOrIgnored} = require('../helpers/elements');

module.exports = {
    meta: {
        docs: {
            description: 'Restrict unwanted imports from another modules',
            recommended: false,
        },
        messages: {
            // missingJSDocPublicComment: 'Missing JSDoc @public comment.',
            unwantedImport: 'Restrict unwanted imports from another module.'
        },
    },
    create: function (context) {
        const sourceCode = context.getSourceCode();
        const {fileName, currentElementInfo} = getContextInfo(context);
        if (isNotRecognizedOrIgnored(currentElementInfo)) {
            return {};
        }

        return {
            'ImportDeclaration': (node) => {
                const dependencyInfo = getDependencyInfo(fileName, node.source.value, context.settings);

                const specifiersList = getSpecifiersFromImport(node);
                console.log({specifiersList});
                // console.log(hasCommentBefore(node, sourceCode));

                console.log({dependencyInfo});
                if (
                    dependencyInfo.isLocal &&
                    !dependencyInfo.isIgnored &&
                    !dependencyInfo.isInternal &&
                    !dependencyInfo.isChild
                ) {
                    context.report({
                        node,
                        type: PLUGIN_NAME,
                        messageId: 'unwantedImport'
                    });
                }
            },
        };
    }
};

function getSpecifiersFromImport(node) {
    return node.specifiers.map((importSpecifier) => {
        return importSpecifier.local.name;
    })
}


function hasCommentBefore(node, sourceCode) {
    return sourceCode.getCommentsBefore(node).some(comment => {
        return (
            node.type === 'Block' &&
            node.value.charAt(0) === '*' &&
            node.value.includes('@public') &&
            comment.loc.end.line >= node.loc.start.line - 1
        )
    })
}
