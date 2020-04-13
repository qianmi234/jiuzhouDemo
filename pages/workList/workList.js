// pages/workList/workList.js
const app = getApp()
const cfg = require("../../json/seller.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '九九数学练习', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '' // 加个背景 不加就是没有
    },
    height: app.globalData.height * 2 + 30,
    searchIcon: '../../images/search_icon.png',
    shopName: '',
    dataJson: '',
    one_0:'',
    two:'',
    three:'',
    missionArr:'',
    point:0,
    pointShow:false,
    pointChange:false
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
    var json = [];
    for(let i=0;i<20;i++){
      var jsonData = {};
      jsonData.one = parseInt(Math.ceil(Math.random() * 20));
      jsonData.two = parseInt(Math.ceil(Math.random() * 10));
      if (jsonData.one > jsonData.two){
        jsonData.oneMark = '-';
      }else{
        jsonData.oneMark = '+';
      }
      if(i>9){
        jsonData.three = parseInt(Math.ceil(Math.random() * 10));
        jsonData.twoMark = '+';
      }
      jsonData.status = 0;
      json.push(jsonData);
    }
    this.setData({
      dataJson: json
    })
    console.log(this.data.dataJson)
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
  enterWork:function(e){
    var index = e.currentTarget.dataset.id;
    var one = e.currentTarget.dataset.one;
    var two = e.currentTarget.dataset.two;
    var three =  e.currentTarget.dataset.three;
    var oneMark = e.currentTarget.dataset.onemark;
    var twoMark = e.currentTarget.dataset.twomark;
    var enter=0;
    if(three){
      if (oneMark == "+"){
        enter = parseInt(one) + parseInt(two) + parseInt(three);
      }else{
        enter = parseInt(one) - parseInt(two) + parseInt(three);
      }
    }else{
      if (oneMark == "+") {
        enter = parseInt(one) + parseInt(two) ;
      } else {
        enter = parseInt(one) - parseInt(two) ;
      }
    }
    var missionArr = this.data.dataJson;
    for (let i in missionArr) {
      //遍历列表数据      
      if (i == index) {
        //根据下标找到目标,改变状态  
        if (missionArr[i].status == 1) {
          missionArr[i].status = parseInt(missionArr[i].status) - 1
        }
      }
    }
    if (enter == e.detail.value){
      for (let i in missionArr) {
        //遍历列表数据      
        if (i == index) {       
          missionArr[i].status = 1
        }
      }
    }else{
      for (let i in missionArr) {
        //遍历列表数据      
        if (i == index) {
          missionArr[i].status = 2
        }
      }
    }
    if (e.detail.value == ""){
      for (let i in missionArr) {
        //遍历列表数据      
        if (i == index) {
          missionArr[i].status = 0
        }
      }
    }
    this.setData({
      dataJson: missionArr
    })
    this.setData({
      missionArr: missionArr
    })
    console.log(this.data)
  },
  submit:function(){
    var t = 0;
    for (let i in this.data.missionArr) {
      //遍历列表数据      
      if (this.data.missionArr[i].status == 1) {
        t ++;
      }
    }
    if (this.data.missionArr.length == 0){
      return false;
    }
    if (t<20){
      this.setData({
        pointChange: true
      })
    }
    this.setData({
      dataJson: this.data.missionArr,
      point:t*5,
      pointShow:true
    })
  },
  submitChange:function(){
    this.setData({
      point: 0,
      pointShow: false,
      pointChange:false
    })
  }
})