// pages/income/income.js
const app = getApp()
const cfg = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '收益查询', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    totalIcon:'../../images/tixian_icon@3x.png',
    canBeIcon: '../../images/wallet _icon@3x.png',
    monthIcon: '../../images/yuejie_icon@3x.png',
    quarterIcon: '../../images/jijie_icon@3x.png',
    spendIcon: '../../images/leijizhichu_icon@3x.png',
    incomeJson:''
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
    wx.showLoading({
      title: '加载中...',
    })
    var _this = this;
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/cash/agentCommionInfo', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        "agentId": wx.getStorageSync('agentId'),
        "token": wx.getStorageSync('token'),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          _this.setData({
            incomeJson: res.data.data
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
  totalIncome:function(){
    wx.navigateTo({
      url: '../totalIncopme/totalIncopme'
    })
  },
  monthIncome: function () {
    wx.navigateTo({
      url: '../monthIncome/monthIncome'
    })
  },
  quarterIncome: function () {
    wx.navigateTo({
      url: '../quarterIncome/quarterIncome'
    })
  },
  expenseDetails: function () {
    wx.navigateTo({
      url: '../expenseDetails/expenseDetails'
    })
  }
})