/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/.test(str)
}
export function validPassword(str) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,12}$/.test(str)
}
export function validCaptcha(str) {
    return /^[A-Za-z0-9]{4}$/.test(str)
}
export function validEmail(str) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str)
}
export function validEmailcode(str) {
    return /^[A-Za-z0-9]{6}$/.test(str)
}