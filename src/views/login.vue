<template>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">若依后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width:100%;"
          @click.prevent="handleLogin(loginRef)"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <!-- <span>Copyright © 2018-2023 ruoyi.vip All Rights Reserved.</span> -->
    </div>
  </div>
</template>

<script setup>
import Cookies from "js-cookie";
// import { encrypt, decrypt } from "@/utils/jsencrypt";// 加密 解密
import useUserStore from '@/store/modules/user'
import { removeToken } from '@/utils/auth'
const userStore = useUserStore()
const router = useRouter();
const { proxy } = getCurrentInstance();// 获取组件实例
removeToken()
const loginForm = ref({
  username: "admin",
  password: "admin123",
});
const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
};
const loading = ref(false);
const redirect = ref(undefined);
const loginRef=ref(null)
function handleLogin(formEl) {
  if(!formEl) return;
formEl.validate(v=>{
    if (v) {
      // loading.value = true;
      userStore.login(loginForm.value).then(() => {
        router.push({ path: redirect.value || "/" });
      })
    }
})
  // proxy.$refs.loginRef.validate(valid => {
  //   if (valid) {
  //     loading.value = true;
  //     // 调用action的登录方法
  //     console.log(loginForm.value)
  //     userStore.login(loginForm.value).then(() => {
  //       router.push({ path: redirect.value || "/" });
  //     }).catch(() => {
  //       loading.value = false;
  //       // 重新获取验证码
  //     });
  //   }else{

  //   }
  // });
}
</script>

<style lang='scss' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
