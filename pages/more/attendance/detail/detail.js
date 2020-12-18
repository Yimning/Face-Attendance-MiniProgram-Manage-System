// pages/more/attendance/detail/detail.js
var app = getApp();
const util = require("../../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attendanceInfoSelect: [],
    weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    attendanceUrl: '',
    attendanceParams: {},
    isStudent: '',
    attendanceStudentNoFlagParams: {},
    attendanceStudentIsFlagParams: {},
    attendanceTeacherNoFlagParams: {},
    attendanceTeacherIsFlagParams: {},
    isflagStu: 0,
    noflagStu: 0,
    percentflagStu: '',
    isflagTeacher: 0,
    noflagTeacher: 0,
    percentflagTeacher: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      attendanceInfoSelect: JSON.parse(options.attendanceInfoSelect)
    })
    // console.log(this.data.attendanceInfoSelect)
    this.data.attendanceUrl = app.globalData.globalRequestUrl + "/attendance/findAttendanceInfo";
    if (util.getUserInfo().roseID == '0') {
      this.setData({
        isStudent: true
      });
      this.getStudentA();
    }
    if (util.getUserInfo().roseID == '1') {
      this.setData({
        isStudent: false
      });
      this.getStudentA();
      this.getTeacherA();
    }
    //获取考勤记录情况
  },

  getStudentA() {
    this.data.attendanceStudentIsFlagParams = {
      teacherNumber: this.data.attendanceInfoSelect.teacher.teacherNumber,
      studentNumber: this.data.attendanceInfoSelect.student.studentNumber,
      courseID: this.data.attendanceInfoSelect.courseID,
      flag: "1",
    };
    this.data.attendanceStudentNoFlagParams = {
      teacherNumber: this.data.attendanceInfoSelect.teacher.teacherNumber,
      studentNumber: this.data.attendanceInfoSelect.student.studentNumber,
      courseID: this.data.attendanceInfoSelect.courseID,
      flag: "0",
    };
    this.attendanceStudentNoFlag(this.data.attendanceUrl, this.data.attendanceStudentNoFlagParams);
    this.attendanceStudentIsFlag(this.data.attendanceUrl, this.data.attendanceStudentIsFlagParams);
  },
  getTeacherA() {
    this.data.attendanceTeacherIsFlagParams = {
      teacherNumber: this.data.attendanceInfoSelect.student.studentNumber,
      recordTime: this.data.attendanceInfoSelect.recordTime,
      courseID: this.data.attendanceInfoSelect.courseID,
      flag: "1",
    };
    this.data.attendanceTeacherNoFlagParams = {
      teacherNumber: this.data.attendanceInfoSelect.teacher.teacherNumber,
      recordTime: this.data.attendanceInfoSelect.recordTime,
      courseID: this.data.attendanceInfoSelect.courseID,
      flag: "0",
    };
    this.attendanceTeachertNoFlag(this.data.attendanceUrl, this.data.attendanceTeacherNoFlagParams);
    this.attendanceTeacherIsFlag(this.data.attendanceUrl, this.data.attendanceTeacherIsFlagParams);
  },
  attendanceStudentNoFlag(url, param) { util.GetRequest(url, param, this.studentNoflagRes, this.studentNoflagError); },
  attendanceStudentIsFlag(url, param) { util.GetRequest(url, param, this.studentIsflagRes, this.studentIsflagRes); },
  attendanceTeacherNoFlag(url, param) { util.GetRequest(url, param, this.teacherNoflagRes, this.teacherNoflagError); },
  attendanceTeacherIsFlag(url, param) { util.GetRequest(url, param, this.teacherIsflagRes, this.teacherIsflagError); },
  getAttendanceInfo(url, param) { },

  studentIsflagRes: function (res) {
    console.log(res)
    this.setData({
      isflagStu: res.data.length
    })
    let str = Number(( this.data.isflagStu / (this.data.isflagStu + this.data.noflagStu)) * 100).toFixed(2);
    str += '%';
    this.setData({
      percentflagStu:str
    })
    // console.log(str);
  },
  studentIsflagError(res) {
    console.log(res);
  },
  studentNoflagRes(res) {
    console.log(res);
    this.setData({
      noflagStu: res.data.length
    })
  },
  studentNoflagError: function (res) {
    console.log(res)
  },
  teacherIsflagRes: function (res) {
    this.setData({
      isflagTeacher: res.data.length
    })
    let str = Number(( this.data.isflagTeacher / (this.data.isflagTeacher + this.data.noflagTeacher)) * 100).toFixed(2);
    str += '%';
    this.setData({
      percentflagTeacher:str
    })
  },
  teacherIsflagError(res) {
    console.log(res);
  },
  teacherNoflagRes: function (res) {
    this.setData({
      noflagTeacher: res.data.length
    })
  },
  teacherNoflagError(res) {
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

  }
})