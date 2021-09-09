<template>
  <div>
     <Form ref="peopel" :model="people" :rules="rulepeople" :label-width="80" class="people" label-position="left" >
       <Form-item label="ID" prop="id" size="large">
         <DisabledInput v-model="people.id" size="large"></DisabledInput>
       </Form-item>
       <Form-item label="姓名" prop="name" >
         <Input v-model="people.name" size="large"></Input>
       </Form-item>
       <Form-item label="手机号" prop="phone">
         <Input v-model="people.phone" size="large"></Input>
       </Form-item>
       <Form-item label="密码">
         <router-link to="/people/pwchange"><span>修改密码</span>
         </router-link>
       </Form-item>
       <Button size="large" style="display: block;margin: 0 auto;width: 20%">提交修改</Button>


   </Form>
  </div>
</template>

<script>
export default {
  name: "People",
  data(){
    return{
      people:{
        id:'',
        name:'',
        phone:'',
      }
    }
  }
}
</script>

<style>
.people{
  position: relative;
  margin: 80px 300px ;
}
</style>

