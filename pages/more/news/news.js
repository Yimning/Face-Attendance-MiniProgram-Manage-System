var app = getApp();
Page({

  data: {
    topNews: [],
    newsType: 'guoji',
    selsectState: [1, 0, 0, 0, 0]
  },

  onLoad: function (options) {
    var that = this
    // 访问聚合数据的网络接口-头条新闻
    wx.request({
      url: app.globalData.juhetoutiaoBase,
      data: {
        type: 'guoji',
        key: app.globalData.juhetoutiaoKey
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.error_code == 0) {
          that.setData({
            topNews: res.data.result.data
          })
        } else {
          console.log('获取失败');
        }
      }
    })
  },

  //数据受限没有详情信息，给用户一个提示就好
  bindViewTap: function (event) {
/*     wx.showModal({

    }) */
    var url = event.currentTarget.dataset.url;
    console.log(url);
    wx.navigateTo({
      url: 'content/content?contenturl=' + url,
    })
  },

  clickNation: function () {
    this.setData({
      newsType: 'guoji',
      selsectState: [1, 0, 0, 0, 0]
    })
    this.getNews();
  },
  clickSport: function () {
    this.setData({
      newsType: 'tiyu',
      selsectState: [0, 1, 0, 0, 0]
    })
    this.getNews();
  },
  clickScience: function () {
    this.setData({
      newsType: 'keji',
      selsectState: [0, 0, 1, 0, 0]
    })
    this.getNews();
  },
  clickHappy: function () {
    this.setData({
      newsType: 'shehui',
      selsectState: [0, 0, 0, 1, 0]
    })
    this.getNews();
  },
  clickFinance: function () {
    this.setData({
      newsType: 'caijing',
      selsectState: [0, 0, 0, 0, 1]
    })
    this.getNews();
  },

  getNews: function () {
    var that = this
    // 访问聚合数据的网络接口-头条新闻
    wx.request({
      url: app.globalData.juhetoutiaoBase,
      data: {
        type: this.data.newsType,
        key: app.globalData.juhetoutiaoKey
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.error_code == 0) {
          that.setData({
            topNews: res.data.result.data
          })
        } else {
          console.log('获取失败');
        }
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '热点新闻30条~',
      desc: '分享个小程序，希望你喜欢☺️~',
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