// import resolve from 'eslint-module-utils/resolve'

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
    create: function(context) {
        const source = context.getSourceCode();

        function reportMissingComment(node) {
            context.report({
                node,
                messageId: 'missingJSDocPublicComment'
            });
        }

        function isJSDocCommentToken(token) {
            return token.type === 'Block' && token.value.charAt(0) === '*' && token.value.includes('@public');
        }

        function hasCommentBefore(node, sourceCode) {
            return sourceCode.getCommentsBefore(node).some(comment => {
                return (
                    isJSDocCommentToken(comment) &&
                    comment.loc.end.line >= node.loc.start.line - 1
                )
            })
        }

        return {
            ExportNamedDeclaration(node) {
                if (!hasCommentBefore(node, source)) {
                    reportMissingComment(node)
                }
            },
            ExportDefaultDeclaration(node) {
                if (!hasCommentBefore(node, source)) {
                  reportMissingComment(node);
                }
            }
        };
      }
};
