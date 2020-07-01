const allRules = {
    'specified-comment-with-task-id': require('./rules/specified-comment-with-task-id'),
    'restrict-unwanted-imports': require('./rules/restrict-unwanted-imports'),
};

module.exports = {
    rules: allRules,
    configs: {
        all: {
            rules: {
                'ringcentral/specified-comment-with-task-id': 2,
                'ringcentral/restrict-unwanted-imports': 2,
            },
        },
        'all-warn': {
            rules: {
                'ringcentral/specified-comment-with-task-id': 1,
                'ringcentral/restrict-unwanted-imports': 1,
            },
        },
        recommended: {
            rules: {
                'ringcentral/specified-comment-with-task-id': 1,
                'ringcentral/restrict-unwanted-imports': 1,
            },
        },
    }
}
