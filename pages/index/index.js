//index.js
//获取应用实例
const app = getApp()
const indexData = require("../../json/index.js");
const cfg = require("../../utils/config.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 导航头组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标  1表示显示  0表示不显示
      title: '首页', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '../../images/home.png' // 加个背景 不加就是没有
    },
    // 导航头的高度
    height: app.globalData.height * 2 + 20,
    tixianIcon:'../../images/tixian_icon.png',
    chaxunIcon: '../../images/shanghu_icon.png',
    jiaoyiIcon: '../../images/mingxichaxun_icon.png',
    shouyiIcon: '../../images/shouyi_icon.png',
    xiugaiIcon: '../../images/set_icon.png',
    dataJson:'',
    agentName:'',
    agentPerson:'',
    agentAccountBalance:'',
    payMoneyWithMonth:'',
    incomeMoneyWithMonth:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.setNavigationBarTitle({
      title: this.data.mername//页面标题为路由参数
    })
    
  },
  onShow:function(){
    if (!wx.getStorageSync('agentId')) {
      wx.navigateTo({
        url: '../login/login'
      })
      return false;
    }
    wx.showLoading({
      title: '加载中...',
    })
    var _this = this;
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/home', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        agentId: wx.getStorageSync('agentId'),
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          _this.setData({
            dataJson: res.data.data
          })
        } else {
          if (res.data.msg == "token错误"){
            wx.navigateTo({
              url: '../login/login'
            })
            return false;
          }
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
            duration: 1500
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  modifyPsd:function(){
    wx.navigateTo({
      url: '../modifyPsd/modifyPsd'
    })
  },
  quitLogin:function(){
    var _this = this;
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/logout?token=' + wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.flag) {
          wx.setStorageSync("agentId", "");
          wx.setStorageSync("token", "");
          wx.setStorageSync("userId", "");
          wx.navigateTo({
            url: '../login/login'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
            duration: 1500
          })
        }
      }
    })
  }
})
