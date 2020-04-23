const db = require('../utils/db');

module.exports.load = async function(req, res)
{
    return await db.load("select * from users");
}