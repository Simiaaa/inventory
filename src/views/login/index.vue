<template>
  <div id="login-container">
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      label-width="60px"
      class="login-form"
    >
      <h2 class="login-title">库存管理系统</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 32,
            message: "密码长度在6-32个字符",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    /* onSubmit() {
        console.log('submit!');
      } */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert('submit!');
          /* login(this.form.username, this.form.password).then(response => {
            const resp = response.data;
            console.log(resp, resp.data, resp.token);
            if (resp.flag) {
              getUserInfo(resp.data.token).then(response => {
                const respUser = response.data;
                if (respUser.flag) {
                  console.log(respUser.data);
                  localStorage.setItem(
                    "manager-user",
                    JSON.stringify(respUser.data)
                  );
                  localStorage.setItem("manager-user-token", resp.data.token);
                  this.$router.push("/home");
                } else {
                  this.$message({
                    message: respUser.message,
                    type: "warning"
                  });
                }
              });
            } else {
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          }); */
          this.$store.dispatch("Login", this.form).then(response => {
            if (response.flag) {
              this.$router.push("/");
            } else {
              this.$message({
                message: response.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.login-form {
  width: 350px;
  background-color: #fff;
  padding: 15px;
  border-radius: 20px;
  height: 250px;
  left: 50%;
  top: 50%;
  margin-left: -175px;
  margin-top: -125px;
  position: absolute;
}

#login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #a8afa8;
}
</style>
