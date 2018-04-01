const configs = {
    development: {
        host: 'http://localhost:7575',
        GetChannelKey: '/GetChannelKey',
        CheckAccountOneStep:'/CheckAccount/OneStep',
        testOptions: {
            channel: "testAAA",
            password: "NJHLDR6A",
            loginID:"TESTJ00922",
            userPassword:"qwerty",
            ip:"127.0.0.1",
            version:"chrome",
            language:"BIG5"
        }
    },
    test: {
        host: 'http://localhost:7575',
        GetChannelKey: '/GetChannelKey',
        CheckAccountOneStep:'/CheckAccount/OneStep',
        testOptions: {
            channel: "testAAA",
            password: "NJHLDR6A",
            loginID:"TESTJ00922",
            userPassword:"qwerty",
            ip:"127.0.0.1",
            version:"chrome",
            language:"BIG5"
        }
    }
}

const node_env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const config = configs[node_env];

module.exports = config;