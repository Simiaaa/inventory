<template>
  <div>
    <div class="header">
      <a href="/" style="padding-left: 30px;">
        <span class="title"></span>
      </a>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您，{{ user.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="a"
            >修改密码</el-dropdown-item
          >
          <el-dialog
            title="修改密码"
            :visible.sync="dialogFormVisible"
            width="400px"
            append-to-body
            center
          >
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              style="width:300px; margin-top: -30px;margin-bottom: -20px;"
              size="mini"
            >
              <el-form-item label="旧密码" prop="oldpass">
                <el-input
                  type="password"
                  v-model="ruleForm.oldpass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newpass">
                <el-input
                  type="password"
                  v-model="ruleForm.newpass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-dropdown-item icon="el-icon-user" command="b"
            >退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped>
.logo {
  border-radius: 5px;
  vertical-align: middle;
  width: 35px;
}
.title {
  position: absolute;
  color: #fff;
  padding-left: 5px;
  font-size: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  float: right;
  margin-right: 30px;
}
</style>
<script>
import passwordApi from "../../api/password";
export default {
  data() {
    const validateOldPass = (rule, value, callback) => {
      passwordApi.checkPwd(this.user.id, value).then(response => {
        const resp = response.data;
        if (resp.flag) {
          callback();
        } else {
          callback(new Error(resp.message));
        }
      });
    };
    const validateCheckPass = (rule, value, callback) => {
      if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      ruleForm: {
        oldpass: "",
        newpass: "",
        checkPass: ""
      },
      //从localStrorage中获取
      //user:JSON.parse(localStorage.getItem("manager-user")),
      //从Vuex状态中获取
      user: this.$store.state.user.user,
      rules: {
        oldpass: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" }
        ],
        newpass: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validateCheckPass, trigger: ["blur", "change"] }
        ]
      }
    };
  },
  methods: {
    handleCommand(command) {
      //      this.$message("click on item " + command);
      switch (command) {
        case "a":
          this.updatePwd();
          break;
        case "b":
          this.LogoutSystem();
          break;
        default:
          break;
      }
    },
    updatePwd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("success");
          passwordApi
            .updatePwd(this.user.id, this.ruleForm.newpass)
            .then(response => {
              const resp = response.data;
              this.$message({
                message: resp.message,
                type: resp.flag ? "success" : "warning"
              });
              if (resp.flag) {
                //修改密码成功时执行退出系统方法并关闭对话框
                this.LogoutSystem();
                this.dialogFormVisible = false;
              }
            });
        } else {
          return false;
        }
      });
    },
    LogoutSystem() {
      // eslint-disable-next-line no-case-declarations
      /* const token = localStorage.getItem("manager-user-token");
          logout(token)
            .then(response => {
              const resp = response.data;
              if (resp.flag) {
                localStorage.removeItem("manager-user-token");
                localStorage.removeItem("manager-user");
                this.$router.push("/login");
              } else {
                this.$message({
                  message: resp.message,
                  type: "warning",
                  duration: 1000
                });
              }
            }) */
      this.$store.dispatch("Logout").then(response => {
        if (response.flag) {
          this.$router.push("/login");
        } else {
          this.$message({
            message: response.data.message,
            type: "warning",
            duration: 1000
          });
        }
      });
    }
  }
};
</script>
