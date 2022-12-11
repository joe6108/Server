
function hi(){
  console.log("hi");
}

//日期生產模組
function date_date(){
  //取得日期
  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();
  //取得當下時間(年月日時分秒)
  let data_now = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
  
  return data_now;
}

//日期生產模組-只生產年月日
function date_date_year(){
  //取得日期
  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();
  //取得當下時間(年月日時分秒)
  let data_now = year + "-" + month + "-" + date;
  
  return data_now;
}

//時間戳轉換器 timestamp -> date_now
function timestamp_transfort(timestamp_get){
    let data_ob = new Date(timestamp_get);

    // adjust 0 before single digit date
    let date = ("0" + data_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (data_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = data_ob.getFullYear();
    // current hours
    let hours = data_ob.getHours();
    // current minutes
    let minutes = data_ob.getMinutes();
    // current seconds
    let seconds = data_ob.getSeconds();
    //取得當下時間(年月日時分秒)
    let data_now = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    //console.log(data_now);
  
    return data_now;
}

module.exports= {
  date_date : date_date,
  hi : hi,
  timestamp_transfort : timestamp_transfort,
  date_date_year : date_date_year
}