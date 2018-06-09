
const app = getApp()
let prom = require('../../utils/prom.js')
let util = require('../../utils/util.js')
let HOST = require('../../config/config.js').HOST
console.log(HOST)
let code, openid, APPID = 'wx1cfc36401256962f', SECRET = '4fa41c4bde9697c0b95531ac12ac2b92'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dong: {},
    newsList: [],
    schoolNo: '',
    keywords: ''
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getOpenid()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.setStorage({
        key: 'userInfo',
        data: app.globalData.userInfo
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        console.log('===', res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorage({
          key: 'userInfo',
          data: res.userInfo
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  validateAuthorize: function (scopeType, fun) {
    var _this = this;
    wx.getSetting({
      success: result => {
        if (result.authSetting['scope.' + scopeType]) {
          _this.globalData.authType[scopeType] = true;
          fun();
        } else {
          wx.authorize({
            scope: 'scope.' + scopeType,
            success(res) {
              _this.globalData.authType[scopeType] = true;
              fun();
            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '请允许授权以便为你提供更好的服务',
                showCancel: false,
                success: function () {
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting['scope.' + scopeType]) {
                        _this.globalData.authType[scopeType] = true;
                        fun();
                      } else {
                        _this.globalData.authType[scopeType] = false;
                        _this.validateAuthorize(scopeType, fun);
                      }
                    },
                    fail() {
                      _this.globalData.authType[scopeType] = false;
                      _this.validateAuthorize(scopeType, fun);
                    }
                  });
                }
              })
            }
          });
        }
      }
    })
  },
  onShow: function() {
    this.onLoad()
  },
  getOpenid: function() {
    console.log(66)
    let that = this    
    wx.login({
      //获取code
      success: function (res) {
        code = res.code //返回code
        console.log('99999')
          console.log('code====', code)
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: APPID,
              secret: '4fa41c4bde9697c0b95531ac12ac2b92',
              grant_type: 'authorization_code',
              js_code: code
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log('====', res)
              openid = res.data.openid //返回openid
              that.getSchool()
              wx.setStorage({
                key: 'openid',
                data: openid,
              })
              console.log(openid)
            }
          })
        }
    })
  },
  getSchool: function() {
    let that = this
    let data = {
      userName: this.data.nickName,
      openid: openid
    }
    wx.request({
      url: `http://${HOST}:3000/users/`,
      method: 'post',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      data: data,
      // method: 'POST',
      success: function (res) {
        console.log(9999, res)
        wx.setStorage({
          key: 'userXiao',
          data: {
            school: res.data.school,
            schoolNo: res.data.schoolNo
          },
        })
        that.setData({
          schoolNo: res.data.schoolNo
        })
        that.getNews(res.data.schoolNo)
      }
    })
  },
  getNews: function(no) {
    let that = this;
    let data = {
      schoolNo: no,
      tag: -1
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
        res.data.map((item)=> {
          item.createTime = util.formatTime(new Date(item.createTime))
        })
        that.setData({
          newsList: res.data
        })
        console.log(res.data)
      }
    })
  },
  goDetail: function(e) {
    let id = e.currentTarget.dataset.newsid
    wx.navigateTo({
      url: `../../pages/detail/detail?id=${id}`,
    })
  },
  keywordsInput: function(e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  search: function() {
    let data = {}
    let that = this
    data.keywords = this.data.keywords
    data.schoolNo = this.data.schoolNo
    wx.request({
      url: `http://${HOST}:3000/users/search`,
      method: 'post',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      data: data,
      // method: 'POST',
      success: function (res) {
        if(res.data.length>0) {
          that.setData({
            newsList: res.data
          })
        } else {
          wx.showToast({
            title: '未查询到',
            icon: 'fail',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  }
})
