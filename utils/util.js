function converTostarsArray(stars) {
  var num = parseInt(stars);
  var arr = [];
  var fn = function (num) {
    num -= 10;
    if (num >= -1) {
      arr.push(1);
      //黄色五角星
      fn(num);
    } else if (arr.length < 5) {
      arr.push(3);
      //灰色五角星
      fn(num);
    }
  }
  fn(num);
  if (num % 10 == 5) {
    arr[arr.length - 1] = 2;
    // 半色五角星
  }
  return arr.sort();
};
function convertToCastString(casts){
  var castsjoin="";
  for(var idx in casts){
    castsjoin=castsjoin+casts[idx].name+"/";
  }
  return castsjoin.substring(0,castsjoin.length-1);
};
function convertToCastInfos(casts){
  var castsArray=[];
    for(var idx in casts){
      var cast={
        img:casts[idx].avatars?casts[idx].avatars.large:"",
        name:casts[idx].name
      }
      castsArray.push(cast);
    }
  return castsArray;
};
function getMovieListData(url,callback) {
        wx.request({
            url: url,
            data: {},
            method: 'GET', 
            header:{
                "content-type":"json"
            },
            success: function (res) {
                callback(res.data)
            },
            fail: function () {
              
            }
        })
};
module.exports = {
  converTostarsArray: converTostarsArray,
  convertToCastString:convertToCastString,
  convertToCastInfos:convertToCastInfos,
  getMovieListData:getMovieListData
}
