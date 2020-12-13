//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    // colorArrays: [ "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    colorArrays: ['#ef5b9c', '#f15b6c', '#f26522', '#ffd400', '#8552a1', '#7fb80e', '#65c294', '#78cdd1', '#33a3dc'
    ],
    CourseInfo: [
      { "courseDay": 1, "coursePeriodF": 1, "skcd": 3, "courseName": "高等数学@教A-301" },
      { "courseDay": 1, "coursePeriodF": 5, "skcd": 3, "courseName": "高等数学@教A-301" },
      { "courseDay": 2, "coursePeriodF": 1, "skcd": 2, "courseName": "高等数学@教A-301" },
      { "courseDay": 2, "coursePeriodF": 8, "skcd": 2, "courseName": "高等数学@教A-301" },
      { "courseDay": 3, "coursePeriodF": 4, "skcd": 1, "courseName": "高等数学@教A-301" },
      { "courseDay": 3, "coursePeriodF": 8, "skcd": 1, "courseName": "高等数学@教A-301" },
      { "courseDay": 3, "coursePeriodF": 5, "skcd": 2, "courseName": "高等数学@教A-301" },
      { "courseDay": 4, "coursePeriodF": 2, "skcd": 3, "courseName": "高等数学@教A-301" },
      { "courseDay": 4, "coursePeriodF": 8, "skcd": 2, "courseName": "高等数学@教A-301" },
      { "courseDay": 5, "coursePeriodF": 10, "skcd": 2, "courseName": "高等数学@教A-301" },
    ],
    weekTable: ['一', '二', '三', '四', '五', '六', '日'],
    timeTable: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    course: {},
    today: "",
    url: "",
    paramJson: {},
    userInfo: {},
  },
  onLoad: function () {
    //console.log('onLoad')
    const that = this;
    this.url = app.globalData.globalRequestUrl;
    //获取本地存取的用户信息
    /* 必须调用wx.getStorageSync()的方法才可以实现同步，
       若用wx.getStorage()为异步请求，在success是回调函数,触发时间最晚，无法修改数据
    */
    try {
      var value = wx.getStorageSync('userInfo')
      if (value) {
        // Do something with return value
        this.userInfo = wx.getStorageSync('userInfo')
      }
    } catch (e) {
      // Do something when catch error
    }
    console.log(this.url)
    console.log(this.userInfo)
    if (this.userInfo.roseID == '0') {
      this.url = this.url + "scourse/findScourseBysIDcIDcD",
        this.setData({
          paramJson: {
            sID: this.userInfo.userID,
            cID: null,
            cD: null,
          }
        })
      //获取课程信息
      this.getcourseInfo(this.url, this.paramJson);
    }
    if (this.userInfo.roseID == '1') {
      this.url = this.url + "scourse/findScourseBytIDcIDcD",
        this.setData({
          paramJson: {
            tID: this.userInfo.userID,
            cID: null,
            cD: null,
          }
        })
      //获取课程信息
      this.getcourseInfo(this.url, this.paramJson);
    }
  },
  getcourseInfo(url, paramJson) {
    util.PostRequest(url, paramJson, this.callBackRes, this.callBackError);
  },
  callBackRes: function (res) {
    console.log(res);
    if (res.data.code == 200) {

    } else {

    }

  },
  callBackError(res) {
    console.log(res);
  }
})
