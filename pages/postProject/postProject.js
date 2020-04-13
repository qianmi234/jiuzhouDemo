// pages/postProject/postProject.js
const app = getApp()
const cfg = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '发布项目', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    checkIcon: '../../images/Check3x.png',
    showModalStatus: false,
    tempFileUp: '',
    tempFileDwon: '',
    bankName: '',
    agentBankAccount: '',
    bankCode: '',
    bankNameSubject: '',
    agentBankName: '',
    bankList: [],
    checkTrue: "",
    items: [
      { name: 'USA', value: '同意自由职业者协议' },
    ]
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
  changeAgentBankName: function (e) {
    this.setData({
      agentBankName: e.detail.value
    })
  },
  changeBankSubject: function (e) {
    console.log(e.detail.value)
    this.setData({
      bankNameSubject: e.detail.value
    })
  },
  changeBankCode: function (e) {
    console.log(e)
    this.setData({
      agentBankAccount: e.detail.value
    })
  },
  uploadUp: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFileUp = res.tempFilePaths;
        that.setData({
          tempFileUp: tempFileUp
        })
      }
    })
  },
  addBank: function () {
    var _this = this;
    console.log(_this.data.agentBankName)
    wx.showLoading({
      title: '加载中...',
    })
    if (_this.data.bankNameSubject == "") {
      wx.showToast({
        title: '请输入项目名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.bankName == "") {
      wx.showToast({
        title: '请输入项目负责人',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.agentBankAccount == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!(/^1[345789]\d{9}$/.test(_this.data.agentBankAccount))) {
      wx.showToast({
        title: '手机号码填写有误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (_this.data.agentBankName == "") {
      wx.showToast({
        title: '请填写项目需求',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: cfg.requestURL + '/backend/seller/mobile/insertProject?token=' + wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      data: {
        "sellerId": wx.getStorageSync('sellerId'),
        "projectName": _this.data.bankNameSubject,
        "chargeName": _this.data.bankName,
        "projectRequirement": _this.data.agentBankName,
        "telephone": _this.data.agentBankAccount,
        "filePath": _this.data.tempFileUp[0]
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          wx.showToast({
            title: "发布成功",
            icon: 'success',
            mask: true,
            duration: 1500
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