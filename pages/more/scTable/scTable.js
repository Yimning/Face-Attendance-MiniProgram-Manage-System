// pages/more/scTable/scTable.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    isMailAdmin: false,
    isExpressAdmin: false,
    userInfo: {},
    courseInfo: {},
    url: '',
    paramJson: '',
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      userInfo: util.getUserInfo(),
    });
    this.data.url = app.globalData.globalRequestUrl + "/scourse/findScourseBytIDcIDcD";
    this.data.paramJson = {
      tID: util.getUserInfo().userID,
    };
    //获取课程信息
    this.getcourseInfo(this.data.url, this.data.paramJson);
  },
  //获取课程信息
  getcourseInfo(url, paramJson) {
    util.GetRequest(url, paramJson, this.callBackRes, this.callBackError);
  },
  callBackRes: function (res) {
    console.log(res)
    if (res.data != [] || res.data != '') {
      this.setData({
        courseInfo: res.data,
      });
    }

  },
  callBackError(res) {
    console.log(res);
  },
  bindViewTap: function (e) {
    // console.log(e.currentTarget.dataset.courseinfo);
    wx.navigateTo({
      url: '../scTable/scDetail/scDetail?courseInfoSelect=' + JSON.stringify(e.currentTarget.dataset.courseinfoselect),
    })
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
})