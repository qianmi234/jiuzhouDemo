// pages/addBank/addBank.js
const app = getApp()
const cfg = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '添加银行卡', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    checkIcon: '../../images/Check3x.png',
    showModalStatus: false,
    tempFileUp:'',
    tempFileDwon:'',
    bankName:'',
    agentBankAccount:'',
    bankCode:'',
    bankNameSubject:'',
    agentBankName:'',
    bankList:[],
    checkTrue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBankList();
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
  changeBankCode:function(e){
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
  uploadDown: function () {
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
        let tempFileDown = res.tempFilePaths;
        that.setData({
          tempFileDown: tempFileDown
        })
      }
    })
  },
  getBankList:function(){
    var _this = this;
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/cash/bankcodelist', //仅为示例，并非真实的接口地址
      data: {
        "agentId": wx.getStorageSync('agentId'),
        "token": wx.getStorageSync('token'),
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          _this.setData({
            bankList: res.data.data,
            bankCode: res.data.data[0].bankCode,
            bankName: res.data.data[0].bankName
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
  addBank:function(){
    var _this = this;
    console.log(_this.data.agentBankName)
    wx.showLoading({
      title: '加载中...',
    })
    if (_this.data.bankName == ""){
      wx.showToast({
        title: '请选择开户行',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.bankNameSubject == "") {
      wx.showToast({
        title: '请输入支行名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.agentBankName == "") {
      wx.showToast({
        title: '请输入持卡人姓名',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.agentBankAccount == "") {
      wx.showToast({
        title: '请输入银行卡号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/cash/insertAccountBank?token=' + wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      data: {
        "agentId": wx.getStorageSync('agentId'),
        "agentBankAccount": _this.data.agentBankAccount,
        "agentBankName": _this.data.agentBankName,
        "bankCode": _this.data.bankCode,
        "bankName": _this.data.bankName,
        "bankNameSubject": _this.data.bankNameSubject
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          wx.showToast({
            title: "添加成功",
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
  changeBank:function(event){
    let postId = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    this.setData({
      bankCode: postId,
      bankName:name
    })
    this.hideModal();
  }
})