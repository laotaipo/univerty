let HOST = require('../../config/config.js').HOST
const app = getApp()
import { getCurrentPageUrlOptions } from "../../utils/util.js"
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dong: {},
    newsList: [],
    tag: ''
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this
    let schoolNo = ''
    let tag = getCurrentPageUrlOptions().tag
    this.setData({
      tag: tag
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo: res.data
        })
      },
    })
    wx.getStorage({
      key: 'userXiao',
      success: function(res) {
        schoolNo = res.data.schoolNo
        let data = {
          schoolNo: schoolNo,
          tag: tag
        }
        wx.request({
          url: `http://${HOST}:3000/users/news`,
          method: 'post',
          header: {
            'Content-Type': "application/x-www-form-urlencoded"
          },
          data: data,
          // method: 'POST',
          success: function (res) {
            console.log('00000000')
            that.setData({
              newsList: res.data
            })
          }
        })
      },
    })
    
  },
  goDetail: function (e) {
    let id = e.currentTarget.dataset.newsid
    wx.navigateTo({
      url: `../../pages/detail/detail?id=${id}`,
    })
  }
})
