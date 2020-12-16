
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // onPullDownRefresh: function () {
    //   wx.stopPullDownRefresh()
    // },
    myinfo: {},
    isStudent: true,
    paramJson: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({ myinfo: userInfo });
    if (util.getUserInfo().roseID == '0') {
      this.url = app.globalData.globalRequestUrl + "/student/findStudentByID";
      this.data.paramJson = {
        id: util.getUserInfo().userID,
        isStudent: true
      };
    }
    if (util.getUserInfo().roseID == '1') {
      this.url = app.globalData.globalRequestUrl + "/teacher/findTeacherByID";
      this.data.paramJson = {
        id: util.getUserInfo().userID,
        isStudent: false
      };
    }
    //获取个人信息
    this.getcourseInfo(this.url, this.data.paramJson);

  },
  getcourseInfo(url, paramJson) {
    util.GetRequest(url, paramJson, this.callBackRes, this.callBackError);
  },
  callBackRes: function (res) {
    console.log(res)
    if (res.data != [] || res.data != '') {
      this.setData({
        myinfo: res.data[0],
      });
    }
    console.log(this.data.myinfo)
  },
  callBackError(res) {
    console.log(res);
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
          wx.reLaunch({
            url: '../../../pages/welcome/welcome',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  resetpwd: function (e) {
    var no = this.data.myinfo.no;
    wx.navigateTo({
      url: '../changePassword/changePassword',
    })
  },
  setemail: function (e) {
    var no = this.data.myinfo.no;
    wx.navigateTo({
      url: '../email/email?no=' + no,
    })
  },
  //预览图片
  preview: function (e) {
    var src = e.currentTarget.dataset.src;
    if (src == null || src == "") {
      src = "/images/user/user.png";
    }
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
})