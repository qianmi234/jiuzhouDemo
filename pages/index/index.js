//index.js
//获取应用实例
const app = getApp()
const indexData = require("../../json/index.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 导航头组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '首页', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '../../images/home.png' // 加个背景 不加就是没有
    },
    // 导航头的高度
    height: app.globalData.height * 2 + 20,
    tixianIcon:'../../images/tixian_icon.png',
    chaxunIcon: '../../images/shanghu_icon.png',
    jiaoyiIcon: '../../images/mingxichaxun_icon.png',
    shouyiIcon: '../../images/shouyi_icon.png',
    xiugaiIcon: '../../images/set_icon.png',
    dataJson:'',
    agentName:'',
    agentPerson:'',
    agentAccountBalance:'',
    payMoneyWithMonth:'',
    incomeMoneyWithMonth:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.setNavigationBarTitle({
      title: this.data.mername//页面标题为路由参数
    })
    this.setData({
      dataJson: indexData.indexJson.data
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  modifyPsd:function(){
    wx.navigateTo({
      url: '../modifyPsd/modifyPsd'
    })
  },
  number_format:function(number, decimals, dec_point, thousands_sep) {
    decimals=2;
    dec_point=".";
    thousands_sep:","
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while(re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }
})
