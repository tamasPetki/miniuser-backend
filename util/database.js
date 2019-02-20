const Sequelize = require('sequelize');

const sequelize = new Sequelize('heroku_af81a7c1511ead9', 'b1e9560790273b', '5eaedd81', {
    dialect: 'mysql', host: 'eu-cdbr-west-02.cleardb.net',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


module.exports = sequelize;
