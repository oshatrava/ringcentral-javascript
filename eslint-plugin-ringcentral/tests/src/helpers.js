const path = require('path');

const absoluteFilePath = (relativePath) => {
    return path.resolve(process.cwd(), path.join('tests', 'fixtures',  relativePath));
};

module.exports = {
    absoluteFilePath,
};

