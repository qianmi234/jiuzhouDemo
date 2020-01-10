// pages/modifyPsd/modifyPsd.js
const app = getApp()
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