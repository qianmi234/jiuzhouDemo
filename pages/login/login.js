//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '登录', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    logIcon:'../../images/login_logo@2x.png'
  },
  onLoad: function () {
    var _this = this;
    wx.request({
      url: '../../json/login.', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  loginSubmit:function(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
  forget:function(){
    wx.navigateTo({
      url: '../forget/forget'
    })
  }
})
