// pages/more/scTable/scDetail/scDetail.js
var app = getApp();
const util = require("../../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseInfoSelect: {},
    paramJson: '',
    studentList: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.courseInfoSelect))
    this.setData({
      courseInfoSelect: JSON.parse(options.courseInfoSelect)
    });
    const url = app.globalData.globalRequestUrl + '/scourse/findScourseByteacherNumbercIDcD';
    this.data.paramJson = {
      tID: this.data.courseInfoSelect.teacher.teacherNumber,
      cID: this.data.courseInfoSelect.courseID,
    };
    this.courseSelectList(url, this.data.paramJson);
  },
  courseSelectList(url, param) {
    util.GetRequest(url, param, this.courseSelectListRes, this.courseSelectListError);
  },
  courseSelectListRes(res) {
    console.log(res);
    this.setData({
      studentList: res.data
    })
  },
  courseSelectListError(res) {
    console.log(res);
  },
  bindViewTap: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../scDetail/stuInfo/stuInfo?studentList=' + JSON.stringify(e.currentTarget.dataset.studentlist),
    })
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})