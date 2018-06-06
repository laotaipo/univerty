// pages/detail/detail.js
import { getCurrentPageUrlOptions } from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    discussWords: '',
    openid: '',
    id: '',
    discussList: [],
    newsDetail: {},
    good: false,
    cang: false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this
      let id = getCurrentPageUrlOptions().id
      this.setData({
        id: id
      })
      console.log(id)
      wx.getStorage({
        key: 'userInfo',
        success: function(res) {
          that.setData({
            userInfo: res.data
          })
          console.log(res.data)
        },
      })
      wx.getStorage({
        key: 'openid',
        success: function(res) {
          that.setData({
            openid: res.data
          })
          let data = {
            id: id,
            openid: res.data
          }
          wx.request({
            url: 'http://localhost:3000/users/newsDetail',
            method: 'post',
            header: {
              'Content-Type': "application/x-www-form-urlencoded"
            },
            data: data,
            // method: 'POST',
            success: function (res) {
              that.setData({
                discussList: res.data.discussList,
                newsDetail: res.data.newsDetail,
                good: res.data.havegood,
                cang: res.data.havecang
              })
              console.log(res.data)
            }
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
  getCurrentPageUrlOptions().tag
  },
  discussInput: function(e) {
    this.setData({
      discussWords: e.detail.value
    })
    console.log(e.detail.value)
    
  },
  pubDiscuss: function() {
    let data = {
      discussWords: this.data.discussWords,
      openid: this.data.openid,
      otherOpenid: '',
      id: this.data.id,
      name: this.data.userInfo.nickName
      
    }
    wx.request({
      url: 'http://localhost:3000/users/pubDiscuss',
      method: 'post',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      data: data,
      // method: 'POST',
      success: function (res) {
        // console.log('00000000')
        // that.setData({
        //   newsList: res.data
        // })
        // console.log(res.data)
      }
    })
  },
  doGood: function() {
    this.setData({
      good: !this.data.good
    })
    let data = {
    }
    data.openid = this.data.openid
    data.id = this.data.id
    console.log('====', this.data.good)
    data.good = this.data.good ? true : false
    wx.request({
      url: 'http://localhost:3000/users/good',
      method: 'post',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      data: data,
      // method: 'POST',18697066652
      success: function (res) {
        // console.log('00000000')
        // that.setData({
        //   newsList: res.data
        // })
        // console.log(res.data)
      }
    })
  },
  doLike: function() {
    this.setData({
      cang: !this.data.cang
    })
    let data = {
    }
    data.openid = this.data.openid
    data.id = this.data.id
    data.cang = this.data.cang ? true : false
    wx.request({
      url: 'http://localhost:3000/users/cang',
      method: 'post',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      data: data,
      // method: 'POST',18697066652
      success: function (res) {
        // console.log('00000000')
        // that.setData({
        //   newsList: res.data
        // })
        // console.log(res.data)
      }
    })
  }
})