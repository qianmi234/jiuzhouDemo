// pages/modifyPsd/modifyPsd.js
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
      title: '修改密码', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    curPsd:'',
    newPsd:'',
    againPsd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  modifySubmit:function(){
    var _this = this;
    if (_this.data.curPsd == "") {
      wx.showToast({
        title: '请输入当前密码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.newPsd == "") {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.againPsd == "") {
      wx.showToast({
        title: '请再次输入新密码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.newPsd != _this.data.againPsd){
      wx.showToast({
        title: '两次输入的新密码不一致',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/updatePassword?token=' + wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      data: {
        "userId": wx.getStorageSync('userId'),
        "newpassword": utilMd5.hexMD5(_this.data.newPsd),
        "oldpassword": utilMd5.hexMD5(_this.data.curPsd),
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          wx.navigateTo({
            url: '../index/index'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    wx.navigateTo({
      url: '../login/login'
    })
  },
  changeCurPsd:function(e){
    this.setData({
      curPsd: e.detail.value
    })
  },
  changeNewPsd:function(e){
    this.setData({
      newPsd: e.detail.value
    })
  },
  changeAgainPsd:function(e){
    this.setData({
      againPsd: e.detail.value
    })
  }
})