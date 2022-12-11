var mysql      = require('mysql');
var fs = require('fs');
const {date_date, timestamp_transfort, date_date_year} = require(".././My_Module");
var con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : ''
});
 //傳遞資料致資料庫
function  sendData(data_date, data_temp, data_water, data_dust, data_light, data_Water_Motor, data_id){
  let data_result;
  timestamp = timestamp_transfort(data_date);
  var sql = `INSERT INTO test (date, temp, humidity, dust, light, Water_Motor, act, data_id) VALUES ('${timestamp}', ${data_temp}, ${data_water}, ${data_dust}, ${data_light}, ${data_Water_Motor}, 0, ${data_id})`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("database update success");
    console.log("--------------------------")
  });
  var sql = `UPDATE test SET data_id = ${data_id} WHERE act = '1'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
  //mysql_data.json更新
  let data_grenerate = date_date_year(); 
  update_data(data_grenerate);
};

 //查閱資料庫
function  lookup_data(req, res, data_generate){
  con.query(`SELECT * FROM test WHERE date LIKE '${data_generate}%'`, function (err, result) {
    if (err) throw err;
    console.log("查閱資料");
    console.log("-------------------------")
    let data_result = JSON.stringify(result); //to string
    fs.writeFile('./db/mysql_data.json', data_result, err => {
      if (err) {
        console.error(err);
      }
      console.log("寫入資料");
      console.log("取得更新資料");
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(data_result);

    });
  });
};

 //傳遞資料時所使用的更新mysql_data.json資料
 function  update_data(data_generate){
  con.query(`SELECT * FROM test WHERE date LIKE '${data_generate}%'`, function (err, result) {
    if (err) return err;
    console.log("查閱資料");
    let data_result = JSON.stringify(result); //to string
    fs.writeFile('./db/mysql_data.json', data_result, err => {
      if (err) {
        console.error(err);
      }
      console.log("更新資料");
      console.log("-------------------------")
    });
  });
};

con.connect(function(err) {
  
  if (err) throw err;
  console.log("Connected!");
  /* 刪除表
  var sql = "DROP TABLE test";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
  */

  con.query("SELECT * FROM test", function (err, result, fields) {
    if (err) {                                                                               
      var sql = "CREATE TABLE test (date VARCHAR(255), temp VARCHAR(255), humidity VARCHAR(255), dust VARCHAR(255), light VARCHAR(255), Water_Motor VARCHAR(255), act VARCHAR(255), data_id VARCHAR(255))";
      con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
      }); 
    }
    if (result == ""){
      var sql = `INSERT INTO test (date, temp, humidity, dust, light, Water_Motor, act, data_id) VALUES ('2022-10-30 16:34:22', 0, 0, 0, 0, 0, 1, 0)`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
      });
    }
    console.log(result)
  });
  


});

module.exports = {
  sendData,
  lookup_data,
  update_data
};

