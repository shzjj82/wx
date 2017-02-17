var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({
    onLoad: function (option) {
        var postId = option.id;
        this.data.CurrentPostId = postId
        var postData = postsData.postList[postId];
        // 如果在onLoad方法中，不是异步的去执行一个数据绑定
        // 则不需要使用this.setData方法
        // 只需要对this.data赋值即可实现数据绑定
        // 在在0.12版本之后的小程序不再支持this.data的方法 仅只支持this.setData()的方法
        this.setData({
            postData: postData
        })
        var postscollected = wx.getStorageSync('posts_collected');
        // 从缓存中获取postscollected
        if (postscollected) {
            // 如果缓存 存在postscollected值
            var postcollected = postscollected[postId];
            // 获取缓存中当前的值 并赋予data中使wxml可以获取绑定的数据
            this.setData({
                collected: postcollected
            })
        }
        else {
            // 如果缓存 不存在postscollected值
            var postscollected = {};
            // 设置一个postscollected 并使postscollected当前对象为为false
            // 并将这些设置到缓存中去
            postscollected[postId] = false;
            wx.setStorageSync('posts_collected', postscollected)
        }
        if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){
            this.setData({
                isPlayingMusic: true
            })
        }
        this.setMusicMonitor();
        //     wx.setStorageSync('key', {
        //         game:"炉石传说",
        //         develop:"暴雪"
        //     })
        //     // 缓存最高上限不能超过10MB
        //     // 异步缓存 setStorageSync getStorageSync removeStorageSync clearStorageSync
        //     // 同步缓存 setStorage getStorage removeStorage clearStorage
        // },
        // onCollection:function(event){
        //     var game=wx.getStorageSync('key');
        //     console.log(game);
        // },
        // onShare:function(event){
        //     // wx.removeStorageSync('key');
        //     wx.clearStorageSync();
    },
    setMusicMonitor: function () {
        wx.onBackgroundAudioPlay(function () {
            this.setData({
                isPlayingMusic: true
            })
            app.globalData.g_isPlayingMusic=true;
            app.globalData.g_currentMusicPostId=this.data.CurrentPostId
        }.bind(this))
        wx.onBackgroundAudioPause(function () {
            this.setData({
                isPlayingMusic: false
            })
             app.globalData.g_isPlayingMusic=false;
             app.globalData.g_currentMusicPostId=null
        }.bind(this))
         wx.onBackgroundAudioStop(function () {
            this.setData({
                isPlayingMusic: false
            })
             app.globalData.g_isPlayingMusic=false;
             app.globalData.g_currentMusicPostId=null
        }.bind(this))
    },
    onCollection: function (event) {
        // // 获取缓存中的postscollected
        // var postscollected = wx.getStorageSync('posts_collected');
        // var postcollected = postscollected[this.data.CurrentPostId];
        // // 获取缓存中的postscollected当前对象
        // postcollected = !postcollected;
        // // 取反
        // postscollected[this.data.CurrentPostId] = postcollected;
        // // 把 postscollected当前对象的值改为取反后的值
        // // wx.setStorageSync('posts_collected', postscollected);
        // // // 更新到缓存中去
        // // this.setData({
        // //     collected: postcollected
        // // })
        // // 使wxml中可以获取到
        // // wx.showToast({
        // //     title:postcollected?"收藏成功":"取消收藏",
        // //     duration:1500
        // // })
        // this.showToast(postscollected, postcollected);
        // // this.showModel(postscollected, postcollected);
        this.getPostCollectedSyc()
        // this.getPostcollectedAsy();
    },
    showModel: function (postscollected, postcollected) {
        wx.showModal({
            title: "收藏",
            content: postcollected ? "收藏该文章?" : "取消收藏该文章?",
            showCancel: "true",
            cancelText: "取消",
            cancelColor: "#000",
            confirmText: "确定",
            confirmColor: "#000",
            success: function (res) {
                if (res.confirm) {
                    wx.setStorageSync('posts_collected', postscollected);
                    this.setData({
                        collected: postcollected
                    })
                }
            }.bind(this)
        })
    },
    getPostCollectedSyc: function () {
        // 获取缓存中的postscollected
        var postscollected = wx.getStorageSync('posts_collected');
        var postcollected = postscollected[this.data.CurrentPostId];
        // 获取缓存中的postscollected当前对象
        postcollected = !postcollected;
        // 取反
        postscollected[this.data.CurrentPostId] = postcollected;
        // 把 postscollected当前对象的值改为取反后的值
        // wx.setStorageSync('posts_collected', postscollected);
        // // 更新到缓存中去
        // this.setData({
        //     collected: postcollected
        // })
        // 使wxml中可以获取到
        // wx.showToast({
        //     title:postcollected?"收藏成功":"取消收藏",
        //     duration:1500
        // })
        this.showToast(postscollected, postcollected);
        // this.showModel(postscollected, postcollected);
    },
    getPostcollectedAsy: function () {
        wx.getStorage({
            key: "posts_collected",
            success: function (res) {
                var postscollected = res.data;
                var postcollected = postscollected[this.data.CurrentPostId];
                // 获取缓存中的postscollected当前对象
                postcollected = !postcollected;
                // 取反
                postscollected[this.data.CurrentPostId] = postcollected;
                this.showToast(postscollected, postcollected);
            }.bind(this)
        })
    },
    showToast: function (postscollected, postcollected) {
        wx.setStorageSync('posts_collected', postscollected);
        this.setData({
            collected: postcollected
        })
        wx.showToast({
            title: postcollected ? "收藏成功" : "取消收藏",
            duration: 1500
        })
    },
    onShareTap: function (event) {
        var itemList = [
            "分享到微信好友",
            "分享到微信朋友圈",
            "分享到QQ",
            "分享到微博"
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                wx.showModal({
                    title: "分享到",
                    content: "用户" + itemList[res.tapIndex] + res.cancel
                    // res.tapIndex itemList对应的index值
                    // res.cancel 取消 当点击取消时 值为true否则值为undefined
                })
            }
        })
    },
    onMusicTap: function (event) {
        var isPlayingMusic = this.data.isPlayingMusic;
        var postdatacurrent = postsData.postList[this.data.CurrentPostId];
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio()
            isPlayingMusic = false;
            this.setData({ isPlayingMusic: isPlayingMusic })
        } else {
            wx.playBackgroundAudio({
                dataUrl: postdatacurrent.music.url,
                title: postdatacurrent.music.title,
                coverImgUrl: postdatacurrent.music.coverImg
            })
            isPlayingMusic = true;
            this.setData({ isPlayingMusic: isPlayingMusic })
        }

    }
})