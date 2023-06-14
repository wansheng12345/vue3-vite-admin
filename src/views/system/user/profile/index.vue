<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>个人信息</span>
            </div>
          </template>
          <div>
            <div class="text-center">
              <userAvatar :user="state.user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户名称
                <div class="pull-right">{{ state.user.userName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" />手机号码
                <div class="pull-right">{{ state.user.phone }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />用户邮箱
                <div class="pull-right">{{ state.user.email }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" />所属部门
                <div class="pull-right">
                  {{ state.user.deptName }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" />所属角色
                <div class="pull-right">{{ state.user.roleGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />创建日期
                <div class="pull-right">{{ state.user.createTime }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>基本资料</span>
            </div>
          </template>
          <el-tabs v-model="activeTab">
           <el-tab-pane label="基本资料" name="userinfo">
                     <userInfo :user="state.users" />
                  </el-tab-pane>
                   <el-tab-pane label="修改密码" name="resetPwd">
                     <resetPwd />
                  </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Profile">
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import {  } from "@/api/system/user";

const activeTab = ref("userinfo");
const state = reactive({
  user: {},
  users:{},
});

function getUser() {
   let res = {
      account: "superadmin",
      userName: "超级管理员",
      nickName: "sheng.wan",
      deptName:"IT信息部",
      roleGroup:"admin",
      avatar: "http://localhost:5005/Avatar/12817950900037.png",
      sex:'0',
      age: 18,
      birthday: "1986-06-28 00:00:00",
      nation:'汉',
      phone: "15221458186",
      email:'15221458186@sina.cn',
      address: null,
      orderNo: 100,
      status: 1,
      remark: "超级管理员备注",
      accountType: 999,
      createTime: "2023-04-11 11:23:24",
      id: 1300000000101,
    };
    state.user = res;
    state.users = JSON.parse(JSON.stringify(res));
}

getUser();
</script>
