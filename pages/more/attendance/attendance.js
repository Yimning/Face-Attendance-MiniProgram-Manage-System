var app = getApp();
const util = require("../../../utils/util");
// pages/homework/homework.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TopIndex: 0,
    showView: true,
    showViewNoFlag: false,
    showViewIsFlag: false,
    selected: {},
    url: '',
    attendanceUrl: '',
    attendanceParams: {},
    attendanceInfo: [],
    attendanceInfoSelect: [],
    courseInfoArry: [
      {
        "courseID": '',
        " courseName": ''
      }
    ],
    weeks: [{
      "id": util.DateToWeekIndex(util.formatTime(new Date()).split('')[0]),
      "weekday": util.DateToWeek(util.formatTime(new Date()).split('')[0])
    }],
    nameInput: '',
    courseInfo: {},
    paramJson: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(util.getUserInfo())
    this.setData({
      weeks: util.weeks,
    });
    this.data.attendanceUrl = app.globalData.globalRequestUrl + "/attendance/findAttendanceInfo";
    if (util.getUserInfo().roseID == '0') {
      this.url = app.globalData.globalRequestUrl + "/scourse/findScourseBysIDcIDcD";

      this.data.paramJson = {
        sID: util.getUserInfo().userID,
      };

      this.data.attendanceParams = {
        studentNumber: util.getUserInfo().userID,
      };
    }
    if (util.getUserInfo().roseID == '1') {
      this.url = app.globalData.globalRequestUrl + "/scourse/findScourseBytIDcIDcD";
      this.data.paramJson = {
        tID: util.getUserInfo().userID,
      };
      this.data.attendanceParams = {
        teacherNumber: util.getUserInfo().userID,
      };

    }
    //获取课程信息
    this.getcourseInfo(this.url, this.data.paramJson);
    //获取考勤信息
    this.getattendanceInfo(this.data.attendanceUrl, this.data.attendanceParams);
  },
  getcourseInfo(url, paramJson) {
    util.GetRequest(url, paramJson, this.courseInfoRes, this.courseInfoError);
  },
  getattendanceInfo(url, paramJson) {
    util.GetRequest(url, paramJson, this.attendanceRes, this.attendanceError);
  },
  courseInfoRes: function (res) {
    this.setData({
      courseInfoArry: this.objectToArray(res.data),
    });

  },
  courseInfoError(res) {
    console.log(res);
  },

  attendanceRes: function (res) {
    console.log(res)
    this.setData({
      attendanceInfo: res.data,
    })
  },
  attendanceError(res) {
    console.log(res);
  },


  onSelectItem: function (e) {
    console.log(e)
  },
  onChangeShowState: function (e) {
    var that = this;
    var ID = e.target.id;
    console.log(ID);
    if (ID == "isFlag") {
      that.setData({
        showViewNoFlag: false,
        showViewIsFlag: true,
        showView: false,
      })
    }
    if (ID == "noFlag") {
      that.setData({
        showViewNoFlag: true,
        showViewIsFlag: false,
        showView: false,
      })
    }
  },
  nameInput: function (e) {
    console.log(e)
    this.setData({
      nameInput: e.detail.value
    })
  },
  bindViewTap: function (e) {
    console.log(e)
  },
  objectToArray(object) {
    var createArr = []
    for (var index in object) {
      createArr.push(object[index].course);
    }
    return createArr;
  }
})