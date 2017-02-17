var util = require("../../utils/util.js");
var app = getApp();
Page({
    data: {
        inTheater: {},
        comingSoon: {},
        top250: {},
        search: {},
        containerShow: true,
        searchPanelShow: false
    },
    onLoad: function (options) {
        var inTheaterUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&&count=3";
        var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&&count=3";
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&&count=3";
        this.getMovieListData(inTheaterUrl, "inTheater", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250", "Top250");
    },
    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category,
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
    onMovieTap:function(event){
        var movieId=event.currentTarget.dataset.movieid;
        wx.navigateTo({
          url: 'movie-detail/movie-detail?id=' + movieId
        })
    },
    onBindFocus: function (event) {
        this.setData({
            containerShow: false,
            searchPanelShow: true
        })
    },
    onCancelImgTap: function (event) {
        this.setData({
            containerShow: true,
            searchPanelShow: false,
            search:{}
        })
    },
    onBindBlur: function (event) {
        var text = event.detail.value;
        var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
        this.getMovieListData(searchUrl, "search", "");

    },
    getMovieListData: function (url, settedkey, categoryTitle) {
        wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            header: {
                "content-type": "json"
            },
            success: function (res) {
                console.log(res.data);
                this.processDoubanData(res.data, settedkey, categoryTitle)
            }.bind(this),
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
    processDoubanData: function (moviedouban, settedkey, categoryTitle) {
        var movies = [];
        for (var idx in moviedouban.subjects) {
            var subject = moviedouban.subjects[idx];
            var title = subject.title;
            if (title.length > 6) {
                title = title.substring(0, 6) + "...";
            }
            var temp = {
                title: title,
                stars: util.converTostarsArray(subject.rating.stars),
                coverageUrl: subject.images.large,
                average: subject.rating.average,
                movieid: subject.id
            }
            movies.push(temp)
        }
        var readyData = {};
        readyData[settedkey] = {
            categoryTitle: categoryTitle,
            movies: movies
        }
        this.setData(readyData)
    }
})