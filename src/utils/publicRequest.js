import totast from './toast'

const Authorization = 'Bearer xxx'
const baseUrl = 'https://notification.wechat.te642.com/'

class publicRequest {
    static get({url, data = {}, isJson = false, hasToken = true, heade = {}}) {
        url = baseUrl + url;
        let hasNetWork = checkNetWork()

        if (!hasNetWork) {
            totast.msg('网路异常', {})
            return false
        }

        let contentType = isJson ? 'application/json' : 'application/x-www-form-urlencoded'
        let _authorization = hasToken ? {'Authorization': Authorization} : {}
        let _header = Object.assign({'content-type': contentType}, _authorization, header)
        wx.showLoading({title: '加载中...'})
        return new Promise((resolve, reject) => {
            wx.request({
                url,
                header: _header,
                dataType: 'json',
                method: 'GET',
                data,
                success: (res) => {
                    if (res.statusCode === 200) {
                        resolve(res.data)
                    }
                },
                fail: (error) => {
                    totast.msg(error.errMsg, {})
                    reject(error)
                },
                complete: res => {
                    if (res.statusCode !== 200) {
                        totastMessage({
                            statusCode: res.statusCode,
                            message: res.data.msg
                        })
                    }
                    wx.hideLoading()
                }
            })
        })
    }

    static post({url, data = {}, isJson = true, hasToken = true, header = {}}) {
        url = baseUrl + url;
        let hasNetWork = checkNetWork()

        if (!hasNetWork) {
            totast.msg('网路异常', {})
            return false
        }
        let contentType = isJson ? 'application/json' : 'application/x-www-form-urlencoded'
        let _authorization = hasToken ? {'Authorization': Authorization} : {}
        let _header = Object.assign({'content-type': contentType}, _authorization, header)
        wx.showLoading({title: '加载中...'})
        return new Promise((resolve, reject) => {
            wx.request({
                url,
                header: _header,
                method: 'POST',
                data,
                dataType: 'json',
                success: (res) => {
                    if (res.data.code === 8888) {
                        totastMessage({
                            statusCode: res.data.code,
                            message: '您无此权限'
                        })
                        wx.redirectTo({
                            url: '/pages/frontend/hello/main'
                        });
                        return false;
                    }
                    if (res.data.code !== 0) {
                        totastMessage({
                            statusCode: res.data.code,
                            message: res.data.message
                        })
                        return false;
                    }
                    resolve(res.data)
                },
                fail: (error) => {
                    totast.msg(error.errMsg, {})
                    reject(error)
                },
                complete: res => {
                    if (res.statusCode !== 200) {
                        totastMessage({
                            statusCode: res.statusCode,
                            message: '服务器异常'
                        })
                    }
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 305)
                }
            })
        })
    }
}
const checkNetWork = function () {
    return new Promise(resolve => {
        wx.getNetworkType({
            success: res => {
                let networkType = res.networkType;
                if (networkType === 'none' || networkType === 'unknown') {
                    resolve(false)
                } else {
                    resolve(true)
                }
            },
            fail: () => {
                resolve(false)
            }
        })
    })
}
const totastMessage = function ({statusCode, message}) {
    switch (statusCode) {
        case 502:
            totast.msg('服务器异常', {})
            break
        default:
            totast.msg(message, {})
            break
    }
}
export default publicRequest