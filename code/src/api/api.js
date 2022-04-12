import { getRequest, postJsonRequest, postRequest } from '@/utils/request'

// 登录 注册 获取验证码
export function RetrieveCaptcha(data) {
    return postRequest('captcha', data)
}
export function Login(params) {
    return postJsonRequest('login', params)
}
export function Register(params) {
    return postJsonRequest('register', params)
}
export function Logout(data) {
    return postJsonRequest('logout', data)
}
export function getPubKey() {
    return getRequest('api')
}




// 大创接口
export function uploadComment(data) {
    return postJsonRequest('uploadComment', data)
}
export function upload(data) {
    return postRequest('upload', data)
}
export function getallimg() {
    return getRequest('getallimg')
}
export function setfavourite(data) {
    return postJsonRequest('setfavourite', data)
}
export function removefavourite(data) {
    return postJsonRequest('removefavourite', data)
}
export function updateinfo(data) {
    return postRequest('updatepersonalinfo', data)
}
export function getinfo() {
    return getRequest('getpersonalinfo')
}
export function getemailcode(data) {
    return postJsonRequest('emailcode', data)
}
export function varifyemail(data) {
    return postJsonRequest('varifyemail', data)
}