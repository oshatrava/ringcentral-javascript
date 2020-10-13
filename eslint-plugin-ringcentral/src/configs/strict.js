const {
    SPECIFIED_COMMENT_WITH_TASK_ID,
} = require('../constants/settings');

const recomendedConfig = require('./recomended');

module.exports = {
    ...recomendedConfig,
    rules: {
        ...recomendedConfig.rules,
        [SPECIFIED_COMMENT_WITH_TASK_ID]: 2,
    }
};
