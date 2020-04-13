// pages/viewBusiness/viewBusiness.js
const app = getApp()
const cfg = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '查看企业', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    searchIcon: '../../images/search_icon.png',
    grteenIcon: '../../images/green.png',
    redIcon: '../../images/btn_red.png',
    shopName: '',
    dataJson: ''
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
    this.getDataList();
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
  methods: {
    // 返回上一页面
    _navback() {
      console.log("0---------->>")
      wx.navigateBack()
    },
    // 计算图片高度
    imgLoaded(e) {
      this.setData({
        imageHeight:
          e.detail.height *
          (wx.getSystemInfoSync().windowWidth / e.detail.width)
      })
    }
  },
  getDataList: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var _this = this;
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/seller/findsellerWithAgentId?token=' + wx.getStorageSync('token') + '&agentId=' + wx.getStorageSync('agentId'), //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {},
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
  toBy:function(e){
    var that = this;
    wx.request({
      url: cfg.requestURL + '/backend/seller/mobile/sellerAuth?token=' + wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      data: {
        "sellerId":e.currentTarget.dataset.id,
        "isAuthentication":"T"
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          wx.showToast({
            title: "操作成功",
            icon: 'none',
            duration: 2000
          })
          that.getDataList();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  toRefuse:function(e){
    wx.request({
      url: cfg.requestURL + '/backend/seller/mobile/sellerAuth?token=' + wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      data: {
        "sellerId": e.currentTarget.dataset.id,
        "isAuthentication": "J"
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          wx.showToast({
            title: "操作成功",
            icon: 'none',
            duration: 2000
          })
          that.getDataList();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})