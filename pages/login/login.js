//logs.js
const util = require('../../utils/util.js')
const app = getApp()
const cfg = require("../../utils/config.js");
const utilMd5 = require('../../utils/MD5.js');
Page({
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标  1表示显示  0表示不显示
      title: '登录', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    logIcon:'../../images/logo1-6.png',
    loginName:'',
    loginPsd:'',
    loginCode:'',
    codeIcon:'',
    codeDate:''
  },
  onLoad: function () {
    var date = new Date().getTime();
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      codeDate: date,
      codeIcon: cfg.requestURL + '/backend/agent/mobile/getVerifyCodeImage?key=' + date
    })
    console.log(date, this.data.codeDate)
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
    if (_this.data.loginCode == "") {
      wx.showToast({
        title: '请输入验证码',
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
        "password": utilMd5.hexMD5(_this.data.loginPsd), 
        "username": _this.data.loginName, 
        "verifyCode": _this.data.loginCode,
        "key": this.data.codeDate
      },
      method:'POST',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag){
          wx.setStorageSync("agentId", res.data.data.agentId);
          wx.setStorageSync("token", res.data.data.token);
          wx.setStorageSync("userId", res.data.data.userId);
          wx.setStorageSync("authorityName", res.data.data.authorityName);
          wx.setStorageSync("loginName", res.data.data.loginName);
          wx.navigateTo({
            url: '../index/index'
          })
        }else{
          if (res.data.msg == '用户不存在'){
            wx.navigateTo({
              url: '../register/register'
            })
            return false;
          }
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
  changeCode:function(e){
    this.setData({
      loginCode: e.detail.value
    })
  },
  forget:function(){
    wx.navigateTo({
      url: '../forget/forget'
    })
  },
  register:function(){
    wx.navigateTo({
      url: '../register/register'
    })
  },
  getCode:function(){
    var date = new Date().getTime();
    this.setData({
      codeDate: date,
      codeIcon: cfg.requestURL + "/backend/agent/mobile/getVerifyCodeImage?key=" + date
    })
    console.log(date, this.data.codeDate)
  },
  testCode:function(){
    var _this = this;
    wx.request({
      url: cfg.requestURL + '/testSessionId', //仅为示例，并非真实的接口地址
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
      }
    })
  }
})
