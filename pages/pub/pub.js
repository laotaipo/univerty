// pages/pub/pub.js
import {getCurrentPageUrlOptions} from "../../utils/util.js"
let HOST = require('../../config/config.js').HOST
HOST = 'localhost'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    title: '',
    text: '',
    userName: '',
    schoolNo: '',
    tag: -1,
    openid: '',
    headSculpture: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      tag: getCurrentPageUrlOptions().tag
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userName: res.data.nickName,
          headSculpture: res.data.avatarUrl
        })
      },
    })
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid: res.data
        })
      },
    }),
    wx.getStorage({
      key: 'userXiao',
      success: function(res) {
        that.setData({
          school: res.data.school,
          schoolNo: res.data.schoolNo
        })
      },
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
  pubImg: function() {
    var that = this;
    console.log(999)
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        console.log('---', tempFilePaths)
        that.setData({
          tempFilePaths: res.tempFilePaths 
        })
      }
    })
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
  titleInput: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  textTextarea: function(e) {
    this.setData({
      text: e.detail.value
    })
  },
  pub: function() {
    let data = {
      openid: this.data.openid,
      userName: this.data.userName,
      headSculpture: this.data.headSculpture,      
      tag: this.data.tag,
      schoolNo: this.data.schoolNo,
      title: this.data.title,
      text: this.data.text,
      tempFilePaths: this.data.tempFilePaths
    };
    // this.data.tempFilePaths.map((item) => {
    //   wx.uploadFile({
    //     url: 'https://yangmj.applinzi.com/pubImg',
    //     filePath: item,
    //     name: '',
    //     success: function (res) {
    //       console.log(111)
    //     }
    //   })
    // })
    wx.request({
      url: `http://${HOST}:3000/users/pub`,
      method: 'post',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      data: data,
      // method: 'POST',
      success: function (res) {
        console.log(9999)
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        wx.navigateTo({
          url: '../../pages/index/index'
        })
      }
    })
    console.log('====================', data)
  }
})