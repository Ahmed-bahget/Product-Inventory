/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.js'],
    transform: {
        '^.+\\.js$': 'babel-jest', 
    },
};

export default config;