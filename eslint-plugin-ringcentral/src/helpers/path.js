const path = require('path');
const globule = require('globule');

const {IGNORE} = require('../constants/settings');

const PATH_SEP = path.sep;

let _globuleFound = {};
let basePath;

const getBasePath = () => {
    if (basePath) {
        return basePath;
    }
    basePath = path.resolve(process.cwd());
    return basePath;
};

const getLastPath = (filePath) => {
    return filePath.split(PATH_SEP).pop();
};

const getParentFolders = (filePath, level = 1) => {
    const parentFolders = filePath.split(PATH_SEP);
    return parentFolders.slice(0, parentFolders.length - level);
};

const getFileFolder = (filePath, level) => {
    return getParentFolders(filePath, level).join(PATH_SEP);
};

const getRelativePath = (filePath) => {
    return filePath.replace(`${getBasePath()}${PATH_SEP}`, '');
};

const existingPath = (absolutePath) => {
    if (!_globuleFound[absolutePath]) {
        _globuleFound[absolutePath] = {
            exists: globule.find(absolutePath).length > 0,
        };
    }
    return _globuleFound[absolutePath].exists ? absolutePath : null;
};

const isMatch = (matcher, filePath) => globule.match(matcher, filePath).length > 0;

const isIgnored = (filePath, settings) => {
    return isMatch(settings[IGNORE], filePath);
};

const getDependencyAbsolutePath = (filePath, dependencyPath, settings) => {
    const fileFolder = getFileFolder(filePath);
    const absoluteFilePath = path.resolve(fileFolder, dependencyPath);

    // return (
    //     // existingPath(addFileExtension(absoluteFilePath)) ||
    //     // existingPath(addIndexFileToPath(absoluteFilePath)) ||
    //     existingPath(absoluteFilePath) ||
    //     absoluteFilePath
    // );

    return existingPath(absoluteFilePath) || absoluteFilePath;
};

const getElementType = (relativePath) => {
    return getLastPath(getFileFolder(relativePath, 1));
  };

  const getElementName = (relativePath) => {
    return getLastPath(getFileFolder(relativePath, 0));
  };

const getLastTypeAndName = (folders, settings, index, parentElements = []) => {
    const startIndex = typeof index !== 'undefined' ? index : folders.length;
    if (
        // Array.isArray(settings[TYPES]) &&
        // settings[TYPES].includes(folders[startIndex]) &&
        folders[startIndex + 1]
    ) {
        parentElements.push(folders.slice(0, startIndex + 2).join(PATH_SEP));
    }

    if (startIndex > 0) {
        return getLastTypeAndName(folders, settings, startIndex - 1, parentElements);
    }

    return parentElements;
};

const getParentElements = (relativePath, settings) => {
    return getLastTypeAndName(getParentFolders(relativePath), settings);
  };

const getElementSelf = (relativePath, settings) => {
    return getLastTypeAndName(getParentFolders(relativePath), settings)[0];
};

const getElementPathInfo = (absolutePath, settings) => {
    const relativePath = getRelativePath(absolutePath);
    const selfElement = getElementSelf(relativePath, settings);
    return {
        absolutePath,
        relativePath,
        isLocal: true,
        isIgnored: isIgnored(relativePath, settings),
        self: selfElement,
        parents: selfElement && getParentElements(selfElement, settings),
        type: selfElement && getElementType(selfElement),
        name: selfElement && getElementName(selfElement),
        privatePath: relativePath.replace(`${selfElement}${PATH_SEP}`, ""),
        exists: existingPath(absolutePath) ? true : false,
    };
};

const getDependencyPathInfo = (filePath, dependencyPath, settings) => {
    // if (isLocalDependency(dependencyPath, settings)) {
    const absolutePath = getDependencyAbsolutePath(filePath, dependencyPath, settings);
    return getElementPathInfo(absolutePath, settings);
    // }

    // return {
    //     name: dependencyPath,
    // };
};

module.exports = {
    isMatch,
    isIgnored,
    getBasePath,
    getRelativePath,
    getElementPathInfo,
    getDependencyPathInfo,
};
