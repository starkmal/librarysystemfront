<template>
  <div class="submit-form">
    <div v-if="!logged">
    <h4 style="text-align: center ;margin: 20px">登录测试</h4>
<!--      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">-->
    <Row id="form1" type="flex"  align="middle">

      <i-col class="ivu-form-label-top">
        <Form>
          <Form-item  label="" prop="password">
            <Input v-model="data.password" size="large" placeholder="请输入密码"></Input>
          </Form-item>
          <Form-item  label="" prop="username">
            <Input v-model="data.username" size="large" placeholder="请输入账户"></Input>
          </Form-item>
        </Form>

        <div id="btn" style="text-align:center">
          <Button type="primary" size="large" @click="login">登录</Button>
        </div>

      </i-col>
      </Row>
    </div>
    <div v-else>
      <h4 style="margin: 100px auto">You submitted successfully!</h4>
    </div>
  </div>
</template>

import LoginService from "../services/LoginService";

<script>
import LoginService from "@/services/LoginService";
//import Cookies from 'js-cookie'

export default {
  name: "Login",
  data() {
    return {
      data: {
        username: null,
        password: null
      },
      ruleValidate: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      logged: false
    }
  },


  methods: {
    // checkLogin(){
    //
    //   //检查是否存在session
    //   if(!this.getCookie('session')){
    //     this.$router.push('/login');
    //   }else{
    //     this.$router.push('/');
    //   }
    // },

    login() {
      LoginService.Login(this.data.username,this.data.password)
          .then((response) => {
            if(response.status == 200) {
              //this.$cookies.set(this.data.username,this.data.password,7);
              this.$router.push('/');

            }
          })
    },


  }
}
</script>
