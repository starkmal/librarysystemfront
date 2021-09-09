<template>
<div>
  <Form class="C1">
    <h1 class="findTit">找回密码</h1>
    <Steps :current= "current" class="S">
      <Step title="身份认证" icon="ios-person"></Step>
      <Step title="重置密码" icon="ios-unlock"></Step>
      <Step title="已完成" icon="md-checkmark-circle-outline"></Step>
    </Steps>


    <div v-show="current==0" class="C2">
      <Form ref="f1" :model="f" :rules="frules">
        <Form-item prop="user">
          <Input type="text" v-model="f.user" placeholder="用户名">
          </Input>
        </Form-item>
        <Form-item prop="phone">
          <Input type="password" v-model="f.phone" placeholder="手机号">
          </Input>
        </Form-item>
        <Form-item prop="code">
          <Input type="text" v-model="f.code" placeholder="验证码" style="width: 250px">
          </Input>
        </Form-item>
        <Button type="primary" @click="next('')" style="display: block;margin: 0 auto;width: 50%">下一步</Button>
      </Form>
    </div>

    <div v-show="current==1" class="C2">
      <Form ref="f1" :model="f1" :rules="f1rules">
        <Form-item prop="pass1">
          <Input type="password" v-model="f1.pass1" placeholder="新密码">
          </Input>
        </Form-item>
        <Form-item prop="pass2">
          <Input type="password" v-model="f1.pass2" placeholder="确认密码">
          </Input>
        </Form-item>
        <Button type="primary" @click="next('f1')" style="display: block;margin: 0 auto;width: 50%">下一步</Button>
  </Form>
  </div>
    <div v-show="current==2" class="C2">
     <h3>密码已修改，点击确认回到登录页</h3>
      <Button type="primary" @click="goLogin()" style="display: block;margin-left: auto;width: 20%">确认</Button>
    </div>

  </Form>
</div>
</template>

<script>
export default {
  name: "findP",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.f1.pass2 !== '') {
          // 对第二个密码框单独验证
          this.$refs.f1.validateField('passwdCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.f1.pass1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      current: 0,
      f: {
        user: "",
        code: "",
      },
      f1: {
        pass1: "",
        pass2: "",
      },
      frules: {
        user: [{required: true, message: '请填写用户名', trigger: 'blur'}],
        phone: [{required: true, message: '请填写手机号', trigger: 'blur'},
          {type: 'string', min: 11,max:11, message: '请填写正确手机号', trigger: 'blur'},],
        code: [{required: true, message: '请正确填写验证码', trigger: 'blur'}]

      },
      f1rules: {
        pass1: [
          {validator: validatePass, trigger: 'blur'}
        ],
        pass2: [
          {validator: validatePassCheck, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    next(name) {
      this.current=this.current+1;
    },
    goLogin(name){
      this.$router.push("/");
      }

  }
}
</script>

<style scoped>
.C1{
  position: relative;
  background-clip: padding-box;
  margin:150px auto;
  width:500px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 70px;
  padding-right: 70px;
  background:white;
  border: 1px solid #7c91ab;
  border-radius: 3px;

}
.C2{
  margin: 25px auto 30px auto;
}
.findTit{
  margin: 50px auto 30px auto;
  text-align: center;
}
</style>