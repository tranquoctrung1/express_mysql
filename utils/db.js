const mysql = require('mysql');
const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);

module.exports = {
  load: function (sql) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results, fields) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },

  // load: function (sql, fn_done, fn_fail) {
  //   pool.query(sql, function (error, results, fields) {
  //     if (error) {
  //       return fn_fail(error);
  //     }

  //     fn_done(results);
  //   });
  // },

  // load: function (sql, fn_done, fn_fail) {
  //   const cn = mysql.createConnection(config.mysql);
  //   cn.connect();
  //   cn.query(sql, function (error, results, fields) {
  //     if (error) {
  //       cn.end();
  //       fn_fail(error);
  //       return;
  //     }
  //     fn_done(results);
  //     cn.end();
  //   });
  // }
};
