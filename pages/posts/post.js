var postsData=require("../../data/posts-data.js")
Page({
  data:{
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个A动作的执行，是在onLoad事件执行之后发生的
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData({
      posts_key:postsData.postList
      });
    // 在wx小程序中data中的属性必须以上设置 设置setData（｛键：值｝）
  },
  onPostTap:function(event){
    var postId=event.currentTarget.dataset.postid;
    // 获取当前点击的属性
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})