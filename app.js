// App({
//   onLaunch: function () {
//     console.log("onLaunch");
//   },
//   onShow: function () {
//     console.log("onShow");
//   },
//   onHide: function () {
//      console.log("onHide");
//   }
// })
App({
    globalData:{
      g_isPlayingMusic:false,
      g_currentMusicPostId:null,
      doubanBase:"https://api.douban.com"
    }
})