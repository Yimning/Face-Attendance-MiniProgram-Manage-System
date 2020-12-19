
var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myinfo: {},
    isStudent: true,
    paramJson: '',
    answer: "",
    password: "",
    updateUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    this.setData({ myinfo: userInfo });
    if (util.getUserInfo().roseID == '0') {
      this.url = app.globalData.globalRequestUrl + "/student/findStudentByID";
      this.data.paramJson = {
        id: util.getUserInfo().userID,
        isStudent: true,
      };
    }
    if (util.getUserInfo().roseID == '1') {
      this.url = app.globalData.globalRequestUrl + "/teacher/findTeacherByID";
      this.data.paramJson = {
        id: util.getUserInfo().userID,
        isStudent: false,
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
  callBackError: function (res) {
    console.log(res);
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

  },
  answerInput: function (e) {
    this.data.answer = e.detail.value;
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value;
  },

  judeInput: function (e) {
    if (this.data.password == '' || this.data.answer == '' || util.getUserInfo().userID == '') {
      return false
    } else return true
  },

  submit() {
    if (this.judeInput() == true) {
      console.log(this.data.isStudent)
      if (util.getUserInfo().roseID=='0') {
        this.data.updateUrl = app.globalData.globalRequestUrl + "/student/updateOne";
        this.data.paramJson = {
          studentNumber: util.getUserInfo().userID,
          studentPassword: this.data.password,
        };
        this.updateStudentInfo(this.data.updateUrl, this.data.paramJson);
      }else{
        this.data.updateUrl = app.globalData.globalRequestUrl + "/teacher/updateOne";
        this.data.paramJson = {
          teacherNumber: util.getUserInfo().userID,
          teacherPassword: this.data.password,
        };
        this.updateTeacherInfo(this.data.updateUrl, this.data.paramJson);
      }
    } else {
      wx.showToast({
        title: '请填写内容',
        icon: 'none',
        duration: 1500
      })
    }
    //返回前一页
    // setTimeout(() => {
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // }, 1500)
  },
  updateStudentInfo(url, param) {
    if (this.data.answer == this.data.myinfo.answer) {
      util.PostRequest(url, param, this.updateRes, this.updateError);
    } else {
      wx.showToast({
        title: '答案错误',
        icon: 'none',
        duration: 1500
      })
    }

  },
  updateTeacherInfo(url, param) {
    console.log(url, param)
    if (this.data.answer == this.data.myinfo.answer) {
      util.PostRequest(url, param, this.updateRes, this.updateError);
    } else {
      wx.showToast({
        title: '答案错误',
        icon: 'none',
        duration: 1500
      })
    }
  },
  updateRes: function (res) {
    if (res.statusCode == 200) {
      wx.showToast({
        title: '重置成功',
        icon: 'success',
        duration: 1500
      })
      // console.log('用户点击确定')
      wx.removeStorageSync('userInfo');
      wx.clearStorage()
      //页面跳转
      wx.reLaunch({
        url: '../../../pages/welcome/welcome',
      })
    }
  },
  updateError: function (res) { console.log(res) }
})
