//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello ',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    username: '',
    password: '',
    content: '',
    paramJson: {},
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          }) 
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 本地存取信息 
  remember: function (e) {
    try {
      wx.setStorageSync('key', 'value')
    } catch (e) { }
  },

  //忘记密码
  forgetTap: function (event) {
    wx.showToast({
      title: "请到网页端重置密码",
      icon: "success",
      duration: 2000
    })
  },
  //重置
  clearTap: function (event) {
    this.setData({
      content: '',
    })

  },
  // 登录处理
  login: function () {
     var that = this;
     var url = app.globalData.globalRequestUrl + '/login';
    // var Flag = '0',
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码为空',
        icon: 'none',
        duration: 500,
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
 
      })
    } else {
      if (this.data.username.substring(0, 1) == 'A') {
        //不给管理员登录
      }
      if (this.data.username.substring(0, 1) == 'T') {
        var Flag = '1';
      }
      else {
        var Flag = '0';
      }

      this.setData({
        paramJson: {
          userID: this.data.username,
          passWord: this.data.password,
          userFlag: Flag,
        }
      })
      //console.log(this.data.paramJson);
      util.PostRequest(url, this.data.paramJson, this.callBackRes, this.callBackError);
    }
  },
  callBackRes: function (res) {
    console.log(res);
    if (res.data.code == 200) {
      wx.setStorage({
        data: res.data.data,
        key: 'userInfo',
      })
      wx.getStorage({
        key: 'userInfo',
        success (res) {
          //console.log(res.data)
        }
      })
      wx.navigateTo({
        url: '../index/index'
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 1000
      })
    }

  },
  callBackError(res) {
    console.log(res);
  }
})