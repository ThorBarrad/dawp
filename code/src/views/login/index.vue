<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username/Email"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
          style="width:75%"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="captcha">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input
          ref="captcha"
          v-model="loginForm.captcha"
          placeholder="captcha"
          name="captcha"
          type="text"
          tabindex="3"
          auto-complete="off"
          style="width:67%"
        />
        <span @click="renewCaptcha">
          <el-image
            id="captcha"
            class="captchabox"
            :src="prefix.image + this.captcha_name"
          />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
        >Login</el-button
      >
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="openRegister"
        >No Account? Register One!</el-button
      >
    </el-form>

    <el-dialog title="用户注册" :visible.sync="registerForm.visible" center>
      <el-form
        size="mini"
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="registerForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType2"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType2"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd2">
            <svg-icon
              :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>

        <!-- begin confirm password -->
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType3"
            ref="password"
            v-model="registerForm.confirmpassword"
            :type="passwordType3"
            placeholder="Cofirm Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd3">
            <svg-icon
              :icon-class="passwordType3 === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <!-- end confirm password -->

        <el-form-item prop="email">
          <span class="svg-container">
            <svg-icon icon-class="form" />
          </span>
          <el-input
            ref="email"
            v-model="registerForm.email"
            placeholder="email"
            name="email"
            type="text"
            tabindex="3"
            auto-complete="off"
            style="width:70%"
            @keyup.enter.native="handleRegister"
          />
          <el-button
            type="primary"
            class="setwidth2"
            @click.native.prevent="postemail"
            :disabled="loading2"
            >获取验证码</el-button
          >
        </el-form-item>

        <el-form-item prop="verifycode">
          <span class="svg-container">
            <svg-icon icon-class="form" />
          </span>
          <el-input
            ref="verifycode"
            v-model="registerForm.verifycode"
            placeholder="verifycode"
            name="verifycode"
            type="text"
            tabindex="3"
            auto-complete="off"
            @keyup.enter.native="handleRegister"
          />
        </el-form-item>

        <el-form-item prop="captcha">
          <span class="svg-container">
            <svg-icon icon-class="form" />
          </span>
          <el-input
            ref="captcha"
            v-model="registerForm.captcha"
            placeholder="captcha"
            name="captcha"
            type="text"
            tabindex="3"
            auto-complete="off"
            style="width:67%"
            @keyup.enter.native="handleRegister"
          />
          <span @click="renewCaptcha">
            <el-image
              id="captcha"
              class="captchabox2"
              :src="prefix.image + this.captcha_name"
            />
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleRegister"
          >Register</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  validEmail,
  validEmailcode,
  validUsername,
  validPassword,
  validCaptcha
} from "@/utils/validate";
import {
  Login,
  Register,
  RetrieveCaptcha,
  getPubKey,
  getemailcode,
  varifyemail
} from "@/api/api.js";
import { setToken } from "@/utils/auth";
import { Message } from "element-ui";
export default {
  name: "Login",
  created() {},
  data() {
    const validateLoginUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名或邮箱"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error("密码需要包含数字和大小写字母，6-12位"));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("用户名需要以英文字母开头，6-16位"));
      } else {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      if (!validCaptcha(value)) {
        callback(new Error("验证码4位不区分大小写"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("邮件名称错误"));
      } else {
        callback();
      }
    };
    const validateEmailcode = (rule, value, callback) => {
      if (!validEmailcode(value)) {
        callback(new Error("邮件验证码6位，区分大小写，请从邮件复制"));
      } else {
        callback();
      }
    };
    return {
      prefix: {
        image: process.env.VUE_APP_BASE_API
      },
      loginForm: {
        username: "",
        password: "",
        captcha: "",
        visible: false
      },
      registerForm: {
        username: "",
        password: "",
        captcha: "",
        email: "",
        verifycode: "",
        visible: false,
        confirmpassword: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateLoginUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        captcha: [
          { required: true, trigger: "blur", validator: validateCaptcha }
        ]
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        confirmpassword: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        captcha: [
          { required: true, trigger: "blur", validator: validateCaptcha }
        ],
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
        verifycode: [
          { required: true, trigger: "blur", validator: validateEmailcode }
        ]
      },
      loading: false,
      loading2: false,
      passwordType: "password",
      passwordType2: "password",
      passwordType3: "password",
      redirect: undefined,
      captcha_name: ""
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        getPubKey().then(
          res => {

            sessionStorage.setItem("publicKey", res.pubkey);
            sessionStorage.setItem("csrf_token", res.csrf_token);
            var id = Math.random();
            const form_data = new FormData();
            form_data.append("id", id);
            form_data.append("pubkey", sessionStorage.getItem("publicKey"));
            RetrieveCaptcha(form_data).then(res => {
              this.captcha_name = res.captcha_name;
            });
          },
          err => {
          }
        );
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    openRegister() {
      this.registerForm.visible = true;
    },
    renewCaptcha() {
      var id = Math.random();
      const form_data = new FormData();
      form_data.append("id", id);
      form_data.append("pubkey", sessionStorage.getItem("publicKey"));
      RetrieveCaptcha(form_data).then(res => {
        this.captcha_name = res.captcha_name;
      });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    showPwd2() {
      if (this.passwordType2 === "password") {
        this.passwordType2 = "";
      } else {
        this.passwordType2 = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    showPwd3() {
      if (this.passwordType3 === "password") {
        this.passwordType3 = "";
      } else {
        this.passwordType3 = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    postemail() {
      if (this.registerForm.email == "") {
        Message.error("请填写邮箱");
        return;
      }
      this.loading2 = true;
      getemailcode({ email: this.registerForm.email }).then(res => {
        Message.success("验证码已发送至:" + this.registerForm.email);
      });
      setTimeout(() => {
        this.loading2 = false;
      }, 60000);
    },
    handleLogin() {
      if (this.loginForm.username == "") {
        Message.error("请填写用户名和邮箱");
        return;
      }
      if (this.loginForm.password == "") {
        Message.error("请填写登录密码");
        return;
      }
      if (this.loginForm.captcha == "") {
        Message.error("请填写验证码");
        return;
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const param = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            captcha: this.loginForm.captcha,
            pubkey: sessionStorage.getItem("publicKey"),
            csrf_token: sessionStorage.getItem("csrf_token")
          };
          this.loading = true;
          Login(param)
            .then(res => {
              if (res == "User not exists") {
                Message.warning("用户不存在");
                this.loading = false;
                return;
              } else if (res == "user and password not match") {
                Message.warning("密码错误");
                this.loading = false;
                return;
              } else if (res == "CAPTCHA is not correct") {
                Message.warning("验证码错误");
                this.renewCaptcha();
                this.loading = false;
                return;
              } else if (res == "CSRF Token expired") {
                Message.warning("操作时间过长");
                this.loading = false;
                getPubKey().then(
                  res => {
                    sessionStorage.setItem("publicKey", res.pubkey);
                    sessionStorage.setItem("csrf_token", res.csrf_token);
                    var id = Math.random();
                    const form_data = new FormData();
                    form_data.append("id", id);
                    form_data.append(
                      "pubkey",
                      sessionStorage.getItem("publicKey")
                    );
                    RetrieveCaptcha(form_data).then(res => {
                      this.captcha_name = res.captcha_name;
                    });
                  },
                  err => {
                  }
                );
                return;
              } else {
                setToken(res.access_token);
                this.$router.push({ path: "/main" });
                this.loading = false;
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    handleRegister() {
      if (this.registerForm.username == "") {
        Message.error("请填写用户名和邮箱");
        return;
      }
      if (this.registerForm.password == "") {
        Message.error("请填写登录密码");
        return;
      }
      if (this.registerForm.captcha == "") {
        Message.error("请填写验证码");
        return;
      }
      if (this.registerForm.password != this.registerForm.confirmpassword) {
        Message.error("两次输入的密码不一致");
        return;
      }
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          varifyemail({
            email: this.registerForm.email,
            emailcode: this.registerForm.verifycode
          }).then(res => {
            if (res == "ok") {
              const param = {
                username: this.registerForm.username,
                password: this.registerForm.password,
                captcha: this.registerForm.captcha,
                pubkey: sessionStorage.getItem("publicKey"),
                csrf_token: sessionStorage.getItem("csrf_token"),
                email: this.registerForm.email
              };
              this.loading = true;
              Register(param)
                .then(res => {
                  if (res == "User exists") {
                    Message.warning("用户已存在");
                    this.loading = false;
                    return;
                  } else if (res == "CSRF Token expired") {
                    Message.warning("操作时间过长");
                    this.loading = false;
                    getPubKey().then(
                      res => {
                        sessionStorage.setItem("publicKey", res.pubkey);
                        sessionStorage.setItem("csrf_token", res.csrf_token);
                        var id = Math.random();
                        const form_data = new FormData();
                        form_data.append("id", id);
                        form_data.append(
                          "pubkey",
                          sessionStorage.getItem("publicKey")
                        );
                        RetrieveCaptcha(form_data).then(res => {
                          this.captcha_name = res.captcha_name;
                        });
                      },
                      err => {
                      }
                    );
                    return;
                  } else if (res == "CAPTCHA is not correct") {
                    Message.warning("验证码错误");
                    this.renewCaptcha();
                    this.loading = false;
                    return;
                  }
                  if (res.access_token) {
                    setToken(res.access_token);
                    this.$router.push({ path: "/main" });
                    this.loading = false;
                  } else {
                    Message.error(res);
                    this.loading = false;
                  }
                })
                .catch(() => {
                  this.loading = false;
                });
            } else {
              Message.warning("邮箱验证码错误");
              return;
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@media screen and (min-width: 700px) {
  .captchabox {
    width: 25%;
    position: absolute;
    border-radius: 3px;
    top: 50%;
    transform: translate(0, -50%);
  }
  .setwidth2 {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translate(-105%, -50%);
    width: 20%;
  }
}
@media screen and (max-width: 700px) {
  .captchabox {
    width: 25%;
    position: absolute;
    border-radius: 3px;
    left: 100%;
    top: 50%;
    transform: translate(-110%, -35%);
  }
  .setwidth2 {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translate(-105%, -50%);
    width: 40%;
  }
}

.captchabox2 {
  width: 25%;
  height: 45px;
  position: absolute;
  border-radius: 3px;
  top: 50%;
  left: 100%;
  transform: translate(-105%, -50%);
}
.el-button + .el-button {
  margin-left: 0px;
}
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  @media screen and (min-width: 700px) {
    .el-dialog {
      width: 600px;
      .el-input {
        input {
          color: black;
        }
        input::-webkit-input-placeholder {
          color: gray;
        }
      }
    }
  }
  @media screen and (max-width: 700px) {
    .el-dialog {
      width: 300px;
      .el-input {
        input {
          color: black;
        }
        input::-webkit-input-placeholder {
          color: gray;
        }
      }
    }
  }
  .el-input {
    display: inline-block;
    height: 52px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 52px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

@media screen and (min-width: 700px) {
  .login-container {
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
@media screen and (max-width: 700px) {
  .login-container {
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 50px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;


  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 20px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
