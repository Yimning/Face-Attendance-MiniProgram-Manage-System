//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    // colorArrays: [ "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    colorArrays: ['#ef5b9c', '#f15b6c', '#f26522', '#ffd400', '#8552a1', '#7fb80e', '#65c294', '#78cdd1', '#33a3dc'
    ],
    weekTable: ['一', '二', '三', '四', '五', '六', '日'],
    timeTable: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    courseInfo: {
      course: {},
      student: {},
      teacher: {}
    },
    selectedCourse:{},
    today: "",
    url: "",
    paramJson: {},
    userInfo: {},

    showOneButtonDialog: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
    oneButton: [{ text: '确定' }],
  },
  onLoad: function () {
    this.dialogConfirm = this.selectComponent('#dialogConfirm')
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
    if (this.userInfo.roseID == '0') {
      this.url = app.globalData.globalRequestUrl + "/scourse/findScourseBysIDcIDcD";
      this.data.paramJson = {
        sID: this.userInfo.userID,
      };
    }
    if (this.userInfo.roseID == '1') {
      this.url = app.globalData.globalRequestUrl + "/scourse/findScourseBytIDcIDcD";
      this.data.paramJson = {
        tID: this.userInfo.userID,
      };
    }
    //获取课程信息
    this.getcourseInfo(this.url, this.data.paramJson);
  },
  getcourseInfo(url, paramJson) {
    util.GetRequest(url, paramJson, this.callBackRes, this.callBackError);
  },
  callBackRes: function (res) {
    this.setData({
      courseInfo: res.data,
    });
  },
  callBackError(res) {
    console.log(res);
  },
  showCardView(e) {
    var data = e.currentTarget.dataset.item;
    var index = e.currentTarget.dataset.index;
    console.log(data,index);
    this.setData({
      showOneButtonDialog: true,
      selectedCourse:data
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例  
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showOneButtonDialog: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showOneButtonDialog: true
        }
      );
    }
  }
})
