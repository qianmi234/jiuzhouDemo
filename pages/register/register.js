// pages/register/register.js
const app = getApp()
const cfg = require("../../utils/config.js");
const utilMd5 = require('../../utils/MD5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '注册', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    checkIcon: '../../images/Check3x.png',
    logIcon: '../../images/logo1-6.png',
    showModalStatus: false,
    tempFileUp: '',
    tempFileDwon: '',
    bankName: '企业',
    regTel: '',
    regPsd:'',
    regName:'',
    personName:'',
    bankCode: 1,
    bankNameSubject: '',
    agentBankName: '',
    bankList: [],
    checkTrue: "",
    regType:'qiye'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getBankList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changeBankName: function (e) {
    this.setData({
      bankName: e.detail.value
    })
  },
  changePsd: function (e) {
    this.setData({
      regPsd: e.detail.value
    })
  },
  changeName: function (e) {
    console.log(e.detail.value)
    this.setData({
      regName: e.detail.value
    })
  },
  changeTel: function (e) {
    console.log(e)
    this.setData({
      regTel: e.detail.value
    })
  },
  changePersonName:function(e){
    console.log(e)
    this.setData({
      personName: e.detail.value
    })
  },
  addBank: function () {
    var _this = this;
    console.log(_this.data.agentBankName)
    wx.showLoading({
      title: '加载中...',
    })
    if (_this.data.regName == "" && _this.data.bankCode == 1) {
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.regTel == "" && _this.data.bankCode == 1) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!(/^1[345789]\d{9}$/.test(_this.data.regTel)) && _this.data.bankCode == 1) {
      wx.showToast({
        title: '手机号码填写有误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (_this.data.personName == "" && _this.data.bankCode != 1){
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.regPsd == "") {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    var url = '';      
    var data = {};
    if (_this.data.bankCode == 1){
      url = cfg.requestURL + '/backend/seller/mobile/register';
      data = {
        "companyName": _this.data.regName,
        "loginName": _this.data.regTel,
        "password": utilMd5.hexMD5(_this.data.regPsd),
      }
    }else{
      url = cfg.requestURL + '/backend/person/mobile/register';
      data = {
        "companyName": _this.data.personName,
        "loginName": _this.data.personName,
        "password": utilMd5.hexMD5(_this.data.regPsd),
      }
    }
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          var msg = JSON.parse(res.data.msg);
          wx.setStorageSync("agentId", msg.data.agentId);
          wx.setStorageSync("token", msg.data.token);
          wx.setStorageSync("userId", msg.data.userId);
          wx.setStorageSync("authorityName", msg.data.authorityName);
          wx.setStorageSync("loginName", msg.data.loginName);
          wx.navigateTo({
            url: '../index/index'
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
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  changeBank: function (event) {
    let postId = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    this.setData({
      bankCode: postId,
      bankName: name
    })
    this.hideModal();
  }
})