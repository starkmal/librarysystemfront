<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item to="/">首页</Breadcrumb-item>
        <Breadcrumb-item to="/reader">读者管理</Breadcrumb-item>
        <Breadcrumb-item>添加读者</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div class="submit-form">
      <div v-if="!submitted">
        <h4 style="text-align: center; margin: 20px">添加新读者</h4>
        <Row id="form1" type="flex" gutter="40">
          <i-col class="form-left">
            <Form ref="data.reader" :model="data.reader" :rules="ruleValidate" :label-width="80">
              <Form-item label="姓名" prop="name">
                <Input v-model="data.reader.name" size="large" placeholder="请输入姓名"></Input>
              </Form-item>
              <Form-item label="联系方式" prop="phone">
                <Input v-model="data.reader.phone" size="large" placeholder="请输入联系方式"></Input>
              </Form-item>
            </Form>
          </i-col>
        </Row>
        <div id="btn" style="text-align:center">
          <Button type="primary" size="large" @click="submit">提交</Button>
        </div>
      </div>
      <div v-else>
        <h4 style="margin: 100px auto">You submitted successfully!</h4>
        <!--      <h4 style="margin: 100px auto">Your ID is</h4>-->
      </div>
    </div>
  </div>

</template>

<script>
import ReaderService from "@/services/ReaderService";
export default {
  name: "AddReader",
  data() {
    return {
      data: {
        reader: {
          id: null,
          name: null,
          phone: null,
          // credit: null
        }
      },
      ruleValidate: {
        name:[{required: true, message: '姓名不能为空', trigger: 'blur'}],
        phone:[{required: true, message: '联系方式不能为空', trigger: 'blur'}]
      },
      submitted:false
    };
  },
  methods: {
    submit() {
      // ReaderService.get(this.data.reader.id)
      // .then(() =>{
      //   ReaderService.update(this.data.reader.id, this.data.reader)
      //   .then(() => this.step2())
      //   .catch(e=>console.log(e))
      // })
      ReaderService.get(this.data.reader.id)
      .then(() => this.step2()) //(学号不能重复)
      .catch(()=>{
        let param = {
          // id: this.data.reader.id,
          name: this.data.reader.name,
          phone: this.data.reader.phone,
        };
        ReaderService.create(param)
        .then(res => {
          console.log(res.data);
          this.data.reader = res.data;
          this.submitted=true;
        })
        .catch(e=>console.log(e));
      })
    },
    step2() {
      alert("id不能重复")
    }
  }
}
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>