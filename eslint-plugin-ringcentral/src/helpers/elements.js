const {getElementPathInfo, getDependencyPathInfo} = require('./path');

const getLastParent = (elementInfo) => {
    console.log({elementInfo});
    return elementInfo.parents && elementInfo.parents[0];
};

const getCommonAncestor = (elementInfo, dependencyInfo) => {
    if (!dependencyInfo.parents) {
        return;
    }
    return elementInfo.parents.find((parent) => dependencyInfo.parents.includes(parent));
};

const isInternalDependency = (elementInfo, dependencyInfo) => {
    return elementInfo.self === dependencyInfo.self;
};

const isBrotherDependency = (elementInfo, dependencyInfo) => {
    return getLastParent(elementInfo) === getLastParent(dependencyInfo);
};

const isChildDependency = (elementInfo, dependencyInfo) => {
    return elementInfo.self === getLastParent(dependencyInfo);
};

const getElementInfo = (filePath, settings) => {
    return getElementPathInfo(filePath, settings);
};

const isCommonAncestorChildDependency = (elementInfo, dependencyInfo) => {
    return getCommonAncestor(elementInfo, dependencyInfo) === getLastParent(dependencyInfo);
};

const getDependencyInfo = (filePath, dependencyPath, settings) => {
    const elementInfo = getElementInfo(filePath, settings);
    const dependencyPathInfo = getDependencyPathInfo(filePath, dependencyPath, settings);

    if (dependencyPathInfo.isLocal) {
        const isInternal = isInternalDependency(elementInfo, dependencyPathInfo);
        const isBrother = !isInternal && isBrotherDependency(elementInfo, dependencyPathInfo);
        const isChild =
        !isInternal && !isBrother && isChildDependency(elementInfo, dependencyPathInfo);
        const isCommonAncestorChild =
        !isInternal &&
        !isBrother &&
        isCommonAncestorChildDependency(elementInfo, dependencyPathInfo);

        return {
            ...dependencyPathInfo,
            isInternal,
            isBrother,
            isChild,
            isCommonAncestorChild,
        };
    }

    return dependencyPathInfo;
};

const isNotRecognizedOrIgnored = (elementInfo) => {
    return !elementInfo.type || elementInfo.isIgnored;
};

module.exports = {
    getElementInfo,
    getDependencyInfo,
    isNotRecognizedOrIgnored,
};
