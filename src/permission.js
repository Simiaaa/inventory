//导入VueRouter
import router from "./router/index";
import store from "./store/index.js";
//利用VueRouter对象router的beforeeach方法进行校验
//前面登录逻辑是：提交用户名、密码到后端校验、校验成功获取token，通过token到后端调取用户信息
router.beforeEach((to, from, next) => {
  //获取token
  //const token = localStorage.getItem("manager-user-token");
  const token = store.state.user.token;
  //如果没有获取到token
  if (!token) {
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    //获取到token
    //请求登录路由login,那就让其进入目标路由/login
    if (to.path === "/login") {
      next();
    } else {
      /* getUserInfo(token).then(response => {
        const respUser = response.data;
        if (respUser.flag) {
          localStorage.setItem("manager-user", JSON.stringify(respUser.data));
          next();
        } else {
          next({ path: "/login" });
        }
      }); */
      store
        .dispatch("GetUserInfo")
        .then(response => {
          if (response.flag) {
            next();
          } else {
            next({ path: "/login" });
          }
        })
    }
  }
});
