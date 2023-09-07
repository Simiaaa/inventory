import myaxios from "@/utils/myanxios";
//发送ajax请求，传入用户名、密码，用于验证用户是否有资格
export function login(username, password) {
  return myaxios({
    url: "/user/login",
    method: "post",
    data: {
      username,
      password
    }
  });
}
//发送ajax请求，传入token，用于获取用户信息
// eslint-disable-next-line no-unused-vars
export function getUserInfo(token) {
  return myaxios({
    url: "/user/info/${token}",
    method: "get"
  });
}

export function logout(token) {
  return myaxios({
    url: "/user/logout/${token}",
    method: "post",
    data: {
      token
    }
  });
}
