// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    movies: {},
    requestUrl: {},
    TotalCount: 0,
    IsEmpty: true,
    navigationTitle: ""
    // 似乎不写也能拿到
  },
  onLoad: function (options) {
    var category = options.category;
    this.data.navigationTitle = category;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.getMovieListData(dataUrl, this.processDoubanData);
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },
  onViewMoviePostImg: function (event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },
  onScrollLower: function (event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.TotalCount + "&&count=20";
    util.getMovieListData(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl + "?start=0&&count=20";
    this.data.movies = {};
    this.data.IsEmpty = true;
    this.data.TotalCount = 0;
    util.getMovieListData(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
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
    var totalMovies = {};
    // 如果要绑定新加载的数据,那么需要同旧数据合并在一起
    if (!this.data.IsEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.IsEmpty = false;
    }
    this.data.TotalCount += 20;
    this.setData({ movies: totalMovies });
    wx.hideNavigationBarLoading();
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle
    })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})