var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: '',
    county: '',
    sliderList: [
      { selected: true, imageSource: '../../images/1.jpg' },
      { selected: false, imageSource: '../../images/2.jpg' },
      { selected: false, imageSource: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597664766028&di=ff501631d4364b4b46b3e0c7a150f38f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F03%2F79%2F72%2F9157c2e178bc4ad.jpg' },

      // { selected: false, imageSource: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597664497332&di=329c55c5f0bfcc9b177d9a1ebeade39e&imgtype=0&src=http%3A%2F%2Fwww.50cnnet.com%2Fuploads%2Ffile%2Fcontent%2F2018%2F01%2F5a587e00c4aad.jpg' },
    ],
    today: "",
    inTheaters: {},
    containerShow: true,
    weatherData: '',
    air: '',
    dress: '',
    courseInfo: {},
    paramJson:{},
    haveNotCourseToday: false,
  },

  onLoad: function (options) {
    //更新当前日期
    app.globalData.day = util.formatTime(new Date()).split(' ')[0];
    this.setData({
      today: app.globalData.day
    });
    //定位当前城市
    this.getLocation();

    //获取用户信息
    wx.getUserInfo({
      success: function (res) {
        var log = Date.now();
        res.userInfo.logtime = util.formatTime(new Date(log));
        var userInfos = wx.getStorageSync('userInfos') || [];
        userInfos.unshift(res.userInfo);
        wx.setStorageSync('userInfos', userInfos);
      }
    })
    if (util.getUserInfo().roseID == '0') {
      this.url = app.globalData.globalRequestUrl + "/scourse/findScourseBysIDcIDcD";
      this.data.paramJson = {
        sID: util.getUserInfo().userID,
        cD: util.DateToWeekIndex(this.data.today),
      };
    }
    if (util.getUserInfo().roseID == '1') {
      this.url = app.globalData.globalRequestUrl + "/scourse/findScourseBytIDcIDcD";
      this.data.paramJson = {
        tID: util.getUserInfo().userID,
        cD: util.DateToWeekIndex(this.data.today),
      };
    }
    //获取课程信息
    this.getcourseInfo(this.url, this.data.paramJson);
  },
  getcourseInfo(url, paramJson) {
    util.GetRequest(url, paramJson, this.callBackRes, this.callBackError);
  },
  callBackRes: function (res) {
    console.log(res)
    if (res.data == [] || res.data == '') {
      this.setData({
        haveNotCourseToday: true
      });
    } else {
      this.setData({
        courseInfo: res.data,
        haveNotCourseToday: false
      });
    }

  },
  callBackError(res) {
    console.log(res);
  },

  /*查看图片*/
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
  //定位当前城市
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //当前的经度和纬度
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${app.globalData.tencentMapKey}`,
          success: res => {
            app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity : res.data.result.ad_info.city;
            app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty : res.data.result.ad_info.district;
            that.setData({
              location: app.globalData.defaultCity,
              county: app.globalData.defaultCounty
            });
            that.getWeather();
            that.getAir();
          }
        })
      }
    })
  },

  //点击查看课程表，跳转页面
  bindViewTap: function (event) {
    wx.switchTab({
      url: '../table/table'
    });
  },

  //获取天气
  getWeather: function (e) {
    var length = this.data.location.length;
    var city = this.data.location.slice(0, length - 1); //分割字符串
    console.log(city);
    var that = this;
    var param = {
      key: app.globalData.heWeatherKey,
      location: city
    };
    //发出请求
    wx.request({
      url: app.globalData.heWeatherBase + "/s6/weather",
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.weatherData = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0];
        var weatherData = app.globalData.weatherData ? app.globalData.weatherData.now : "暂无该城市天气信息";
        var dress = app.globalData.weatherData ? res.data.HeWeather6[0].lifestyle[1] : { txt: "暂无该城市天气信息" };
        that.setData({
          weatherData: weatherData, //今天天气情况数组 
          dress: dress //生活指数
        });
      }
    })
  },
  //获取当前空气质量情况
  getAir: function (e) {
    var length = this.data.location.length;
    var city = this.data.location.slice(0, length - 1);
    var that = this;
    var param = {
      key: app.globalData.heWeatherKey,
      location: city
    };
    wx.request({
      url: app.globalData.heWeatherBase + "/s6/air/now",
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.air = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0].air_now_city;
        that.setData({
          air: app.globalData.air
        });
      }
    })
  },

  //点击更改定位切换到城市页面
  jump: function () {
    //关闭本页去切换城市，返回时就可以重新初始化定位信息哦
    wx.reLaunch({
      url: '../switchcity/switchcity'
    });
  },

  //点击天气跳转到天气页面
  gotoWeather: function () {
    wx.navigateTo({
      url: '../weather/weather'
    });
  },

  //轮播图绑定change事件，修改图标的属性是否被选中
  switchTab: function (e) {
    var sliderList = this.data.sliderList;
    var i, item;
    for (i = 0; item = sliderList[i]; ++i) {
      item.selected = e.detail.current == i;
    }
    this.setData({
      sliderList: sliderList
    });
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: 'FaceAttendance',
      desc: '分享个小程序，希望你喜欢☺️~',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "分享成功",
          duration: 1000,
          icon: "success"
        })
      }
    }
  }
})