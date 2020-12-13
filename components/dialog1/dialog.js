// confirm.js
Component({
  /**
   * 属性列表
   */
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    content: {
      type: String,
      value: '内容'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    okText: {
      type: String,
      value: '确定'
    }
  },
  /**
   * 页面数据
   */
  data: {
    isShow: false,
    fail: function(){},
    success: function(){}
  },
  /**
   * 方法
   */
  methods: {
    // ---------- 第一种事件回调 ----------
    /**
     * 关闭弹窗
     */
    close(){
      this.setData({
        isShow: false
      })
    },
    /**
     * 展示弹窗
     */
    show(){
      this.setData({
        isShow: true
      })
    },
    /**
     * 接收取消事件，并将事件bind到调用子组件上
     */
    _cancelEvent(){
      this.triggerEvent('cancelEvent');
    },
    _okEvent(){
      this.triggerEvent('okEvent');
    },
    // ---------- 第二种事件回调 ----------
    /**
     * 展示弹窗
     */
    showNew({ isShow = true, title = '标题', content = '内容', cancelText = '取消', okText = '确定', fail = null, success = null }) {
      this.setData({
        isShow: isShow,
        title: title,
        content: content,
        cancelText: cancelText,
        okText: okText,
        fail: fail,
        success: success
      })
    },
    /**
     * 取消按钮点击
     */
    _cancelClick(){
      this.data.fail()
    },
    /**
     * 确定按钮点击
     */
    _okClick(){
      this.data.success()
    }
  }
})
