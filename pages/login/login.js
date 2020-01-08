//logs.js
const util = require('../../utils/util.js')
const app = getApp()
const cfg = require("../../utils/config.js");
Page({
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '登录', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    logIcon:'../../images/login_logo@2x.png',
    loginName:'',
    loginPsd:'',
    codeIcon:''
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    this.getVerifyCodeImage();
  },
  loginSubmit:function(){
    var _this = this;
    if(_this.data.loginName == ""){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.loginPsd == "") {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: cfg.requestURL +'/backend/agent/mobile/login', //仅为示例，并非真实的接口地址
      data: {
        "password": _this.data.loginPsd,
        "username": _this.data.loginName
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag){
          wx.setStorageSync("agentId", res.data.data.agentId)
          wx.navigateTo({
            url: '../index/index'
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  changeName:function(e){
    this.setData({
      loginName: e.detail.value
    })
  },
  changePsd: function (e) {
    this.setData({
      loginPsd: e.detail.value
    })
  },
  forget:function(){
    wx.navigateTo({
      url: '../forget/forget'
    })
  },
  getVerifyCodeImage:function(){
    var _this = this;
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/getVerifyCodeImage', //仅为示例，并非真实的接口地址
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  }
})
