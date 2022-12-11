const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const ngrok = require('ngrok');
const port = 3000; 
const ip = "127.0.0.1";
//const {sendData, lookup_data, update_data} = require("./db/conn.js");
const {date_date, timestamp_transfort, date_date_year} = require("./My_Module");
//For parsing application/json 才能解析json
app.use(express.json());
app.use(express.static(__dirname + '/views/img'));


app.post('/', function (req, res) {
    //生產日期
    data_now = date_date();
    console.log(data_now);
    var data = req.body;
    console.log(`接收到的資料:`);
    console.log(data);
    //解析資料
    var temp = data.Temperature;
    var humidity = data.Humidity;
    var dust = data.Dust;
    var light = data.LightDR;
    var Water_Motor = data.WaterMotor;
    var timestamp = data.timestamp;
    var Water_Motor_amount;
    var data_id;
    //如果沒讀到資料(null) 賦予暫定值
    if(!temp){
        temp = 10000;
    }
    if(!humidity){
        humidity = 10000;
    }
    if(!dust){
        dust = 10000;
    }
    if(!light){
        light = 10000;
    }
    if(Water_Motor == 'true'){
        Water_Motor_amount = 1;
    }else if(!Water_Motor){
        Water_Motor_amount = 0;
    }else{
        Water_Motor_amount = 0;
    }
    if(!timestamp){
        timestamp = 10000;
    }
    //讀取json資料 進行資料更新
    let test_json =  fs.readFileSync(`./json/data_50.json`);
    let data_json = JSON.parse(test_json);
    count = data_json['count'];
    id = data_json['next_id'];
    data_id = id;
    amount_data = 50 // 資料總數
    if(count < 50){
        data_json['count'] = count + 1;
        data_json['next_id'] = id + 1;
        data_json[`${id}`]['date'] = timestamp;
        data_json[`${id}`]['temp'] = temp;
        data_json[`${id}`]['humidity'] = humidity;
        data_json[`${id}`]['dust'] = dust;
        data_json[`${id}`]['light'] = light;
        data_json[`${id}`]['Water_Motor'] = Water_Motor_amount;
    }else{
        data_json['next_id'] = id + 1;
        now_id = id % 50;
        if(now_id != 0){
            data_json[`${now_id}`]['date'] = timestamp;
            data_json[`${now_id}`]['temp'] = temp;
            data_json[`${now_id}`]['humidity'] = humidity;
            data_json[`${now_id}`]['dust'] = dust;
            data_json[`${now_id}`]['light'] = light;
            data_json[`${now_id}`]['Water_Motor'] = Water_Motor_amount;
        }else{
            data_json['50']['date'] = timestamp;
            data_json['50']['temp'] = temp;
            data_json['50']['humidity'] = humidity;
            data_json['50']['dust'] = dust;
            data_json['50']['light'] = light;
            data_json['50']['Water_Motor'] = Water_Motor_amount;
        }
    }
    
    //插入一份資料放到資料庫
    //sendData(timestamp, temp, humidity, dust, light, Water_Motor_amount, data_id);

    //資料寫入
    fs.writeFileSync('./json/data_50.json', JSON.stringify(data_json));
    console.log("json success")
    //開啟靜態json並回傳。
    fs.readFile(`./json/success.json`, (error, data) => { 
        if (error) { 
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.write("error = " + error + "\n");
          res.end("Sorry, 讀檔失敗");
          console.log("error");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(data);
        }
    });
});

//監測的HTML
app.get('/home', function(req, res) {    
    fs.readFile(`views/index.html`, (error, data) => { 
        if (error) { 
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.write("error = " + error + "\n");
            res.end("Sorry, internal error");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});

//監測的HTML
app.get('/home/about', function(req, res) {    
    fs.readFile(`views/about.html`, (error, data) => { 
        if (error) { 
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.write("error = " + error + "\n");
            res.end("Sorry, internal error");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});

//前50筆資料輸出
app.get('/data_source.json', function(req, res) {    
    fs.readFile(`./json/data_50.json`, (error, data) => { 
        if (error) { 
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.write("error = " + error + "\n");
          res.end("Sorry, internal error");
          console.log("error");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(data);
        }
    });
});

//監測的HTML
app.get('/home/temp', function(req, res) {    
    fs.readFile(`views/monitor_temp.html`, (error, data) => { 
        if (error) { 
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.write("error = " + error + "\n");
            res.end("Sorry, internal error");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});

//監測的HTML
app.get('/home/dust', function(req, res) {    
    fs.readFile(`views/monitor_Dust.html`, (error, data) => { 
        if (error) { 
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.write("error = " + error + "\n");
            res.end("Sorry, internal error");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});

//監測的HTML
app.get('/home/humidity', function(req, res) {    
    fs.readFile(`views/monitor_Humidity.html`, (error, data) => { 
        if (error) { 
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.write("error = " + error + "\n");
            res.end("Sorry, internal error");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});

//監測的HTML
app.get('/home/light', function(req, res) {    
    fs.readFile(`views/monitor_Light.html`, (error, data) => { 
        if (error) { 
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.write("error = " + error + "\n");
            res.end("Sorry, internal error");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});

//監測的HTML
app.get('/home/WM', function(req, res) {    
    fs.readFile(`views/monitor_WM.html`, (error, data) => { 
        if (error) { 
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.write("error = " + error + "\n");
            res.end("Sorry, internal error");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});

//監測的HTML database相關
/*
app.get('/home/mintor/amount', function(req, res) {    
    update_data();
    fs.readFile(`views/monitor_amount.html`, (error, data) => { 
        if (error) { 
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.write("error = " + error + "\n");
            res.end("Sorry, internal error");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});

//資料庫資料
app.get('/database/lookup.json', function(req, res) {  
    let data_grenerate = date_date_year(); 
    lookup_data(req, res, data_grenerate);
});
*/

//測試用
app.get('/test', function(req, res) {    
    test = 1667118621217;
    console.log(timestamp_transfort(test));
});



// server create
app.listen(port, () => {
    //console.log(Date.now());
    //內網
    console.log(`(內網)Server 開始監聽 http://${ip}:${port}/home`);
});
