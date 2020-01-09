// pages/deal/deal.js
const app = getApp()
const cfg = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '诸葛烤鱼交易详情', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    personIcon: '../../images/img_personal.png',
    telIcon: '../../images/telephone_icon.png',
    tabIndex:1,
    dateStart: '2020-01-01',
    dateEnd: '2020-12-31',
    monthStart:'2020-01',
    dealJson:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.getDealList();
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
  getDealList:function(){
    var _this = this;
    var primas = {
      "agentId": "f987a51c6b6a49549c0502ef631d4abd",
      "sellerId": "31238"
    };
    if (this.data.tabIndex == 1){
      primas.endDate = _this.data.dateEnd;
      primas.startDate = _this.data.dateStart;
    }else{
      primas.month = _this.data.monthStart;
    }
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/seller/sellerProviderDay', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: primas,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          _this.setData({
            dealJson: res.data.data,
            nvabarData: {
              showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
              title: res.data.data.agentName+'详情', //导航栏 中间的标题
              white: true, // 是就显示白的，不是就显示黑的。
              address: '' // 加个背景 不加就是没有
            },
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
  tabChange:function(e){
    if (this.data.tabIndex == e.target.dataset.id){
      return;
    }else{
      this.setData({
        tabIndex: e.target.dataset.id
      })
      wx.showLoading({
        title: '加载中...',
      })
      this.getDealList();
    }
  },
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dateStart: e.detail.value
    })
  }, 
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dateEnd: e.detail.value
    })
  },
  bindStartMonthChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      monthStart: e.detail.value
    })
  },
  dateSearch:function(){
    wx.showLoading({
      title: '加载中...',
    })
    this.getDealList();
  },
  monthSearch:function(){
    wx.showLoading({
      title: '加载中...',
    })
    this.getDealList();
  }
})