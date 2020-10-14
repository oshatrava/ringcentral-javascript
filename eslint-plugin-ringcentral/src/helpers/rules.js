const {getElementInfo} = require('./elements');

const getContextInfo = (context) => {
    const fileName = context.getFilename();
    const currentElementInfo = getElementInfo(fileName, context.settings);
    return {
        fileName,
        currentElementInfo
    };
};

module.exports = {
    getContextInfo,
};
