var app = getApp()
var util = require('../../../utils/util.js')
Page({
  data: {
    requestUrl: "",
    wordUrl: "",
    selsectState: [0, 0, 0, 0, 0],
    selectIndex: 0,
    loadMore: "",
    joke: {},
    dictionary: {},
    totalCount: 0,
    isEmpty: true,
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
  },
  onLoad: function (options) {
    var dataUrl = app.globalData.juheBase +
      "/joke/randJoke.php" + "?key=" + app.globalData.jokeKey;/*  +"&sort=desc&pagesize=3&time=" */
    this.data.requestUrl = dataUrl;
    var Url = app.globalData.juheBase +
      "/chengyu/query" + "?key=" + app.globalData.chengyuKey + "&word=";/*  +"&sort=desc&pagesize=3&time=" */
    this.data.wordUrl = Url;
  },


  //点击开心一刻
  clickJoke: function () {
    this.setData({
      selsectState: [1, 0, 0, 0, 0],
      selectIndex: 0,
      loadMore: "加载更多···"
    });
    var timest = util.timest();
    var url = this.data.requestUrl;/* +timest */
    console.log(url);
    util.http(url, this.processData);
  },

  //点击词典图标
  clickDict: function () {
    this.setData({
      selsectState: [0, 1, 0, 0, 0],
      selectIndex: 1
    });
  },
  //点击快递图标
  clickExpre: function () {
    this.setData({
      selsectState: [0, 0, 1, 0, 0],
      selectIndex: 2
    });
    wx.showToast({
      title: "还没空做🤣",
      duration: 3000,
      icon: "none"
    })

    // var url = "https://www.yimning.cn:8082/teacher/count";
    // util.http(url, this.processData1);

  },
  processData1: function (jokeData) {
    console.log(jokeData);
  },





  //点击更多图标
  clickMore: function () {
    this.setData({
      selsectState: [0, 0, 0, 1, 0],
      selectIndex: 3
    });
    wx.showActionSheet({
      itemList: [
        "给你个小彩蛋"
      ],
      itemColor: "#405f80",
      success: function (res) {
        wx.navigateTo({
          url: '../logs/logs'
        });
      }
    })
  },
  
  /*   onScrollLower: function (event) {
      var timest = util.timest();
      var url=this.data.requestUrl+timest;
      util.http(url, this.processData);
      wx.showNavigationBarLoading()
    }, */

  onPullDownRefresh: function (event) {
    var timest = util.timest();
    var url = this.data.requestUrl;   /* +timest */
    this.setData({
      joke: {},
    });
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(url, this.processData);
    wx.showNavigationBarLoading();
  },

  processData: function (jokeData) {
    console.log("初始化" + jokeData);
    var joke = [];
    //没有更多啦
    for (var idx in jokeData.result) {
      var subject = jokeData.result[idx];
      if (idx <= 2) {
        var temp = {
          content: subject.content,
        }
        joke.push(temp);
      }
    }
    this.setData({
      joke: joke,
    });
    console.log(joke);
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
  },

  /* 词典 */
  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onBindBlur: function (event) {
    var text = event.detail.value;//获取输入的文本
    var searchUrl = this.data.wordUrl + text;
    console.log("-----" + searchUrl);
    util.http(searchUrl, this.processSearchData);
  },
  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      dictionary: {}
    }
    )
  },
  processSearchData: function (searchData) {
    console.log("初始化" + searchData);
    var dictionary = [];
    var tongyi = [];
    //没有更多啦
    if (searchData.error_code == 0) {
      for (var idx in searchData.result.tongyi) {
        tongyi.push(searchData.result.tongyi[idx]);
      }
      var subject = searchData.result;
      var temp = {
        pinyin: subject.pinyin,
        chengyujs: subject.chengyujs,
        ciyujs: subject.ciyujs,
        lizi: subject.example,
        tongyi: tongyi,
      }
      dictionary.push(temp);
    } else {
      dictionary.push("");
      wx.showModal({
        title: '提示',
        content: searchData.reason,
        success: function (res) {
          if (res.confirm) {
            wx.showToast({
              title: "谢谢支持",
              duration: 1000,
              icon: "success"
            })
          } else if (res.cancel) {
            wx.showToast({
              title: "重新输入查询",
              duration: 1000,
              icon: "success"
            })
          }
        }
      })
    }
    /* } */
    this.setData({
      dictionary: dictionary,
    });
    console.log(dictionary);
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  //点击github
  clickGithub: function () {
    this.setData({
      selsectState: [0, 0, 0, 1, 0],
      selectIndex: 4
    });
  },
  //点击博客园
  clickBlog: function () {
    this.setData({
      selsectState: [0, 0, 0, 0, 1],
      selectIndex: 5
    });
  },

  onShareAppMessage: function () {
    return {
      title: '期待更多功能',
      desc: '分享个小程序，希望你喜欢☺️',
      success: function (res) {
        wx.showToast({
          title: "分享成功",
          duration: 1000,
          icon: "success"
        })
      }
    }
  }

})