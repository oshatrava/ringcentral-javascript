const path = require('path');
const RuleTester = require('eslint').RuleTester;

const absoluteFilePath = (relativePath) => {
    return path.resolve(process.cwd(), path.join('tests', 'fixtures',  relativePath));
};

const relativeFilePath = (relativePath) => {
    return path.join('test', 'fixtures', relativePath);
};

const createRuleTester = () => {
    const ruleTester = new RuleTester({
        parserOptions: {
            ecmaVersion: 2015,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true
            },
        }
    });

    return ruleTester;
};

module.exports = {
    absoluteFilePath,
    relativeFilePath,
    createRuleTester,
};

