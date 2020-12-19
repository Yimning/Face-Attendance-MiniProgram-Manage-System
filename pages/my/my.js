// pages/user/user.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    isMailAdmin: false,
    isExpressAdmin: false,
    userInfo: {}
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      userInfo: util.getUserInfo(),
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  qrcode: function () {
    //页面跳转
    wx.navigateTo({
      url: '/pages/my/myinfo/info',
    })
    // wx.redirectTo({
    //   url: '/pages/my/myinfo/info',
    // })
  },
  exit: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorageSync('userInfo');
          wx.clearStorage();
          wx.clearStorage();
          wx.setStorage({
            data: null,
            key: 'userInfo',
          })
          //页面跳转
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/welcome/welcome',
            })

          }, 200)

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

})