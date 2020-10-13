'use strict';

// const path = require('path');

const IMPORT_DECLARATION = 'ImportDeclaration';

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
        const cwd = context.getCwd();
        const source = context.getSourceCode();
        const filename = context.getFilename();
        // const pathToFile = path.resolve(filename);

        const importList = new Map();

        function reportMissingComment(node) {
            context.report({
                node,
                messageId: 'missingJSDocPublicComment'
            });
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

        function checkUsage(node) {
            if (!hasCommentBefore(node, source)) {
                reportMissingComment(node)
            }
        }

        function extractImports(programNode) {
            const imports = []

            for (const item of programNode.body) {
                if (item.type === IMPORT_DECLARATION) {
                    imports.push(item);
                }
            }

            return imports;
        }

        return {
            'Program': node => {
                for (const imports of extractImports(node)) {
                    // console.log(imports);
                }
            },
            'ImportDeclaration': node => {
                // console.log(node.source.value);
            },
            'ExportNamedDeclaration': node => {
                checkUsage(node);
            },
            'ExportDefaultDeclaration': node => {
                checkUsage(node);
            }
        };
    }
};
