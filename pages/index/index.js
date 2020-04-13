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
    qiyeIcon: '../../images/qiye.png',
    gerenIcon: '../../images/geren.png',
    fabuIcon: '../../images/fabuxiangmu-ico.png',
    chengjieIcon: '../../images/chengjiexiangmu-ico.png',
    fapiaoIcon: '../../images/dayinfapiao-ico.png',
    chaknIcon: '../../images/chakangeren-ico.png',
    chaknqiyeIcon: '../../images/chakanqiye-ico.png',
    payIcon:'../../images/pay.png',
    dataJson:'',
    agentName:'',
    agentPerson:'',
    loginName:'',
    agentAccountBalance:'',
    payMoneyWithMonth:'',
    incomeMoneyWithMonth:'',
    authorityName: wx.getStorageSync('authorityName')
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
    if (wx.getStorageSync('token') == "") {
      wx.navigateTo({
        url: '../login/login'
      })
      return false;
    }
    this.setData({
      authorityName: wx.getStorageSync('authorityName')
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.getSellerId();
    if (wx.getStorageSync('authorityName') == 'AGENT_USER'){
      this.getIndex();
    }else{
      this.setData({
        loginName: wx.getStorageSync('loginName')
      })
    }
  },
  getSellerId:function(){
    var _this = this;
    var Url = '';
    if (wx.getStorageSync('authorityName') == 'SELLER_USER'){
      Url = '/backend/seller/mobile/getSellerByloginId';
    }
    if ((wx.getStorageSync('authorityName') == 'PERSON_USER')){
      Url = '/backend/person/mobile/getPersonByloginId'
    }
    wx.request({
      url: cfg.requestURL + Url+ '?token=' +wx.getStorageSync('token') + '&loginId=' + wx.getStorageSync('userId'), //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          if (wx.getStorageSync('authorityName') == 'SELLER_USER') {
            wx.setStorageSync("sellerId", res.data.data.sellerId);
            wx.setStorageSync("sellerCompanyName", res.data.data.sellerCompanyName);
          }
          if ((wx.getStorageSync('authorityName') == 'PERSON_USER')) {
            wx.setStorageSync("personId", res.data.data.personId);
          }
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
  },
  getIndex:function(){
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
          if (res.data.msg == "token错误") {
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
  toEnterprise:function(){
    wx.navigateTo({
      url: '../enterpriseCertification/enterpriseCertification'
    })
  },
  toIndividual:function () {
    wx.navigateTo({
      url: '../individualCertification/individualCertification'
    })
  },
  toProject:function(){
    wx.navigateTo({
      url: '../postProject/postProject'
    })
  },
  toInvoicing:function(){
    wx.navigateTo({
      url: '../invoicing/invoicing'
    })
  },
  toItem:function(){
    wx.navigateTo({
      url: '../itemList/itemList'
    })
  },
  toPerson:function(){
    wx.navigateTo({
      url: '../viewIndividualList/viewIndividualList'
    })
  },
  toBusiness:function(){
    wx.navigateTo({
      url: '../viewBusiness/viewBusiness'
    })
  },
  toPay:function(){
    wx.navigateTo({
      url: '../payDetail/payDetail'
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
          wx.setStorageSync("authorityName", "");
          wx.setStorageSync("sellerId", "");
          wx.setStorageSync("personId", "");
          wx.setStorageSync("sellerCompanyName", "");
          wx.setStorageSync("loginName", "");  
          wx.navigateTo({
            url: '../login/login'
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
  }
})
