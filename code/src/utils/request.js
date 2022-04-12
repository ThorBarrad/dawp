import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
import router from '@/router'

export const baseUrl = () => {
        if ('https:' == document.location.protocol) {
            return process.env.VUE_APP_BASE_API
        } else {
            return process.env.VUE_APP_BASE_API_HTTP
        }
    }
    // request interceptor
axios.interceptors.request.use(
    config => {
        // do something before request is sent

        const token = Vue.ls.get('Access-Token')
        config.crossDomain = true
        config.withCredentials = true
        if (token) {
            // config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        return res
    },
    error => {
        if (error.response) {
            const data = error.response.data
            const token = Vue.ls.get('ACCESS_TOKEN')
            console.log(error)
            if (error.response.status === 403) {
                Message.error({
                    message: '登录过期，请重新登录',
                    description: data.message
                })
                const hasToken = getToken()
                if (hasToken) {
                    removeToken()
                    router.push("/login")
                }
            } else if (error.response.status === 429) {
                Message.error("操作过于频繁,请于1分钟后再试")
            } else if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
                return error.response.data
            } else if (error.response.status === 400) {
                Message.error("请求错误");
            } else if (error.response.status === 500) {
                Message.error("服务器维护中");
            } else {
                return Promise.reject(error)
            }
        }
    })

export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: baseUrl() + `${url}`,
    })
}

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: baseUrl() + `${url}`,
        data: params,
        // transformRequest: [
        //   function(data) {
        //     let ret = ''
        //     for (const it in data) {
        //       ret +=
        //         encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        //     }
        //     return ret
        //   }
        // ],
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const postJsonRequest = (url, params) => {
    return axios({
        method: 'post',
        url: baseUrl() + `${url}`,
        data: JSON.stringify(params),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
}

// export default service
export const postDataFormRequest = (url, params) => {
    return axios({
        method: 'post',
        url: baseUrl() + `${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}