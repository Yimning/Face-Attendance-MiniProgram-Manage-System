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
    courseID: '',
    weekday: util.DateToWeek(util.formatTime(new Date()).split('')[0]),
    nameInput: '',
    courseInfo: {},
    paramJson: {},
    isStudent: '',
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
      this.setData({
        isStudent: true
      });
      this.data.paramJson = {
        sID: util.getUserInfo().userID,
      };

      this.data.attendanceParams = {
        studentNumber: util.getUserInfo().userID,
      };
    }
    if (util.getUserInfo().roseID == '1') {
      this.url = app.globalData.globalRequestUrl + "/scourse/findScourseBytIDcIDcD";
      this.setData({
        isStudent: false
      });
      this.data.paramJson = {
        tID: util.getUserInfo().userID,
      };
      this.data.attendanceParams = {
        teacherNumber: util.getUserInfo().userID,
      };

    }
    //获取课程信息
    this.getCourseInfo(this.url, this.data.paramJson);
    //获取考勤信息
    this.getAttendanceInfo(this.data.attendanceUrl, this.data.attendanceParams);
  },
  getCourseInfo(url, paramJson) {
    util.GetRequest(url, paramJson, this.courseInfoRes, this.courseInfoError);
  },
  getAttendanceInfo(url, paramJson) {
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
    if (res.data == [] || res.data == '') {
      wx.showToast({
        title: '无记录',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        attendanceInfo: '',
      })
    } else {
      this.setData({
        attendanceInfo: res.data,
      })
    }

  },
  attendanceError(res) {
    console.log(res);
  },

  onSelectCourseInfo: function (e) {
    this.judeView();
    // console.log(e);
    this.setData({
      courseID: e.detail.courseID
    })
    this.SelectorQuery();
  },
  onSelectWeeks: function (e) {
    this.judeView();
    //console.log(e)
    this.setData({
      weekday: e.detail.weekday
    })
    this.SelectorQuery();
  },
  SelectorQuery() {
    this.judeCourseID();
    if (util.getUserInfo().roseID == '0') {
      console.log(this.data.weekday)
      this.data.attendanceParams = {
        studentNumber: util.getUserInfo().userID,
        courseID: this.data.courseID,
        weekDay: this.data.weekday
      };
    }
    if (util.getUserInfo().roseID == '1') {
      this.data.attendanceParams = {
        teacherNumber: util.getUserInfo().userID,
      };
    }
    this.getAttendanceInfo(this.data.attendanceUrl, this.data.attendanceParams);
  },
  onChangeShowState: function (e) {
    var that = this;
    var ID = e.target.id;
    // console.log(ID);
    if (ID == "isFlag") {
      that.setData({
        showViewNoFlag: false,
        showViewIsFlag: true,
        showView: false,
      })
      // console.log(this.data.isStudent)
      this.judeCourseID();
      if (this.data.isStudent) {
        this.data.attendanceParams = {
          studentNumber: util.getUserInfo().userID,
          courseID: this.data.courseID,
          flag: "1"
        };
      } else {
        this.data.attendanceParams = {
          teacherNumber: util.getUserInfo().userID,
          courseID: this.data.courseID,
          flag: "1"
        };
      }
      this.isFlag(this.data.attendanceUrl, this.data.attendanceParams);
    }
    if (ID == "noFlag") {
      that.setData({
        showViewNoFlag: true,
        showViewIsFlag: false,
        showView: false,
      });
      this.judeCourseID();
      if (this.data.isStudent) {
        this.data.attendanceParams = {
          studentNumber: util.getUserInfo().userID,
          courseID: this.data.courseID,
          flag: "0"
        };
      } else {
        this.data.attendanceParams = {
          teacherNumber: util.getUserInfo().userID,
          courseID: this.data.courseID,
          flag: "0"
        };
      }
      this.isFlag(this.data.attendanceUrl, this.data.attendanceParams);
    }
  },
  isFlag(url, param) {
    this.getAttendanceInfo(url, param);
  },
  notFlag(url, param) {
    this.getAttendanceInfo(url, param);
  },
  nameInput: function (e) {
    this.judeView();
    // console.log(e)
    this.setData({
      nameInput: e.detail.value
    })
    if (this.data.nameInput == '') {
      wx.showToast({
        title: '请输入',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.data.attendanceParams = {
      teacherNumber: util.getUserInfo().userID,
      studentName: this.data.nameInput
    };
    this.nameQuery(this.data.attendanceUrl, this.data.attendanceParams);
  },
  nameQuery(url, param) {
    this.getAttendanceInfo(url, param);
  },
  bindViewTap: function (e) {
    // console.log(e.currentTarget.dataset.courseinfo);
    wx.navigateTo({
      url: '../attendance/detail/detail?attendanceInfoSelect='+JSON.stringify(e.currentTarget.dataset.courseinfo),
    })

  },
  objectToArray(object) {
    var createArr = []
    for (var index in object) {
      createArr.push(object[index].course);
    }
    return createArr;
  },
  judeView() {
    this.setData({
      showViewNoFlag: false,
      showViewIsFlag: false,
      showView: true,
    })
  },
  judeCourseID() {
    if (this.data.courseID == '' || this.data.courseID == null) {
      wx.showToast({
        title: '选择课程',
        icon: 'none',
        duration: 2000
      })
      return;
    }
  }
})