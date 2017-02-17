Page({
    onTap:function(event){
        // wx.navigateTo({
        //   url: '../posts/post',
        //   success: function(res){
        //     // success
        //   },
        //   fail: function() {
        //     // fail
        //   },
        //   complete: function() {
        //     // complete
        //   }
        // })
        // navigateTo 最多跳转5次 页面被隐藏了
        // redirectTo 不支持TabBar功能 
        // switchTab 支持有有TabBar 既能实现redirectTo的效果 也能完成TabBar的要求
        wx.switchTab({
          url: '../posts/post',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete 
          }
        });
        // redirectTo() 页面被关闭或者卸载了
    }
    // onUnload:function(){
    //     console.log("welcome page is Unload")
    //     // onUnload 页面被关闭和卸载了 redirectTo()执行的是页面被关闭卸载了了 所以不存在返回
    // },
    // onHide:function(){
    //     console.log("welcome page is Hide")
    //     // Hide页面被影藏起来了了 navigateTo（）执行的是页面被隐藏起来 所以才会返回
    // }
})