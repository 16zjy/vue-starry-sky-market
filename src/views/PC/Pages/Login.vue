<template>
  <div>
    <header-part />
    <div class="login">
      <div class="top">
        <router-link to="/PC/index">
          <img src="/static/images/login/logo2.png" alt="图片" />
        </router-link>
        <h2>欢迎登录</h2>
      </div>
      <!-- 登录面板 -->
      <div class="content">
        <div class="loginForm">
          <img src="@/assets/bg.jpg" draggable="false" alt="图片" />
          <div class="core">
            <div class="title">
              <h2 v-if="isLogin">账号登录</h2>
              <h2 v-if="!isLogin">账号注册</h2>
            </div>
            <div class="form" v-if="isLogin" key="1">
              <el-form status-icon label-width="40px" label-position="left" :model="loginForm" ref="loginForm" :hide-required-asterisk="true">
                <el-form-item label="账号" prop="username" :rules="[{ required: true, message: '账号不能为空' }]">
                  <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '密码不能为空' }]">
                  <el-input type="password" v-model="loginForm.password" show-password prefix-icon="el-icon-lock"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitLogin('loginForm')">登录</el-button>
                  <el-button @click="clear">重置</el-button>
                </el-form-item>
              </el-form>
              <el-divider></el-divider>

              <div class="footer">
                <div class="right" style="white-space: pre;">
                  <router-link to="/PC/login?isLogin=false" class="tip-color">没有账号？去注册</router-link>
                </div>
              </div>
            </div>
            <div class="form" v-else key="2" >
              <el-form
                status-icon
                ref="regForm"
                label-width="40px"
                label-position="left"
                :model="regForm"
                :rules="rules"
              >
                <el-form-item label="账号" prop="username">
                  <el-input v-model="regForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="regForm.password" autocomplete="off" show-password prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                
                <el-form-item label="确认" prop="checkPass">
                  <el-input
                    type="password"
                    v-model="regForm.checkPass"
                    autocomplete="off"
                    show-password
                    prefix-icon="el-icon-lock"
                  ></el-input>
                </el-form-item>

                <div class="footer" style="white-space: pre;">
                  <div class="right" >
                    <el-form-item>
                      <router-link to="/PC/login?isLogin=true" class="tip-color">已有账号，去登录&ensp;&ensp;</router-link>
                      <el-button type="primary" @click="submitReg('regForm')">注册</el-button>
                  </el-form-item>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <!-- /登录面板 -->
      <my-footer />
    </div>
  </div>
</template>
 
<script>
import MyFooter from '../footer/MyFooter.vue';
import HeaderPart from '../header/HeaderPart.vue';
export default {
  components: { MyFooter, HeaderPart },
  name: 'Login',
  data() {
    let checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      callback();
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.regForm.checkPass !== '') {
          this.$refs.regForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: '',
        password: '',
      },
      regForm: {
        username: '',
        password: '',
        checkPass: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        username: [{ validator: checkUsername, trigger: 'blur' }],
      },
    };
  },
  methods: {
    toPage(item) {
      this.$router.push(item);
    },
    clear() {
      this.loginForm = {
        username: '',
        password: '',
      };
    },
    submitLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.checkLogin(this.loginForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitReg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.checkReg(this.regForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    checkLogin(userInfo) {
      // 判断用户账号密码是否正确
      // 返回值 true or false
      let obj = {
        userInfo,
        that: this,
      };
      this.$store.commit('getUsersAndCheck', obj);
    },
    checkReg(userInfo) {
      let obj = {
        userInfo,
        that: this,
      };
      this.$store.commit('checkRegAndAdd', obj);
    },
  },
  computed: {
    isLogin() {
      let isLogin = this.$route.query.isLogin;
      return isLogin === 'true' ? true : false;
    },
  },
  created() {
    // this.$router.commit('')
  },
};
</script>

<style scoped>
.title {
  color: #888;
}

.login {
  background: #fff;
}

.top {
  display: flex;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
}

.top h2 {
  margin-left: 20px;
  color: #666;
}

.login .content {
  background: #f98985;
}

.login .content .loginForm {
  width: 1200px;
  margin: 0 auto;
}

.login .content .loginForm .core {
  width: 340px;
  height: 360px;
  border-radius: 8px;
  text-align: center;
  box-sizing: border-box;
  padding: 10px 0;
  background: #fff;
  position: absolute;
  top: 120px;
  right: 300px;
}

.login_btn {
  display: flex;
  justify-content: flex-end;
}
.tip-color {
  color: #708090;
}

.tip-color:hover {
  color: red;
}

.tip-color:active {
  color: green;
}

.form {
  padding: 20px 20px;
}

.login .content .loginForm .footer {
  display: flex;
  justify-content: space-around;
}

.login .content .loginForm .footer .loginSelect {
  color: #666;
  display: flex;
}

.login .content .loginForm .footer .loginSelect .logo {
  padding: 0 4px;
  display: flex;
  align-items: center;
}

.icon_qq {
  background-position: 0 0;
}

.icon_weixin {
  background-position: -20px 0;
}
</style>