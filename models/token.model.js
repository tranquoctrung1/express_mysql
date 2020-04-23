const db = require('../utils/db');

module.exports.load = async function(req, res)
{
    return await db.load("select refreshToken, ID from userRefreshTokenExt t join users u on t.ID = u.f_ID ");
}