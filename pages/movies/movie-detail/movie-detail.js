var app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {},
  onLoad: function (options) {
    var movieId = options.id
    var detailUrl = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    util.getMovieListData(detailUrl, this.processDoubanData);
  },
  processDoubanData: function (data) {
    var director = {
      name: "",
      avatar: "",
      id: ""
    };
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        // director.avatar=data.directors.avatars.large;
      }
      director.name = data.directors.name;
      director.id = data.directors.id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.converTostarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary,
    }
    this.setData({
      movie: movie
    });
  },
  onViewMoviePostImg: function (event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }
})