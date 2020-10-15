const {PLUGIN_NAME} = require('../constants/plugin');
const {
    RESTRICT_UNWANTED_IMPORTS,
    SPECIFIED_COMMENT_WITH_TASK_ID,
} = require('../constants/settings');

module.exports = {
    plugin: PLUGIN_NAME,
    rules: {
        [SPECIFIED_COMMENT_WITH_TASK_ID]: 1,
        [RESTRICT_UNWANTED_IMPORTS]: 0,
    }
};
