<template>
  <div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="Login">
      <img :src="imgUrl" width="300px" class="img">
      <Form-item prop="user">
        <Input type="text" v-model="formInline.username" placeholder="用户名">
        </Input>
      </Form-item>
      <Form-item prop="password">
        <Input type="password" v-model="formInline.password" placeholder="密码">
        </Input>
      </Form-item>
      <Form-item prop="code">
        <Input type="text" v-model="formInline.code" placeholder="验证码" style="width: 250px">
        </Input>
      </Form-item>
      <Form-item>
        <Button type="primary" class="loginBut" size="large" style="width: 100%" @click="login()">登录</Button>
      </Form-item>
      <div class="linkStyle">
        <router-link to="/findP"><span>找回密码</span>
        </router-link>

      </div>


    </Form>
  </div>
</template>

<script>
import LoginService from "../services/LoginService";
export default {
  data () {
    return {
      imgUrl:require('/src/assets/11.png'),
      formInline: {
        username: '',
        password: '',
        code:''
      },
      ruleInline: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 5, message: '密码长度不能小于5位', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请正确填写验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      LoginService.Login(this.formInline.username,this.formInline.password)
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

<style>
.img{
  margin-left: 45px;
  margin-right: 45px;
  margin-top: 50px;
  margin-bottom: 50px;
}
.linkStyle{
  text-align: center;
}
.Login{
  position: relative;
  background-clip: padding-box;
  margin:120px auto;
  width:500px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 70px;
  padding-right: 70px;
  background:white;
  border: 1px solid #7c91ab;
  border-radius: 3px;
}

</style>