const TOKEN_KEY = "manager-user-token";
const USER_KEY = "manager-user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token);
}

export function getUser() {
  //return JSON.parse(localStorage.getItem(USER_KEY))
  return localStorage.getItem(USER_KEY);
}

export function setUser(user) {
  //保存时用户信息是对象，一定要转成字符串保存
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  //localStorage.setItem(USER_KEY,user)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
