const util    = require('util'),
    Promise = require("bluebird");


const sql1 = "update country_state_city set lastLogin = now() where name = 'USA'";
const sql2 = "update country_state_city set lastLogin = now() where name = 'Canada'";

// Promise.using(pool.connect(), conn => {
//     conn.queryAsync(sql1)
//         .then(console.log)
//         .catch(err=>{
//         util.log("err>>", err);
//     });
//
//     pool.end();
// });

// Promise.using(pool.connect(), conn => {
//     conn.queryAsync(sql1, (err, ret) => {
//         util.log("sql1=", ret.affectedRows);
//
//     // conn.queryAsync(sql2, (err2, ret2) => {
//     //     util.log("sql2=", ret2.affectedRows);
//     //     });
//     });
//     pool.end();
// });


// Promise.using(pool.connect(), conn => {
//     Promise.all([
//         conn.queryAsync(sql1),
//         conn.queryAsync(sql2)
//     ]).then(r => {
//         util.log("End of Then!!!!!!!!!!!!!!");
//         util.log("sql1=", r[0].affectedRows);
//         util.log("sql2=", r[1].affectedRows);
//         pool.end();
//
//     }).catch(err =>{
//         util.log("EEEEEERRRRRRRRRR");
//         pool.end();
//     });
// });

// Promise.using(pool.connect(), conn => {
//     conn.beginTransaction(txerr => {
//         Promise.all([
//             conn.queryAsync(sql1),
//             conn.queryAsync(sql2)
//         ]).then(r => {
//             for(let i = 0; i<r.length; i++)
//                 util.log(`sql${i+1}=`, r[i].affectedRows);
//             conn.commit();
//             pool.end();
//
//         }).catch(e =>{
//             conn.rollback();
//             pool.end();
//         });
//     });
// });

// execute(conn=>{
//     Promise.all([
//         conn.queryAsync(sql1),
//         conn.queryAsync(sql2)
//     ]).then(r => {
//         for(let i = 0; i<r.length; i++)
//             util.log(`sql${i+1}=`, r[i].affectedRows);
//         conn.commit();
//         pool.end();
//
//     }).catch(e =>{
//         conn.rollback();
//         pool.end();
//     });
// });
//
// function execute(fn) {
//     Promise.using(pool.connect(), conn => {
//         conn.beginTransaction(txerr => {
//             fn(conn);
//         });
//     });
// }