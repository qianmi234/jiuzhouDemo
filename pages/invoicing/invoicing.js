// pages/invoicing/invoicing.js
const app = getApp()
const cfg = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '开具发票', //导航栏 中间的标题
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
    billTypeName:'',
    bankList: [],
    checkTrue: "",
    emailName:'',
    emailTel:'',
    emailAdress:'',
    authorityName: wx.getStorageSync('authorityName')
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
    this.setData({
      bankName: wx.getStorageSync('sellerCompanyName'),
      authorityName: wx.getStorageSync('authorityName')
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
  changeEmail: function (e) {
    console.log(e)
    this.setData({
      emailName: e.detail.value
    })
  },
  changeTel: function (e) {
    console.log(e)
    this.setData({
      emailTel: e.detail.value
    })
  },
  changeAdress: function (e) {
    console.log(e)
    this.setData({
      emailAdress: e.detail.value
    })
  },
  getBankList: function () {
    var _this = this;
    wx.request({
      url: cfg.requestURL + '/backend/seller/mobile/billtypelist', //仅为示例，并非真实的接口地址
      data: {
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
            bankCode: res.data.data[0].billTypeId,
            billTypeName: res.data.data[0].billTypeName
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
  addBank: function () {
    var _this = this;
    console.log(_this.data.agentBankName)
    wx.showLoading({
      title: '加载中...',
    })
    if (_this.data.bankName == "") {
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.agentBankName == "") {
      wx.showToast({
        title: '请输入信用代码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.agentBankAccount == "") {
      wx.showToast({
        title: '请输入开票金额',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.emailName == "") {
      wx.showToast({
        title: '请输入收件人',
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
    if (_this.data.emailTel == "") {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!(/^1[345789]\d{9}$/.test(_this.data.emailTel))) {
      wx.showToast({
        title: '手机号码填写有误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (_this.data.emailAdress == "") {
      wx.showToast({
        title: '请输入收件人地址',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: cfg.requestURL + '/backend/seller/mobile/billinsert?token=' + wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      data: {
        "sellerId": wx.getStorageSync('sellerId'),
        "billTypeId": _this.data.bankCode,
        "sellerCompanyName": _this.data.bankName,
        "expressCode": _this.data.agentBankName,
        "taxableTotal": _this.data.agentBankAccount,
        "recivePersonName": _this.data.emailName,
        "mobile": _this.data.emailTel,
        "address": _this.data.emailAdress
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          wx.showToast({
            title: "开票成功",
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
  changeBank: function (event) {
    let postId = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    this.setData({
      bankCode: postId,
      billTypeName: name
    })
    this.hideModal();
  }
})