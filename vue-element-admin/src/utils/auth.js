import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


let myTokenKey = "myToken"

export function getMyToken() {
  return Cookies.get(myTokenKey)
}

export function setMyToken(token)
{
  // myToken = token
  return Cookies.set(myTokenKey, token)
}

export function removeMyToken() {
  return Cookies.remove(myTokenKey)
}


const curUser = 'cur_user'
export function getCookiUser() {
  return Cookies.get(curUser)
}

export function setCookiUser(user) {
  return Cookies.set(curUser, user)
}

export function removeCookiUser() {
  return Cookies.remove(curUser)
}
