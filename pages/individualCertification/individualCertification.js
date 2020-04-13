// pages/individualCertification/individualCertification.js
const app = getApp()
const cfg = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '个人认证', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    checkIcon: '../../images/Check3x.png',
    showModalStatus: false,
    tempFileUp: '',
    tempFileUp_: '',
    tempFileDwon: '',
    tempFileDwon_: '',
    bankName: '',
    agentBankAccount: '',
    personTel:'',
    personEmail:'',
    introduction:'',
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
  changeEmail:function(e){
    this.setData({
      personEmail: e.detail.value
    })
  },
  changeTel: function (e) {
    this.setData({
      personTel: e.detail.value
    })
  },
  changeBankSubject: function (e) {
    console.log(e.detail.value)
    this.setData({
      bankNameSubject: e.detail.value
    })
  },
  bindTextAreaBlur:function(e){
    this.setData({
      introduction: e.detail.value
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
          tempFileUp_: tempFileUp
        })
        wx.uploadFile({
          url: cfg.requestURL + '/backend/upload/mobile/upload?token=' + wx.getStorageSync('token'), //开发者服务器的 url
          filePath: tempFileUp[0], // 要上传文件资源的路径 String类型！！！
          name: 'file', // 文件对应的 key ,(后台接口规定的关于图片的请求参数)
          header: {
            'content-type': 'multipart/form-data'
          }, // 设置请求的 header
          formData: {}, // HTTP 请求中其他额外的参数
          success: function (res) {
            that.setData({
              tempFileUp: JSON.parse(res.data).data
            })
          },
          fail: function (res) {
          }
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
          tempFileDwon_: tempFileDown
        })
        wx.uploadFile({
          url: cfg.requestURL + '/backend/upload/mobile/upload?token=' + wx.getStorageSync('token'), //开发者服务器的 url
          filePath: tempFileDown[0], // 要上传文件资源的路径 String类型！！！
          name: 'file', // 文件对应的 key ,(后台接口规定的关于图片的请求参数)
          header: {
            'content-type': 'multipart/form-data'
          }, // 设置请求的 header
          formData: {}, // HTTP 请求中其他额外的参数
          success: function (res) {
            that.setData({
              tempFileDwon: JSON.parse(res.data).data
            })
          },
          fail: function (res) {
          }
        })
      }
    })
  },
  getBankList: function () {
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
  addBank: function () {
    var _this = this;
    console.log(_this.data.agentBankName)
    wx.showLoading({
      title: '加载中...',
    })
    if (_this.data.bankNameSubject == "") {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.tempFileUp_ == "") {
      wx.showToast({
        title: '请上传身份证正面照片',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.tempFileDwon_ == "") {
      wx.showToast({
        title: '请上传身份证背面照片',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.personTel == "") {
      wx.showToast({
        title: '请输入电话号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!(/^1[345789]\d{9}$/.test(_this.data.personTel)) ) {
      wx.showToast({
        title: '手机号码填写有误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (_this.data.personEmail == "") {
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

    if (!str.test(_this.data.personEmail)) {
      wx.showToast({
        title: '邮箱格式填写有误',
        icon: 'none',
        duration: 2000
      })
      return false;
    } 
    if (_this.data.introduction == "") {
      wx.showToast({
        title: '请输入简介',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (_this.data.checkTrue == ""){
      wx.showToast({
        title: '请同意自由职业者协议',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: cfg.requestURL + '/backend/person/mobile/personAuth?token=' + wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      data: {
        "personId": wx.getStorageSync('personId'),
        "cardStatus":'Y',
        "personName": _this.data.bankNameSubject,
        "cardImgOne": _this.data.tempFileUp,
        "cardImgTwo": _this.data.tempFileDwon,
        "mobile": _this.data.personTel,
        "email": _this.data.personEmail,
        "introduction": _this.data.introduction,
        "agreement":1
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.flag) {
          wx.showToast({
            title: "认证申请已提交",
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
      bankName: name
    })
    this.hideModal();
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      checkTrue: e.detail.value
    })
  }
})