// pages/my/my.js
const app = getApp()
let address = require('./schoolData.js')
console.log(address)
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShowPubTag: false,  //是否展示发布选项
    time: '2017-09-01 20:00:00',
    region: ['广东省', '汕头市', '潮阳区'],
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    universities: [],
    animationAddressMenu: {},
    addressMenuIsShow: false,
    universityName: '',
    universityId: '',
    openid: '',
    userName: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    // console.log('lll', wx.getStorage('openid'))
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userName: res.data.nickName
        })
        console.log('===', res, that.data.userName)
      },
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        }) 
      },
    })
    var id = address.provinces[0].id
    console.log(id)
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      universities: address.universities[address.citys[id][0].id],
    })
  },
  setSchool: function() {
    this.setData({
      addressMenuIsShow: true
    })
  },
  showPubTag: function() {
    this.setData({
      isShowPubTag: !this.data.isShowPubTag
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.setData({
      addressMenuIsShow: false
    })
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    this.setData({
      addressMenuIsShow: false,
      universityName: this.data.universities[this.data.value[2]].name,
      universityId: this.data.universities[this.data.value[2]].id
    })
    let data = {
      name: this.data.userName,
      openid: this.data.openid,
      school: this.data.universityName,
      schoolNo: this.data.universityId
    }
    wx.request({
      url: 'http://localhost:3000/users/login',
      data: data,
      method: 'post',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      // method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        wx.setStorage({
          key: 'userXiao',
          data: {
            school: this.data.universityName,
            schoolNo: this.data.universityId
          },
        })
        console.log('99999999999999999999999999', res.data)
      }
    })
  },
  // 点击蒙版时取消组件的显示
  hideCitySelected: function (e) {
    console.log(e)
    this.setData({
      addressMenuIsShow: false
    })
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var universities = this.data.universities
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        universities: address.universities[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        universities: address.universities[citys[cityNum].id],
      })
    } else {
      // 滑动选择了区
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },
  pub: function(e) {
    console.log(e)
    let tag = e.currentTarget.dataset.tag
    console.log(tag, typeof(tag), '-----')
    console.log(tag)
    wx.navigateTo({
      url: `../../pages/pub/pub?tag=${tag}`
    })
  }
})