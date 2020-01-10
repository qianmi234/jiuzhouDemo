// pages/withdrawals/withdrawals.js
const app = getApp()
const cfg = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '提现申请', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    zhaoshangIcon:'../../images/zhaoshang_icon@2x.png',
    checkIcon: '../../images/Check3x.png',
    addCardIcon:'../../images/tianjia-icon@3x.png',
    showModalStatus:false,
    bankList:'',
    bankCode:'',
    bankName:'',
    account:'',
    bankAccount:'',
    tel:'',
    accountName:'',
    cashAmount:'0',
    totalAssets:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      totalAssets: options.totalAssets
    })
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
    this.getBankList();
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
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
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
  getBankList:function(){
    var _this = this;
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/cash/accountBankList', //仅为示例，并非真实的接口地址
      data: {
        "agentId":'f987a51c6b6a49549c0502ef631d4abd'
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
            bankName: res.data.data[0].bankName,
            account: res.data.data[0].agentBankAccount.slice(-4),
            bankAccount: res.data.data[0].agentBankAccount,
            accountName: res.data.data[0].agentBankName
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
  changeBank:function(event){
    let postId = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    let account = event.currentTarget.dataset.account;
    let accountName = event.currentTarget.dataset.accountname
    this.setData({
      bankCode: postId,
      bankName: name,
      account: account.slice(-4),
      bankAccount: account,
      accountName: accountName
    })
    console.log(this.data)
    this.hideModal();
  },
  submitExtract:function(){
    var _this = this;
    if (_this.data.cashAmount == 0 || _this.data.cashAmount==""){
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (_this.data.tel == "") {
      wx.showToast({
        title: '请输入您的手机号码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    wx.request({
      url: cfg.requestURL + '/backend/agent/mobile/cash/withdrawalApply', //仅为示例，并非真实的接口地址
      data: {
        "accountName": this.data.accountName,
        "agentId": "f987a51c6b6a49549c0502ef631d4abd",
        "bankAccount": this.data.bankAccount,
        "bankName": this.data.bankName,
        "cashAmount": this.data.cashAmount,
        "mobile": this.data.tel,
        "orderCode": this.data.bankCode
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          wx.showToast({
            title: "申请成功",
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
  changeTel:function(e){
    this.setData({
      tel: e.detail.value
    })
  },
  changeCash:function(e){
    this.setData({
      cashAmount: parseInt(e.detail.value)
    })
  },
  goToAddCard:function(){
    wx.navigateTo({
      url: '../addBank/addBank'
    })
    this.hideModal();
  },
  allExtract:function(){
    if (this.data.totalAssets.indexOf(",") >= 0){
      var total = this.data.totalAssets.split(",").join("");
    }else{
      var total = this.data.totalAssets
    }
    this.setData({
      cashAmount: total
    })
  }
})